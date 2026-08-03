const Card = require("../models/Card");
const Workspace = require("../models/Workspace");

const getCardsByStatus = async (req, res) => {

    try {

        const result = await Card.aggregate([
            {
                $lookup: {
                    from: "lists",
                    localField: "list",
                    foreignField: "_id",
                    as: "list"
                }
            },

            {
                $unwind: "$list"
            },

            {
                $group: {
                    _id: "$list.title",
                    totalCards: {
                        $sum: 1
                    }
                }
            },

            {
                $project: {
                    _id: 0,
                    list: "$_id",
                    totalCards: 1
                }
            },

            {
                $sort: {
                    totalCards: -1
                }
            }

        ]);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message

        });

    }

};

const getCardsByLabel = async (req, res) => {

    try {

        const result = await Card.aggregate([

            {
                $unwind: "$labels"
            },
            {
                $group: {
                    _id: "$labels",
                    totalCards: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    totalCards: -1
                }
            }
        ]);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message

        });

    }

};

const getMemberWorkload = async (req,res) => {

    try{

        const result= await Card.aggregate([
            {
                $unwind: "$assignedMembers"
            },

            {
                $group:{
                    _id: "$assignedMembers",
                    totalCards:{
                        $sum:1
                    }
                }
            },

            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },

            {
                $unwind: "$user"
            },

            {
                $project: {
                    _id: 0,
                    userId: "$user._id",
                    name: "$user.name",
                    email: "$user.email",
                    totalCards: 1
                }
            },

            {
                $sort:{
                    totalCards: -1
                }
            }
        ]);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

};

const getUpcomingDueCards = async( req,res) => {

    try{

        const today = new Date();

        const nextWeek = new Date();

        nextWeek.setDate(today.getDate()+7);

        const result = await Card.find({
            dueDate:{
                $gte: today,
                $lte: nextWeek
            }
        
        })
        .sort({
            dueDate: 1
        });
        
        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

};

const getWorkspaceStats = async (req,res) => {

    try{

        const totalWorkspaces = await Workspace.countDocuments();

        const totalCards = await Card.countDocuments();

        res.status(200).json({
            totalWorkspaces,
            totalCards
        });

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports = { getCardsByStatus, getCardsByLabel, getMemberWorkload, getUpcomingDueCards, getWorkspaceStats };