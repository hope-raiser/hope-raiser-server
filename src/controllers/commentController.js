const prisma = require("../helpers/prisma.js");
const DEFAULT_LIMIT = 5;
const DEFAULT_PAGE = 1;

class CommentController {
	static findComment = async (req, res, next) => {
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
			const count = await prisma.comment.count(queryFilter);
			const data = await prisma.comment.findMany({
				take: +limit,
				skip: offset,
				...queryFilter,
				include: {
					user: true
				}
			});

			res.status(200).json({
				data,
				currentPage: +page,
				totalPages: Math.ceil(count / +limit)
			});
		} catch (err) {
			next(err);
		}
	};

	static findCommentById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const comment = await prisma.comment.findUnique({ where: { id: +id } });
			if (comment) {
				res.status(200).json(comment);
			} else {
				next({ name: "ErrorNotFound" });
			}
		} catch (err) {
			next(err);
		}
	};

	static createComment = async (req, res, next) => {
		try {
			const { content, campaignId } = req.body;
			const comment = await prisma.comment.create({
				data: {
					content,
					userId: req.loggedUser.id,
					campaignId
				}
			});
			res.status(200).json(comment);
		} catch (err) {
			next(err);
		}
	};

	static updateComment = async (req, res, next) => {
		try {
			const { id } = req.params;
			const { content } = req.body;
			const comment = await prisma.comment.update({
				where: { id: +id },
				data: {
					content
				}
			});
			res.status(200).json({ comment });
		} catch (err) {
			next(err);
			return res.status(400).json({ comment });
		}
	};

	static deleteComment = async (req, res, next) => {
		try {
			const { id } = req.params;
			const findComment = await prisma.comment.findUnique({ where: { id: +id } });

			if (findComment) {
				const comment = await prisma.comment.delete({
					where: { id: +id }
				});
				if (comment) {
					res.status(200).json({
						message: "Comment deleted successfully"
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

module.exports = CommentController;
