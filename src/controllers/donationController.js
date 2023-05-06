const prisma = require("../helpers/prisma.js")

class DonationController {

    static findDonation = async (req, res, next) => {
       
        try {
            const donation = await prisma.donations.findMany()
            res.status(200).json(donation);
        } catch (err) {
            next(err);
        }
    }
 
    static findDonationById = async (req, res, next) => {
    
        try {
            const {id} = req.params;
            const donation = await prisma.donations.findUnique({where: {id: +id}})
            if(donation) {
                res.status(200).json(donation);
            } else {
                next({ name: "ErrorNotFound" })
            }
        } catch (err) {
            next(err);
        }
    }

    static createDonation = async (req, res, next) => {
        try {
            // console.log(prisma)
            const {amount, campaignId} = req.body
            const donation = prisma.donations.create({
                data: {
                    amount,
                    userId: req.loggedUser.id,
                    campaignId
                }
            })
            const campaignUpdate = prisma.campaign.update({
                where:{id: +campaignId},
                data: {
                    currentDonation:{increment: +amount}
                }
            })
            const [result, amountUpdate] = await prisma.$transaction([donation, campaignUpdate])
            res.status(200).json(result);

        } catch (err) {
            next(err);
        }
    }

    static updateDonation = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {content} = req.body
            const donation = await prisma.donations.update({
                where: { id: +id },
                data: {
                    content
                }
            })
            res.status(200).json({donation})
        } catch (err) {
            next(err);
        }
    }

    static deleteDonation = async (req, res, next) => {
        try {
            const {id} = req.params;
            const donation = await prisma.donations.delete({
                where: { id: +id },
            })
            
            if(donation) {
                res.status(200).json({
                    message: "Donation deleted successfully"
                })
            }
        } catch (err) {
            next(err);
        }
    }

}

module.exports = DonationController;