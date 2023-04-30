const Categories = require("../models/categories.js");

class CategoriesController {

    static findCategories = async (req, res, next) => {
       
        try {
            const data = await Categories.findCategories(next);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }
 
    static findCategoriesById = async (req, res, next) => {
    
        try {
            const {id} = req.params;
            const data = await Categories.findCategoriesById(id, next);
            if(data) {
                res.status(200).json(data);
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
            const data = await Categories.createCategories(name, description, next);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static updateCategories = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {name, description} = req.body

            const data = await Categories.updateCategories(id, name, description, next);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static deleteCategories = async (req, res, next) => {
        try {
            const {id} = req.params;
            const data = await Categories.deleteCategories(id, next);
            
            if(data) {
                res.status(200).json({
                    message: "Movie deleted successfully"
                })
            }
        } catch (err) {
            next(err);
        }
    }

}

module.exports = CategoriesController;