const reviewModel = require('../models/reviewModel');

const totalReviews = async (req, res) => {
    try {
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