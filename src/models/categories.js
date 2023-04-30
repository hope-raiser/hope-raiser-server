const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


class Categories {

    static findCategories = async (next) => {
        try {
            const user = await prisma.categories.findMany()
            return user
        } catch (err) {
            next(err);
        }
    }

    static findCategoriesById = async (id, next) => {
        try {
            const user = await prisma.categories.findUnique({ where: { id: Number(id), } })
            return user
        } catch (err) {
            next(err)
        }
    }

    static createCategories = async (name, description, next) => {
        try {
            const user = await prisma.categories.create({
                data: {
                    name,
                    description
                },
            });
            return user
        } catch (err) {
            next();
        }
    }

    static updateCategories = async (id, name, description, next) => {
        try {
            const user = await prisma.categories.update({
                where: { id: Number(id) },
                data: {
                    name,
                    description
                },
            });
            return user
        } catch (err) {
            next();
        }
    }

    static deleteCategories = async (id, next) => {
        try {
            const user = await prisma.categories.delete({ where: { id: Number(id), }, });
            return user
        } catch (err) {
            next({ name: "ErrorNotFound" })
        }
    }
}


module.exports = Categories;