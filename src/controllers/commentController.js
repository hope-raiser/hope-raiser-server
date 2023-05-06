const prisma = require("../helpers/prisma.js");

class CommentController {
	static findComment = async (req, res, next) => {
		try {
			const comment = await prisma.comment.findMany();

			res.status(200).json(comment);
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
