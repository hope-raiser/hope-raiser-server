const express = require("express");
const router = express.Router();
const userRouter = require("./users.js");
const campaignRouter = require("./campaign.js");
const categoriesRouter = require("./categories.js");
const commentRouter = require("./comment.js");
const bookmarkRouter = require("./bookmark.js");
const donationRouter = require("./donation.js");

router.use("/users", userRouter);
router.use("/campaigns", campaignRouter);
router.use("/comments", commentRouter);
router.use("/donations", donationRouter);
router.use("/bookmarks", bookmarkRouter);
router.use("/categories", categoriesRouter);

module.exports = router;
