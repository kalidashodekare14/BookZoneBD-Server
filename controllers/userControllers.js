const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        res.status(200).send({
            success: true,
            message: "User created successfully",
            data: {
                id: newUser._id,
                email: newUser.email
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
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


module.exports = { registerUser, loginUser };