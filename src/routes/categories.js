const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categoriesController.js');
const {adminAuthorization, authentication} = require('../middlewares/auth.js'); 

router.get("/", CategoriesController.findCategories)
router.get("/:id", CategoriesController.findCategoriesById)
router.post("/", authentication, adminAuthorization, CategoriesController.createCategories)
router.put("/:id",authentication, adminAuthorization, CategoriesController.updateCategories) 
router.delete("/:id",authentication, adminAuthorization, CategoriesController.deleteCategories)

module.exports = router;