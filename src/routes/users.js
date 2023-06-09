const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const { authentication } = require("../middlewares/auth.js");
const upload = require("../../upload");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/",authentication , UserController.getAllUsers);
router.put("/update/:id", authentication,UserController.changePassword);
router.put("/update",authentication, UserController.updateUser);
router.put("/update-avatar",authentication, upload.single("avatar"), UserController.updateAvatar);
// router.patch("/update-user/:id", authentication, UserController.updateUser);
router.patch("/profile-user", authentication,UserController.updateUserProfile);
router.delete("/delete/:id", authentication,UserController.deleteUser);
// router.get("/:id",authentication, UserController.getUserByid);
router.get("/me",authentication, UserController.getUserLogin);

module.exports = router;
