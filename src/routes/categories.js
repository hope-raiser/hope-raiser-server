const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categoriesController.js');
const {adminAuthorization} = require('../middlewares/auth.js'); 

router.get("/", CategoriesController.findCategories)
router.get("/:id", CategoriesController.findCategoriesById)
router.post("/", adminAuthorization, CategoriesController.createCategories)
router.put("/:id",adminAuthorization, CategoriesController.updateCategories) 
router.delete("/:id",adminAuthorization, CategoriesController.deleteCategories)

module.exports = router;