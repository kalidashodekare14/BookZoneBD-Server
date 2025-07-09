const User = require('../models/userModel');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const passwordHashed = await bcrypt.hashSync(password, 14)

        const newUser = await User.create({
            email,
            password
        })

        res.status(200).send({
            success: true,
            message: "User created successfully",
        })

    } catch (error) {
        
    }
}