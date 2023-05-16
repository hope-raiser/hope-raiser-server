const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController.js');
const { authorizationComment} = require("../middlewares/auth.js");

router.get("/", CommentController.findComment)
router.get("/:id", CommentController.findCommentById)
router.post("/", CommentController.createComment)
router.put("/:id", CommentController.updateComment)
router.delete("/:id", authorizationComment, CommentController.deleteComment)

module.exports = router;