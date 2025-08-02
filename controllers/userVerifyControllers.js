const User = require('../models/userModel');

const adminVarify = async (req, res) => {
    try {
        const userFromParams = req.params.email;
        const userByFromToken = req.user;
        const adminInfo = await User.findById(userByFromToken);

        if (userFromParams !== adminInfo.email) {
            return res.status(403).send({
                success: false,
                message: "Forbidden access - user mismatch"
            })
        }
        const isAdmin = adminInfo?.role.toLowerCase() === "admin"

        res.status(200).send({
            success: true,
            message: "Admin successfuly",
            admin: isAdmin
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Admin varify failed",
            error
        })
    }
}

module.exports = { adminVarify }