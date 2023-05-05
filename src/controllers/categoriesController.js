const prisma = require("../helpers/prisma.js")

class CategoriesController {

    static findCategories = async (req, res, next) => {
       
        try {
            const categories = await prisma.categories.findMany()
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }
 
    static findCategoriesById = async (req, res, next) => {
    
        try {
            const {id} = req.params;
            const categories = await prisma.categories.findUnique({
                where: {id: +id}
            })
            if(categories) {
                res.status(200).json(categories);
            } else {
                next({ name: "ErrorNotFound" })
            }
        } catch (err) {
            next(err);
        }
    }

    static createCategories = async (req, res, next) => {
        try {
            const {name, description,} = req.body
            const categories = await prisma.categories.create({
                data: {
                    name,
                    description
                }
            })
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }

    static updateCategories = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {name, description} = req.body
            const categories = await prisma.categories.update({
                where: {id: +id},
                data: {
                    name,
                    description
                }
            })
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }

    static deleteCategories = async (req, res, next) => {
        try {
            const {id} = req.params;
            const categories = await prisma.categories.delete({
                where: {id: +id}
            })
            if(categories) {
                res.status(200).json({
                    message: "Categories deleted successfully"
                })
            }
        } catch (err) {
            next(err);
        }
    }

}

module.exports = CategoriesController;