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


const userInformationUpdate = async (req, res) => {
    try {
        const { name, description, email, date_of_birth, gender, mobile_number, image } = req.body;
        const userEmail = req.params.email;
        const extisEmail = await User.findOne({ email: userEmail })

        if(!extisEmail || userEmail === null){
            res.status(401).send({
                success: false,
                message: "You are unauthorized",
            })
        }

        const updateInformation = await User.findOneAndUpdate(
            { email: userEmail },
            {
                name,
                description,
                email,
                date_of_birth,
                gender,
                mobile_number,
                image
            }
        )
        res.status(200).send({
            success: true,
            message: "User information update succefully",
            data: updateInformation
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "User Infomation update failed",
            error
        })
    }

}

module.exports = { registerUser, loginUser, userInformationUpdate };