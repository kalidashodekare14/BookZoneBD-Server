const totalBooks = require("../models/totalBooksModel")

const publicTotalBooks = async (req, res) => {
    try {
        const allBooks = await totalBooks.find({});
        res.status(200).send({
            success: true,
            message: "Total Book successfuly",
            data: allBooks
        })
    } catch (error) {
        res.status(500).send({
            suceess: false,
            message: "Total book failed",
            error
        })
    }
}

const viewDetailsBook = async (req, res) => {
    try {
        const id = req.params.id
        const viewDetailBook = await totalBooks.findById(id);
        res.status(200).send({
            success: true,
            message: "View Data succesfully",
            data: viewDetailBook
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "View data failed",
            error
        })
    }
}


module.exports = { publicTotalBooks, viewDetailsBook }