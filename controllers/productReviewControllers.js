const productReview = require('../models/reviewModel');
const booksModel = require('../models/totalBooksModel');

const prodcutReview = async (req, res) => {
    try {
        const { user_name, user_image, product_id, rating, comment } = req.body;
        const reviewInfo = await productReview.create({
            user_name: user_name,
            user_image: user_image,
            product_id: product_id,
            rating: Number(rating),
            comment: comment
        })

        const book = await booksModel.findById(product_id);
        if (!book) {
            return res.status(404).send({
                success: false,
                message: "Book not found"
            })
        }
        const newTotal = (book.totalReviews || 0) + 1
        const newAvg = ((book.averageRating || 0) * (book.totalReviews || 0) + Number(rating)) / newTotal;

        await booksModel.findByIdAndUpdate(
            product_id,
            {
                $set: {
                    averageRating: newAvg,
                    totalReviews: newTotal
                },
            }
        )


        res.status(200).send({
            success: true,
            message: "Review create successfully",
            data: reviewInfo
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Review create failed",
            error: error.message
        })
    }
}

const productTotalReview = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('checking id', id)
        const totalReviews = await productReview.find({ product_id: id }).sort({ createdAt: -1 });
        console.log('checking review', totalReviews)
        res.status(200).send({
            success: true,
            message: "Product total review failed",
            data: totalReviews
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Product total review failed",
            error: error.message
        })
    }
}

module.exports = { prodcutReview, productTotalReview }