const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

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
            password: hashedPassword
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

        res.status(200).json({
            message: "Login Successful",
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


module.exports = { registerUser, loginUser };