const pool = require("../config/config.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class User {

    static registerUser = async (name, email, password, role, next) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.users.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role,
                },
            });
            return user
        } catch (err) {
            next({ name: "UserAlreadyExists" });
        }
    }

    static loginUser = async (email, password, next) => {
        try {
            const user = await prisma.users.findUnique({ where: { email } });
            return user
        } catch (err) {
            next(err);
        }
    }

    static changePassword = async (id, password, next) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.users.update({ where: { id: Number(id) }, data: { password: hashedPassword, }, });
            return user
        } catch (err) {
            next(err);
        }
    }

    static deleteUser = async (id, next) => {
        try {
            const user = await prisma.users.delete({ where: { id: Number(id), }, });
            return user
        } catch (err) {
            next({ name: "ErrorNotFound" })
        }
    }

}

module.exports = User;