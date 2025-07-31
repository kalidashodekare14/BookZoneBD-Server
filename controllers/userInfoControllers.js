const User = require('../models/userModel');

const userInfoApi = async (req, res) => {
    try {
        const userFromParams = req.params.email;
        const userIdFromToken = req.user;
        const userInfo = await User.findById(userIdFromToken).lean();

        if (!userInfo || userInfo.email !== userFromParams) {
            return res.status(403).send({
                success: false,
                message: "Forbidden access - user mismatch"
            })
        }

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
        const profileInfo = req.body;
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
            { $set: profileInfo },
            { new: true }

        )
        console.log('checking data update', updateInformation)
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

const userNavInfo = async (req, res) => {
    try {
        const { email } = req.params;
        console.log('checking nav email', email)
        const userInfo = await User.findOne({ email: email });
        res.status(200).send({
            success: true,
            message: "User Nav Information successfully",
            data: userInfo?.image
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "User Nav Information failed"
        })
    }

}

module.exports = { userInfoApi, userInformationUpdate, userNavInfo }