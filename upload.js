const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/");
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(" ").join("-");
		cb(null, Date.now() + "-" + fileName);
	}
});

const upload = multer({
	storage: diskStorage,
	limits: { fileSize: 10000000 } // 10MB limit
});


module.exports =  upload