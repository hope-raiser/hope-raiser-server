const prisma = require("../helpers/prisma.js")

class CampaignController {

    static findCampaign = async (req, res, next) => {

        try {

            const{limit, page, category_id} = req.query
            const offset = (+page - 1) * +limit +1

            let queryFilter= {}

            if(category_id) {
                queryFilter = {where: {
                    categories: {
                        every: {
                            category_id: +category_id
                        }
                    }
                }}
            }

            const count = await prisma.campaign.count(queryFilter)
            const data = await prisma.campaign.findMany({
                take: +limit,
                skip: offset,
                ...queryFilter,
                include: {
                    categories: {
                        include: {
                            categories: true
                        }
                    }
                },
            })
            const result = data.map((campaign) =>{
                return {...campaign, categories: campaign.categories.map((cat) => cat.categories)}
            })
            res.status(200).json({
                data: result,
                currentPage: +page,
                totalPages: Math.ceil(count / +limit)
            });
        } catch (err) {
            next(err);
        }
    }

    static findCampaignById = async (req, res, next) => {

        try {
            const { id } = req.params;
            const data = await prisma.campaign.findUnique({
                where: {id: +id}
            })
            if (data) {
                res.status(200).json(data);
            } else {
                next({ name: "ErrorNotFound" })
            }
        } catch (err) {
            next(err);
        }
    }

    static createCampaign = async (req, res, next) => {
        try {
            console.log(req.body)
            const { title, description, goal, currentDonation, endDate, userId, campaign_categories } = req.body
            const campaign = await prisma.campaign.create({
                data: {
                    title,
                    description,
                    goal,
                    currentDonation,
                    endDate: new Date(endDate),
                    userId: req.loggedUser.id,
                    categories: {
                        create: campaign_categories
                    },
                },
            })
            res.status(200).json({campaign});
        } catch (err) {
            next(err);
        }
    }

    static updateCampaign = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, description, goal, endDate } = req.body
            const campaign = await prisma.campaign.update({
                where: { id: +id },
                data: {
                    title,
                    description,
                    goal,
                    endDate: new Date(endDate)
                }
            })
            res.status(200).json(campaign);
        } catch (err) {
            next(err);
        }
    }

    static deleteCampaign = async (req, res, next) => {
        try {
            const { id } = req.params;
            const campaign = await prisma.campaign.delete({
                where: { id: +id },
            });

            if (campaign) {
                res.status(200).json({
                    message: "Campaign deleted successfully"
                })
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CampaignController;