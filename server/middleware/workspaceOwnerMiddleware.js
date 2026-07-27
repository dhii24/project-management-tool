const Workspace = require("../models/Workspace");

const workspaceOwnerMiddleware = async (req, res, next) => {
    try {

        // workspace ID fetched from route parameters
        const { workspaceId } = req.params;
        

        // check whether the workspace exists
        const workspace = await Workspace.findById(workspaceId);


        if(!workspace){
            return res.status(404).json({
                message: "Workspace not found"
            });
        }


        // Check if the logged-in user is the owner of this workspace
        const isOwner = workspace.owner.toString() === req.user.userId;


        // Admin users are also allowed to perform owner-only actions,
        // even if they do not own this workspace
        const isAdmin = req.user.role === "admin";


        // Deny access if the user is neither the owner nor an admin
        if(!isOwner && !isAdmin){
            return res.status(403).json({
                message: "Only the workspace owner or admin can perform this action"
            });
        }

        // Store the workspace in the request object so that
        // downstream middleware/controllers don't need to query it again
        req.workspace = workspace;

        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = workspaceOwnerMiddleware;