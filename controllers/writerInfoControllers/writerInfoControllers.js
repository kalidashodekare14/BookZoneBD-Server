const userModel = require('../../models/userModel');
const bookModel = require('../../models/totalBooksModel');

const writerInfo = async (req, res) => {
    try {
        const writerFromParams = req.params.email;
        const writerIdFromToken = req.user;

        const writerInfo = await userModel.findById(writerIdFromToken.id).lean();

        if (!writerInfo || writerInfo.email !== writerFromParams) {
            return res.status(403).send({
                success: false,
                message: "Forbidden access - user mismatch"
            })
        }

        const { password, ...writerData } = writerInfo;

        res.status(200).send({
            success: true,
            message: "Writer info data successfully",
            data: writerData
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Writer info data failed",
            error: error.message
        })
    }
}

const writerInfoUpdate = async (req, res) => {
    try {
        const writerInfo = req.body;
        const userEmail = req.params.email;
        const extisEmail = await userModel.findOne({ email: userEmail })

        if (!extisEmail || userEmail === null) {
            res.status(401).send({
                success: false,
                message: "You are unauthorized",
            })
        }

        const updateInformation = await userModel.findOneAndUpdate(
            { email: userEmail },
            { $set: writerInfo },
            { new: true }

        )

        res.status(200).send({
            success: true,
            message: "Writer information update succefully",
            data: updateInformation
        })

    } catch (error) {
        res.staus(500).send({
            success: false,
            message: "Writer information update failed",
            error: error.message
        })
    }
}


const writerBookCreate = async (req, res) => {
    try {
        const { author_id, title, image, category, subCategory, price, discount, publisher, stock, description } = req.body;
        console.log('checking book data', author_id, title, image, category, subCategory, price, discount, publisher, stock, description)

        const checkAuthor = await userModel.findById(author_id)

        const writerBooks = await bookModel.create({
            title,
            author_id,
            author: {
                author_id: checkAuthor._id,
                author_name: checkAuthor.name
            },
            publisher,
            description,
            price,
            stock,
            discount,
            category,
            subCategory,
            image,
            orders: 0,
            rating: 0,
            specialDiscount: discount >= 30 ? true : false
        });

        console.log('checking add book data', writerBooks)

        res.status(200).send({
            success: true,
            message: "Book add successfully",
            data: writerBooks
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Writer book create failed",
            error: error.message
        })
    }
}

const writerTotalBook = async (req, res) => {
    try {
        const id = req.params.id
        console.log('checking writer id', id)
        const totalBooks = await bookModel.find({ author_id: id }).sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            message: "Writer total book successfully",
            data: totalBooks
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Writer total book failed",
            error: error.message
        })
    }
}

module.exports = { writerInfo, writerInfoUpdate, writerBookCreate, writerTotalBook }