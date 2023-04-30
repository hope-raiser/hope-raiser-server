const express = require('express');
const router = express.Router();
const userRouter = require("./users.js");
const campaignRouter = require("./campaign.js");
const categoriesRouter = require("./categories.js");
const {authentication} = require("../middlewares/auth.js")

router.use("/user", userRouter);
router.use(authentication);
router.use("/campaign", campaignRouter);
router.use("/categories", categoriesRouter);

module.exports = router;