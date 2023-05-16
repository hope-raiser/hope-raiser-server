const express = require("express");
const router = express.Router();
const userRouter = require("./users.js");
const campaignRouter = require("./campaign.js");
const categoriesRouter = require("./categories.js");
const commentRouter = require("./comment.js");
const bookmarkRouter = require("./bookmark.js");
const donationRouter = require("./donation.js");
const { authentication } = require("../middlewares/auth.js");

router.use("/users", userRouter);
router.use("/campaigns", campaignRouter);
router.use(authentication);
router.use("/categories", categoriesRouter);
router.use("/comments", commentRouter);
router.use("/bookmarks", bookmarkRouter);
router.use("/donations", donationRouter);

module.exports = router;
