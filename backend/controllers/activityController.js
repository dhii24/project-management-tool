const Activity = require("../models/Activity");
const getPagination = require("../utils/pagination");

const getActivities = async (req, res) => {

    try{

        const { cardId } = req.params;

        const { page, limit, skip } = getPagination(req);

        const activities = await Activity.find({
            card: cardId
        })
        .populate("user", "name email")
        .sort({ createdAt: -1})
        .skip(skip)
        .limit(limit);

        const totalActivities = await Activity.countDocuments({
            card: cardId
        });

        res.status(200).json({
            activities,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalActivities / limit),
                totalActivities,
                limit
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = { getActivities };