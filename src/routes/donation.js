const express = require('express');
const router = express.Router();
const DonationController = require('../controllers/donationController.js');
const { authentication} = require("../middlewares/auth.js");

router.get("/", DonationController.findDonation)
router.get("/:id", DonationController.findDonationById)
router.post("/", authentication, DonationController.createDonation)
router.put("/:id", DonationController.updateDonation)
router.delete("/:id", DonationController.deleteDonation)

module.exports = router;