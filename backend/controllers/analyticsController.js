const Card = require("../models/Card");
const Workspace = require("../models/Workspace");
const Board = require("../models/Board");
const List = require("../models/List");

const getWorkspaceListIds = async (workspaceId) => {
    const boards = await Board.find({workspace: workspaceId}).select("_id").lean();

    const boardIds = boards.map((board) => board._id);

    const lists = await List.find({
        board: { $in: boardIds }
    })
    .select("_id")
    .lean();

    return lists.map((list) => list._id);
};

const getCardsByStatus = async (req, res) => {

    try {
        const listIds = await getWorkspaceListIds(req.workspace._id);

        const result = await Card.aggregate([
            {
                $match: {
                    list: { $in: listIds }
                }
            },
            
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
                    _id: "$list.name",
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
        const listIds = await getWorkspaceListIds(req.workspace._id);

        const result = await Card.aggregate([
            {
                $match: {
                    list: { $in: listIds }
                }
            },
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
        const listIds = await getWorkspaceListIds(req.workspace._id);

        const result= await Card.aggregate([
            {
                $match: {
                    list: { $in: listIds }
                }
            },
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
        const listIds = await getWorkspaceListIds(req.workspace._id);

        const today = new Date();

        const nextWeek = new Date();
        nextWeek.setDate(today.getDate()+7);

        const result = await Card.find({
            list: { $in: listIds },
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
        const workspaceId = req.workspace._id;
        
        const totalBoards = await Board.countDocuments({
            workspace: workspaceId
        });

        const listIds = await getWorkspaceListIds(workspaceId);

        const totalCards = await Card.countDocuments({
            list: { $in: listIds }
        });

        const totalMembers = req.workspace.members.length;

        const now = new Date();
        const overdueCards = await Card.countDocuments({
            list: { $in: listIds },
            dueDate: {
                $lt: now
            }
        });

        res.status(200).json({
            workspaceName: req.workspace.name,
            totalBoards,
            totalCards,
            totalMembers,
            overdueCards
        });

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports = { getCardsByStatus, getCardsByLabel, getMemberWorkload, getUpcomingDueCards, getWorkspaceStats };