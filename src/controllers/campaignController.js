const prisma = require("../helpers/prisma.js");
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

class CampaignController {
	static findCampaign = async (req, res, next) => {
		try {
			let { limit, page, category_id } = req.query;
			limit = limit ? limit : DEFAULT_LIMIT;
			page = page ? page : DEFAULT_PAGE;

			const offset = (+page - 1) * +limit;

			let queryFilter = {};

			if (category_id) {
				queryFilter = {
					where: {
						categories: {
							some: {
								category_id: +category_id
							}
						}
					}
				};
			}

			const count = await prisma.campaign.count(queryFilter);
			const data = await prisma.campaign.findMany({
				take: +limit,
				skip: offset,
				...queryFilter,
				include: {
					categories: {
						include: {
							categories: true
						}
					},
					banner: true
				}
			});
			const result = data.map((campaign) => {
				return { ...campaign, categories: campaign.categories.map((cat) => cat.categories) };
			});
			res.status(200).json({
				data: result,
				currentPage: +page,
				totalPages: Math.ceil(count / +limit)
			});
		} catch (err) {
			next(err);
		}
	};

	static findCampaignById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const data = await prisma.campaign.findUnique({
				where: { id: +id }
			});
			if (data) {
				res.status(200).json(data);
			} else {
				next({ name: "ErrorNotFound" });
			}
		} catch (err) {
			next(err);
		}
	};

	static createCampaign = async (req, res, next) => {
		try {
			const image = req.file.path;
			let { title, description, goal, currentDonation, endDate, category_ids} = req.body;

			category_ids = category_ids.map((val) => {
				return {category_id: +val}
			})

			const campaign = await prisma.campaign.create({
				data: {
					title,
					description,
					goal: +goal,
					currentDonation: +currentDonation,
					endDate: new Date(endDate),
					userId: +req.loggedUser.id,
					categories: {
						create: category_ids
					},
					banner: {
						create: [{ image: `http://localhost:3001/${image}` }]
					}
				}
			});
			res.status(200).json({ campaign });
		} catch (err) {
			next(err);
		}
	};

    static updateCampaign = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, description, goal, endDate } = req.body;
            const campaign = await prisma.campaign.update({
                where: { id: +id },
                data: {
                    title,
                    description,
                    goal,
                    endDate: new Date(endDate)
                }
            });
            res.status(200).json(campaign);
        } catch (err) {
            next(err);
        }
    };

    static deleteCampaign = async (req, res, next) => {
        try {
            const { id } = req.params;
            const campaign = await prisma.campaign.delete({
                where: { id: +id }
            });

            if (campaign) {
                res.status(200).json({
                    message: "Campaign deleted successfully"
                });
            }
        } catch (err) {
            next(err);
        }
    };
}

module.exports = CampaignController;
