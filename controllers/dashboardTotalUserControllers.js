const Users = require('../models/userModel');

const dashboardTotalUsers = async (req, res) => {
    try {
        const { search, page, limit } = req.query;
        console.log('checking all users api query', search, page, limit)


        const total = await Users.countDocuments();
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;


        const totalUsers = await Users.find({}).skip(skip).limit(limitNum).lean();

        const safeData = totalUsers.map(user => {
            const { password, ...rest } = user;
            return rest;
        })

        const userData = {
            totalPages: Math.ceil(total / limitNum),
            users: safeData
        }

        res.status(200).send({
            success: true,
            message: "Total user successfuly",
            data: userData
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


