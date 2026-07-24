const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(409).json({
                message: "Email already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched){
            return res.status(401).json({
                message: "Invalid email or password dhiraj "
            })
        }

        const accessToken = jwt.sign(
            {
                userId: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            accessToken,
            user : {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
 
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const getProfile = (req,res) => {
    res.status(200).json({
        message: "Profile fetched successfully",
        user: req.user
    })
};

const adminDashboard = (req,res) => {
    res.status(200).json({
        message: "Welcome Admin",
        user: req.user
    });
};

module.exports = { registerUser, loginUser, getProfile, adminDashboard };