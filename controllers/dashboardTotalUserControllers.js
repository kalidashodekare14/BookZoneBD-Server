const Users = require('../models/userModel');

const dashboardTotalUsers = async (req, res) => {
    try {
        const { search, page, limit } = req.query;
        const id = req.user.id

        const userVerify = await Users.findById(id);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - user mismatch",
            })
        }

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
            error: error.message
        })
    }
}

const dashboardUserRole = async (req, res) => {
    try {
        const id = req.params.id
        const roleData = req.body;
        const verifyId = req.user.id

        const userVerify = await Users.findById(verifyId);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const userRole = await Users.findByIdAndUpdate(
            id,
            { $set: { role: roleData.role } },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "User role update successfully",
            data: userRole
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "User role update failed",
            error: error.message
        })
    }
}

const dashboardUserAction = async (req, res) => {
    try {
        const id = req.params.id;
        const { action } = req.body;
        console.log('checking id action', id, action);
        const verifyId = req.user.id;

        const userVerify = await Users.findById(verifyId);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const actionData = await Users.findByIdAndUpdate(
            id,
            {
                $set: {
                    isActive: action
                }
            },
            {
                new: true
            }
        )
        res.status(200).send({
            success: true,
            message: "User action successfully",
            data: actionData
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "User action failed",
            error: error.message
        })
    }
}


module.exports = { dashboardTotalUsers, dashboardUserRole, dashboardUserAction }


