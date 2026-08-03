const Notification = require("../models/Notification");
const getPagination = require("../utils/pagination");

const getNotifications = async(req,res)=>{

    try{

        const { page, limit, skip } = getPagination(req);

        const notifications= await Notification.find({
            recipient: req.user.userId
        })
        .populate("sender", "name email")
        .populate("card", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        const totalNotifications = await Notification.countDocuments({
            recipient: req.user.userId
        });

        const totalPages = Math.max(1, Math.ceil(totalNotifications / limit));

        res.status(200).json({
            notifications,
            pagination: {
                currentPage: page,
                totalPages,
                totalNotifications,
                limit,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const markAsRead = async(req,res)=>{

    try{

        const { notificationId } = req.params;

        // Find this notification only if it belongs to the logged-in user.
        const notification= await Notification.findOne({
            _id: notificationId,
            recipient: req.user.userId
        });

        if(!notification){
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        notification.isRead=true;

        await notification.save();

        res.status(200).json({
            message: "Notification marked as read"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getUnreadCount = async (req, res) => {

    try{

        const count = await Notification.countDocuments({
            recipient: req.user.userId,
            isRead: false
        });

        res.status(200).json({
            count
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }

};

module.exports = { getNotifications, markAsRead, getUnreadCount };