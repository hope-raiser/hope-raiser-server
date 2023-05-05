const prisma = require("../helpers/prisma.js")

class BookmarkController {

    static findBookmark = async (req, res, next) => {
       
        try {
            const bookmark = await prisma.bookmark.findMany()
            res.status(200).json(bookmark);
        } catch (err) {
            next(err);
        }
    }
 
    static findBookmarkById = async (req, res, next) => {
    
        try {
            const {id} = req.params;
            const bookmark = await prisma.bookmark.findUnique({
                where: {id: +id}
            })
            if(bookmark) {
                res.status(200).json(bookmark);
            } else {
                next({ name: "ErrorNotFound" })
            }
        } catch (err) {
            next(err);
        }
    }

    static createBookmark = async (req, res, next) => {
        try {
            const {userId, campaignId} = req.body
            const findBookmark = await prisma.bookmark.findFirst({where: {userId: req.loggedUser.id, campaignId: campaignId}})
            console.log(findBookmark)
            if(!findBookmark) {
                const bookmark = await prisma.bookmark.create({
                    data: {
                        userId: req.loggedUser.id,
                        campaignId: +campaignId
                    }
                })
                res.status(200).json(bookmark);
            } else {
                throw{name: "AlreadyExists"}
            }
        } catch (err) {
            next(err);
        }
    }

    static deleteBookmark = async (req, res, next) => {
        try {
            const {id} = req.params;
            const bookmark = await prisma.bookmark.delete({
                where: {id: +id}
            })
            if(bookmark) {
                res.status(200).json({
                    message: "Bookmark deleted successfully"
                })
            }
        } catch (err) {
            next(err);
        }
    }

}

module.exports = BookmarkController;