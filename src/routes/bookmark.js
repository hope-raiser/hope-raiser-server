const express = require('express');
const router = express.Router();
const BookmarkController = require('../controllers/bookmarkController.js');
const { authentication } = require("../middlewares/auth.js");

router.get("/", authentication, BookmarkController.findBookmark);
router.get("/:id", BookmarkController.findBookmarkById)
router.post("/", authentication, BookmarkController.createBookmark);
router.delete("/:id",authentication, BookmarkController.deleteBookmark);

module.exports = router;