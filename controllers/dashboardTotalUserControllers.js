const Users = require('../models/userModel');

const dashboardTotalUsers = async (req, res) => {
    try {
        const { search, page, limit } = req.query;
        console.log('checking all users api query', search, page, limit)

        const query = {}

        if (search) {
            query.email = { $regex: search, $options: 'i' }
        }

        const total = await Users.countDocuments(query);
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        console.log('check pageNum', pageNum)
        console.log('check limitNum', limitNum)
        console.log('check skip', skip)

        const totalUsers = await Users.find(query).skip(skip).limit(limitNum).lean();

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


