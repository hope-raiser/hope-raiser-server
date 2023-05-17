const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController.js');
const { authorizationComment, authentication} = require("../middlewares/auth.js");

router.get("/", CommentController.findComment)
router.get("/:id", CommentController.findCommentById)
router.post("/", authentication, CommentController.createComment)
router.put("/:id", CommentController.updateComment)
router.delete("/:id", authentication, authorizationComment, CommentController.deleteComment)

module.exports = router;