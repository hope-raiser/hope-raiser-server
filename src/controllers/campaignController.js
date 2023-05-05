const prisma = require("../helpers/prisma.js")

class CampaignController {

    static findCampaign = async (req, res, next) => {
       
        try {
            const campaign = await prisma.campaign.findMany()
            
            res.status(200).json(campaign);
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
            const campaign = await prisma.campaign.create({
                data: {
                    title,
                    description,
                    goal,
                    currentDonation,
                    endDate: new Date(endDate),
                    userId: req.loggedUser.id
                }
            })
            res.status(200).json(campaign);
        } catch (err) {
            next(err);
        }
    }

    static updateCampaign = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {title, description, goal, currentDonation, endDate} = req.body
            const campaign = await prisma.campaign.update({
                where: {id: +id},
                data: {
                    title,
                    description,
                    goal,
                    currentDonation,
                    endDate: new Date(endDate),
                    userId: req.loggedUser.id
                }
            })
            res.status(200).json(campaign);
        } catch (err) {
            next(err);
        }
    }

    static deleteCampaign = async (req, res, next) => {
        try {
            const {id} = req.params;
            const campaign = await prisma.campaign.delete({
                where: { id: +id },
            });
            
            if(campaign) {
                res.status(200).json({
                    message: "Campaign deleted successfully"
                })
            }
        } catch (err) {
            next(err);
        }
    }

}

module.exports = CampaignController;