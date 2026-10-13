const Card = require("../models/Card");
const Workspace = require("../models/Workspace");
const Board = require("../models/Board");
const List = require("../models/List");

const { getCache, setCache } = require("../utils/cache");

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
        const workspaceId = req.workspace._id.toString();
        const cacheKey = `analytics:${workspaceId}:status`;

        // 1. Try Redis first
        const cachedData = await getCache(cacheKey);

        if (cachedData !== null) {
            return res.status(200).json(cachedData);
        }

        // 2. Cache miss: query MongoDB
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

        // 3. Cache the result for 60 seconds
        await setCache(cacheKey, result, 60);

        // 4. Return the original response format
        return res.status(200).json(result);

    } 
    
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getCardsByLabel = async (req, res) => {
    try {
        const workspaceId = req.workspace._id.toString();
        const cacheKey = `analytics:${workspaceId}:labels`;

        // 1. Check Redis first
        const cachedData = await getCache(cacheKey);

        if (cachedData !== null) {
            return res.status(200).json(cachedData);
        }

        // 2. Cache miss: query MongoDB
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

        // 3. Cache the result for 60 seconds
        await setCache(cacheKey, result, 60);

        // 4. Return the original response format
        return res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



const getMemberWorkload = async (req, res) => {
    try {
        const workspaceId = req.workspace._id.toString();
        const cacheKey = `analytics:${workspaceId}:workload`;

        // 1. Check Redis first
        const cachedData = await getCache(cacheKey);

        if (cachedData !== null) {
            return res.status(200).json(cachedData);
        }

        // 2. Cache miss: query MongoDB
        const listIds = await getWorkspaceListIds(req.workspace._id);

        const result = await Card.aggregate([
            {
                $match: {
                    list: { $in: listIds }
                }
            },
            {
                $unwind: "$assignedMembers"
            },
            {
                $group: {
                    _id: "$assignedMembers",
                    totalCards: {
                        $sum: 1
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
                $sort: {
                    totalCards: -1
                }
            }
        ]);

        // 3. Cache the result for 60 seconds
        await setCache(cacheKey, result, 60);

        // 4. Return the original response format
        return res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



const getUpcomingDueCards = async (req, res) => {
    try {
        const workspaceId = req.workspace._id.toString();
        const cacheKey = `analytics:${workspaceId}:due-this-week`;

        // 1. Check Redis first
        const cachedData = await getCache(cacheKey);

        if (cachedData !== null) {
            return res.status(200).json(cachedData);
        }

        // 2. Cache miss: query MongoDB
        const listIds = await getWorkspaceListIds(req.workspace._id);

        const today = new Date();

        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const result = await Card.find({
            list: { $in: listIds },
            dueDate: {
                $gte: today,
                $lte: nextWeek
            }
        })
            .sort({
                dueDate: 1
            });

        // 3. Cache the result for 60 seconds
        await setCache(cacheKey, result, 60);

        // 4. Return the original response format
        return res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



const getWorkspaceStats = async (req, res) => {
    try {
        const workspaceId = req.workspace._id.toString();
        const cacheKey = `analytics:${workspaceId}:workspace`;

        // 1. Check Redis first
        const cachedData = await getCache(cacheKey);

        if (cachedData !== null) {
            return res.status(200).json(cachedData);
        }

        // 2. Cache miss: query MongoDB
        const totalBoards = await Board.countDocuments({
            workspace: req.workspace._id
        });

        const listIds = await getWorkspaceListIds(req.workspace._id);

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

        const result = {
            workspaceName: req.workspace.name,
            totalBoards,
            totalCards,
            totalMembers,
            overdueCards
        };

        // 3. Cache the result for 60 seconds
        await setCache(cacheKey, result, 60);

        // 4. Return the original response format
        return res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = { getCardsByStatus, getCardsByLabel, getMemberWorkload, getUpcomingDueCards, getWorkspaceStats };