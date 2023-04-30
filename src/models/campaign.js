const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


class Campaign {

    static findCampaign = async (next) => {
        try {
            const user = await prisma.campaign.findMany()
            return user
        } catch (err) {
            next(err);
        }
    }

    static findCampaignById = async (id, next) => {
        try {
            const user = await prisma.campaign.findUnique({ where: { id: Number(id), } })
            return user
        } catch (err) {
            next(err)
        }
    }

    static createCampaign = async (title, description, goal, currentDonation, endDate, userId, next) => {
        try {
            const user = await prisma.campaign.create({
                data: {
                    title,
                    description,
                    goal,
                    currentDonation,
                    endDate,
                    userId
                },
            });
            return user
        } catch (err) {
            next();
        }
    }

    static updateCampaign = async (id, title, description, goal, currentDonation, endDate, next) => {
        try {
            const user = await prisma.campaign.update({
                where: { id: Number(id) },
                data: {
                    title,
                    description,
                    goal,
                    currentDonation,
                    endDate
                },
            });
            return user
        } catch (err) {
            next();
        }
    }

    static deleteCampaign = async (id, next) => {
        try {
            const user = await prisma.campaign.delete({ where: { id: Number(id), }, });
            return user
        } catch (err) {
            next({ name: "ErrorNotFound" })
        }
    }
}


module.exports = Campaign;