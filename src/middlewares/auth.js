const { response } = require("express");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function authentication(req, res, next) {
    const { access_token } = req.headers;

    if (access_token) {
        try {
            const decode = jwt.verify(access_token, process.env.JWT_SECRET);
            const { id, email } = decode
            const user = prisma.users.findUnique({ where: { id: Number(id), } })
            if (!user) {
                next({ name: "ErrorNotFound" })
            } else {

                req.loggedUser = {
                    id: user.id,
                    email: user.email,
                    role: user.role
                } 
                next();
            }
        } catch (err) {
            next({ name: "JWTerror" })
        }
    } else {
        next({ name: "Unauthenticated" })
    }
}

// function authorization(req, res, next) {
//     const { role, email, id } = req.loggedUser;

//     if (role === "admin") {

//         next();
//     } else {
//         next({ name: "Unauthorized" })
//     }
// }

module.exports = {
    authentication
    // authorization
}