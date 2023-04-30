const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');

router.post("/register", UserController.registerUser)
router.post("/login", UserController.loginUser)
router.put("/update/:id", UserController.changePassword)
router.delete("/delete/:id", UserController.deleteUser)

module.exports = router;