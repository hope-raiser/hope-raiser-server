const Campaign = require("../models/campaign.js");

class CampaignController {

    static findCampaign = async (req, res, next) => {
       
        try {
            const data = await Campaign.findCampaign(next);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }
 
    static findCampaignById = async (req, res, next) => {
    
        try {
            const {id} = req.params;
            const data = await Campaign.findCampaignById(id, next);
            if(data) {
                res.status(200).json(data);
            } else {
                next({ name: "ErrorNotFound" })
            }
        } catch (err) {
            next(err);
        }
    }

    static createCampaign = async (req, res, next) => {
        try {
            const {title, description, goal, currentDonation, endDate, userId} = req.body
            const data = await Campaign.createCampaign(title, description, goal, currentDonation, endDate, userId, next);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static updateCampaign = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {title, description, goal, currentDonation, endDate} = req.body

            const data = await Campaign.updateCampaign(id, title, description, goal, currentDonation, endDate, next);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static deleteCampaign = async (req, res, next) => {
        try {
            const {id} = req.params;
            const data = await Campaign.deleteCampaign(id, next);
            
            if(data) {
                res.status(200).json({
                    message: "Movie deleted successfully"
                })
            }
        } catch (err) {
            next(err);
        }
    }

}

module.exports = CampaignController;