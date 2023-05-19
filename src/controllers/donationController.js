const prisma = require("../helpers/prisma.js");
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

class DonationController {
	static findDonation = async (req, res, next) => {
		try {
			let { limit, page, campaign_id  } = req.query;
			limit = limit ? limit : DEFAULT_LIMIT;
			page = page ? page : DEFAULT_PAGE;

			const offset = (+page - 1) * +limit;

			let queryFilter = {};

			if (campaign_id) {
				queryFilter.where = {
					campaignId: +campaign_id
				}
			}
			const count = await prisma.donations.count(queryFilter);
			const data = await prisma.donations.findMany({
				take: +limit,
				skip: offset,
				...queryFilter,
				include: {
					user: true
				}
			});;

			res.status(200).json({
				data,
				currentPage: +page,
				totalPages: Math.ceil(count / +limit)
			});
		} catch (err) {
			next(err);
		}
	};

	static findDonationById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const donation = await prisma.donations.findUnique({ where: { id: +id } });
			if (donation) {
				res.status(200).json(donation);
			} else {
				next({ name: "ErrorNotFound" });
			}
		} catch (err) {
			next(err);
		}
	};

	static createDonation = async (req, res, next) => {
		try {
			// console.log(prisma)
			const { amount, campaignId } = req.body;
			const donation = prisma.donations.create({
				data: {
					amount : +amount,
					userId: req.loggedUser.id,
					campaignId : +campaignId
				}
			});
			const campaignUpdate = prisma.campaign.update({
				where: { id: +campaignId },
				data: {
					currentDonation: { increment: +amount }
				}
			});
			const [result, amountUpdate] = await prisma.$transaction([donation, campaignUpdate]);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	};


	static updateDonation = async (req, res, next) => {
		try {
			const { id } = req.params;
			const { amount, campaignId } = req.body;
			const donation = await prisma.donations.update({
				where: { id: +id },
				data: {
					amount,
					userId: req.loggedUser.id,
					campaignId
				}
			});

			res.status(200).json(donation);
		} catch (err) {
			next(err);
		}
	};

 
	static deleteDonation = async (req, res, next) => {
		try {
			const { id } = req.params;
			const findDonation = await prisma.donations.findUnique({ where: { id: +id } });
			if (findDonation) {
				const donation = await prisma.donations.delete({
					where: { id: +id }
				});

				if (donation) {
					res.status(200).json({
						message: "Donation deleted successfully"
					});
				}
			} else {
				next({ name: "ErrorNotFound" });
			}
		} catch (err) {
			next(err);
		}
	};
}

module.exports = DonationController;
