const express = require('express');
const router = express.Router();
const BookmarkController = require('../controllers/bookmarkController.js');

router.get("/", BookmarkController.findBookmark);
router.get("/:id", BookmarkController.findBookmarkById)
router.post("/", BookmarkController.createBookmark);
router.delete("/:id", BookmarkController.deleteBookmark);

module.exports = router;