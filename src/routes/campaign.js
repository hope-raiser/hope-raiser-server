const express = require('express');
const router = express.Router();
const CampaignController = require('../controllers/campaignController.js');
const {authorization} = require('../middlewares/auth.js'); 

router.get("/", CampaignController.findCampaign)
router.get("/:id", CampaignController.findCampaignById)
router.post("/", CampaignController.createCampaign)
router.put("/:id", authorization, CampaignController.updateCampaign) 
router.delete("/:id", authorization, CampaignController.deleteCampaign)

module.exports = router;