const jwt = require("jsonwebtoken");
const prisma = require("../helpers/prisma.js");

async function authentication(req, res, next) {
	const { access_token } = req.headers;

	if (access_token) {
		try {
			const decode = jwt.verify(access_token, process.env.JWT_SECRET);
			const { id, email } = decode;
			const user = await prisma.users.findUnique({ where: { id: +id } });
			if (!user) {
				next({ name: "ErrorNotFound" });
			} else {
				req.loggedUser = {
					id: user.id,
					email: user.email,
					role: user.role
				};
				next();
			}
		} catch (err) {
			next({ name: "JWTerror" });
		}
	} else {
		next({ name: "Unauthenticated" });
	}
}

async function authorization(req, res, next) {
	const { role, email, id } = req.loggedUser;
	const campaignId = req.params.id;

	const campaign = await prisma.campaign.findUnique({ where: { id: +campaignId } });
	if (campaign) {
		if (id === campaign.userId) {
			next();
		} else {
			next({ name: "Unauthorized" });
		}
	} else {
		next({ name: "ErrorNotFound" });
	}
}

async function authorizationComment(req, res, next) {
	const { id } = req.loggedUser;
	const commentId = req.params.id;

	const comment = await prisma.comment.findUnique({ where: { id: +commentId } });
	if (comment) {
		if (id === comment.userId) {
			next();
		} else {
			next({ name: "Unauthorized" });
		}
	} else {
		next({ name: "ErrorNotFound" });
	}
}

async function adminAuthorization(req, res, next) {
	const { role } = req.loggedUser;

	if (role.toLowerCase() === "admin") {
		next();
	} else {
		next({ name: "MustAdmin" });
	}
}

module.exports = {
	authentication,
	authorization,
	adminAuthorization,
	authorizationComment
};
