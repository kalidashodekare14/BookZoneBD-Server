const User = require('../models/userModel');

const userInfoApi = async (req, res) => {
    try {
        const email = req.params.email;
        const userInfo = await User.findOne({ email }).lean();
        console.log('checking email', userInfo)
        const { password, ...userData } = userInfo;
        res.status(200).send({
            success: true,
            message: "User information successful",
            data: userData
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to find user."
        })
    }
}

const userInformationUpdate = async (req, res) => {
    try {
        const { name, description, email, date_of_birth, gender, mobile_number, image } = req.body;
        const userEmail = req.params.email;
        const extisEmail = await User.findOne({ email: userEmail })

        if (!extisEmail || userEmail === null) {
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

module.exports = { userInfoApi, userInformationUpdate }