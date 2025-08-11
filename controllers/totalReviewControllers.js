const reviewModel = require('../models/reviewModel');
const Users = require('../models/userModel');

const totalReviews = async (req, res) => {
    try {
        const id = req.user.id
        const userVerify = await Users.findById(id);
        
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const totalReviewData = await reviewModel.find({});
        res.status(200).send({
            success: true,
            message: "Total review data successfully",
            data: totalReviewData
        })
    } catch (error) {
        res.status(500).send({
            success: true,
            message: "Total review data failed",
            error: error.message
        })
    }
}

module.exports = { totalReviews };