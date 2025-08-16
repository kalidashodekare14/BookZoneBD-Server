const User = require('../models/userModel');
const Book = require('../models/totalBooksModel');
// const OrderModel = require('../models/')

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


        const totalInfo = {
            totalUsers: {
                value: totalUser
            },
            totalBooks: {
                value: totalBook
            },
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