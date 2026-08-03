const Workspace = require("../models/Workspace");

const workspaceMemberMiddleware = async(req, res, next) => {
    try {
        const { workspaceId } = req.params;

        const workspace = await Workspace.findById(workspaceId);

        if(!workspace){
            return res.status(404).json({
                message: "Workspace not found"
            });
        }

        const isMember = workspace.members.some(
            member => member.toString() === req.user.userId
        );

        if(!isMember){
            return res.status(403).json({
                message: "You are not a member of this workspace."
            });
        }

        req.workspace = workspace;

        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
    
};

module.exports = workspaceMemberMiddleware;