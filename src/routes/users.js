const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const { authentication } = require("../middlewares/auth.js");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/", UserController.getAllUsers);
router.put("/update/:id", UserController.changePassword);
router.put("/change-name/:id", UserController.changeName);
router.patch("/update-user/:id", UserController.updateUser);
router.patch("/profile-user", UserController.updateUserProfile);
router.delete("/delete/:id", UserController.deleteUser);
// router.get("/:id",authentication, UserController.getUserByid);
router.get("/me",authentication, UserController.getUserLogin);

module.exports = router;
