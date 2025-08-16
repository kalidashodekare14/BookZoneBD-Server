const User = require('../models/userModel');
const Book = require('../models/totalBooksModel');
const orderModel = require('../models/orderModel');

const dashboardTotalInfo = async (req, res) => {
    try {
        const id = req.user.id
        const userVerify = await User.findById(id);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const totalUser = await User.countDocuments();
        const totalBook = await Book.countDocuments();
        const totalOrder = await orderModel.countDocuments();
        const totalEarn = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ])

        const totalInfo = {
            totalUsers: {
                value: totalUser
            },
            totalBooks: {
                value: totalBook
            },
            totalOrders: {
                value: totalOrder
            },
            totalAmount: {
                value: totalEarn.length > 0 ? totalEarn[0].totalAmount : 0
            }
        }
        res.status(200).send({
            success: true,
            message: "Total Info successfully",
            data: totalInfo
        })

    } catch (error) {
        res.status(200).send({
            success: false,
            message: "Total Info failed",
            error
        })
    }
}


module.exports = { dashboardTotalInfo }