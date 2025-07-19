const Users = require('../models/userModel');

const dashboardTotalUsers = async (req, res) => {
    try {
        const totalUsers = await Users.find({}).lean();

        const safeData = totalUsers.map(user => {
            const { password, ...rest } = user;
            return rest;
        })

        res.status(200).send({
            success: true,
            message: "Total user successfuly",
            data: safeData
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Total user failed",
            error
        })
    }
}


module.exports = { dashboardTotalUsers }


