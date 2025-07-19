const User = require('../models/userModel');
const Book = require('../models/totalBooksModel');


const dashboardTotalInfo = async (req, res) => {
    try {
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