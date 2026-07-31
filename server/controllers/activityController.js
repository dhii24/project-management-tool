const Activity = require("../models/Activity");

const getActivities = async (req, res) => {

    try{

        const { cardId } = req.params;

        const activities = await Activity.find({
            card: cardId
        })
        .populate("user", "name email")
        .sort({ createdAt: -1});

        res.status(200).json({
            activities
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = { getActivities };


// 6a69ffd1c358230160fc8308