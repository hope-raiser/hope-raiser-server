const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController.js');

router.get("/", CommentController.findComment)
router.get("/:id", CommentController.findCommentById)
router.post("/", CommentController.createComment)
router.put("/:id", CommentController.updateComment)
router.delete("/:id", CommentController.deleteComment)

module.exports = router;