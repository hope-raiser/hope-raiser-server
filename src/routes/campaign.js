const express = require("express");
const router = express.Router();
const CampaignController = require("../controllers/campaignController.js");
const { authorization } = require("../middlewares/auth.js");
const upload = require("../../upload");

router.get("/", CampaignController.findCampaign);
router.get("/:id", CampaignController.findCampaignById);
router.post("/", upload.single("image"), CampaignController.createCampaign);
router.put("/:id", authorization, upload.single("image"), CampaignController.updateCampaign);
router.delete("/:id", authorization, CampaignController.deleteCampaign);

module.exports = router;
