
const List = require("../models/List");
const Board = require("../models/Board");
const invalidateWorkspaceAnalytics = require("./invalidateWorkspaceAnalytics");

const invalidateAnalyticsForList = async (listId) => {
    try {
        const list = await List.findById(listId)
            .select("board")
            .lean();

        if (!list) {
            console.error(
                "Analytics invalidation skipped: list not found."
            );
            return false;
        }

        const board = await Board.findById(list.board)
            .select("workspace")
            .lean();

        if (!board) {
            console.error(
                "Analytics invalidation skipped: board not found."
            );
            return false;
        }

        return await invalidateWorkspaceAnalytics(board.workspace);
    } catch (error) {
        console.error(
            "Analytics invalidation failed:",
            error.message
        );
        return false;
    }
};

module.exports = invalidateAnalyticsForList;
