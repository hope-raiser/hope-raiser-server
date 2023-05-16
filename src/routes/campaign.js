const express = require("express");
const router = express.Router();
const CampaignController = require("../controllers/campaignController.js");
const { authorization, authentication } = require("../middlewares/auth.js");
const upload = require("../../upload");

router.get("/", CampaignController.findCampaign);
router.get("/:id", CampaignController.findCampaignById);
router.post("/", authentication, upload.single("image"), CampaignController.createCampaign);
router.put("/:id", authentication, authorization, upload.single("image"), CampaignController.updateCampaign);
router.delete("/:id", authentication, authorization, CampaignController.deleteCampaign);

module.exports = router;
