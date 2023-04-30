const express = require('express');
const router = express.Router();
const CampaignController = require('../controllers/campaignController.js');

router.get("/", CampaignController.findCampaign)
router.get("/:id", CampaignController.findCampaignById)
router.post("/", CampaignController.createCampaign)
router.put("/:id", CampaignController.updateCampaign) 
router.delete("/:id", CampaignController.deleteCampaign)

module.exports = router;