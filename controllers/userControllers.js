const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const passwordHashed = await bcrypt.hash(password, 14)
        const userEmail = await User.findOne({ email })

        if (userEmail) {
            return res.status(409).send({
                success: false,
                message: "User Already Exits"
            })
        }

        const newUser = await User.create({
            email,
            password: passwordHashed
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).send({
            success: true,
            message: "User created successfully",
            data: {
                id: newUser._id,
                email: newUser.email,
                token
            }
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'User Registration failed',
            error,
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('checking data login', email, password)
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            data: {
                id: user._id,
                email: user.email,
                token
            },
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'User Login failed',
            error,
        })
    }
}

const googleAuthUser = async (req, res) => {
    try {
        const { name, image, email, isGoogleUser } = req.body;
        const dummyPassword = crypto.randomBytes(16).toString("hex");

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const exitsToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            return res.status(200).send({
                success: true,
                message: "User login successfully",
                data: {
                    token: exitsToken
                }
            })
        }

        const newUser = await User.create({
            name,
            email,
            image,
            isGoogleUser,
            password: dummyPassword
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });


        res.status(200).send({
            success: true,
            message: "User created successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                image: newUser.image,
                isGoogleUser: newUser.isGoogleUser,
                token
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Google Auth Registration failed',
            error,
        })
    }

}


module.exports = { registerUser, loginUser, googleAuthUser };