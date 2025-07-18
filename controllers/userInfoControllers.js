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

module.exports = { userInfoApi, userInformationUpdate }