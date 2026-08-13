const mongoose = require('mongoose');

const User = require("../models/User");
const Workspace = require("../models/Workspace");

const createWorkspace = async (req, res) => {
    try {
        const {name, description} = req.body;

        const workspace = await Workspace.create({
            name,
            description,
            owner: req.user.userId,
            members: [req.user.userId]
        });

        res.status(201).json({
            message: "Workspace Created Successfully",
            workspace
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getAllWorkspaces = async (req,res) => {
    try {
        const workspaces = await Workspace.find().populate("owner", "-_id name email role").populate("members", "-_id name email role");

        res.status(200).json({
            workspaces
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const addMember = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const { userId } = req.body;
        
        const workspace = await Workspace.findById(workspaceId);

        if(!workspace){
            return res.status(404).json({
                message: "Workspace not found"
            });
        }

        // console.log("Workspace ID:", workspaceId);
        // console.log("User ID:", userId);

        const user = await User.findById(userId);

        // console.log("User:", user);

        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        await Workspace.findByIdAndUpdate(
            workspaceId,
            {
                $addToSet:{
                    members: userId
                }
            },
            {
                new: true
            }
        );

        res.status(200).json({
            message: "Member added successfully"
        });

    } catch (error){
        res.status(500).json({
            message: error.message
        });
    }

};

const getMyWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find({
            members: req.user.userId
        })
        .select("name description owner members createdAt updatedAt")
        .populate("owner", "name email role")
        .populate("members", "name email role");

        res.status(200).json({
            workspaces
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
};

const getWorkspaceById = async (req, res) => {
    try{
        const { workspaceId } = req.params;

        const workspace = await Workspace
        .findById(workspaceId)
        .select("name description owner members createdAt updatedAt")
        .populate("owner", "name email role")
        .populate("members", "name email role");

        if(!workspace){
            return res.status(404).json({
                message: "Workspace not found"
            });
        }

        const isMember = workspace.members.some(
            member => member._id.toString() === req.user.userId
        );

        if(!isMember){
            return res.status(403).json({
                message: "You are not a member of this workspace"
            });
        }

        res.status(200).json(workspace);
    }

    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const updateWorkspace = async (req, res) => {
    try {
        const workspace = req.workspace;

        const { name, description } = req.body;

        if(name === undefined && description === undefined){
            return res.status(400).json({
                message: "Please provide at least one field to update."
            });
        }

        if(name !== undefined){
            workspace.name = name;
        }

        if(description !== undefined){
            workspace.description = description;
        }

        await workspace.save();

        res.status(200).json({
            message: "Workspace updated successfully",
            workspace
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteWorkspace = async (req, res) => {
    try {
        await req.workspace.deleteOne();

        res.status(200).json({
            message: "Workspace deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = { createWorkspace, getAllWorkspaces, addMember, getMyWorkspaces, updateWorkspace, deleteWorkspace, getWorkspaceById };