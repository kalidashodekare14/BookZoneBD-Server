const totalBooks = require("../models/totalBooksModel")

const publicTotalBooks = async (req, res) => {
    try {
        const { search, minPrice, maxPrice, minDiscount, maxDiscount, rating, authors, publishers, page, limit } = req.query;
        const query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }

        if (minPrice && maxPrice) {
            query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) }
        }

        if (minDiscount && maxDiscount) {
            query.discount = { $gte: Number(minDiscount), $lte: Number(maxDiscount) }
        }

        if (rating) {
            query.rating = { $gte: Number(rating) };
        }

        if (authors) {
            query.author = { $in: authors.split(',') };
        }

        if (publishers) {
            query.publisher = { $in: publishers.split(',') };
        }


        const total = await totalBooks.countDocuments(query);
        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 10;
        const skip = (pageNum - 1) * limitNum


        const filteringData = await totalBooks.find({});
        const allBooks = await totalBooks.find(query).skip(skip).limit(limitNum);
        console.log('recent book', allBooks)

        const booksData = {
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limitNum),
            filteringData: filteringData,
            books: allBooks
        }

        res.status(200).send({
            success: true,
            message: "Total Book successfuly",
            data: booksData
        })
    } catch (error) {
        res.status(500).send({
            success: false,
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


const specialDiscountBook = async (req, res) => {
    try {
        const specialDiscountData = await totalBooks.find({ specialDiscount: true });
        res.status(200).send({
            success: true,
            message: "Special discount data successfully",
            data: specialDiscountData
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Special discount data failed",
            error: error.message
        })
    }
}

const trendingBooks = async (req, res) => {
    try {
        const trendingBooks = await totalBooks.find({ orders: { $gt: 20 } }).sort({ orders: -1 });
        res.status(200).send({
            success: true,
            message: "Trending book data successfully",
            data: trendingBooks
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Trending book data failed",
            error: error.message
        })
    }
}



module.exports = { publicTotalBooks, viewDetailsBook, specialDiscountBook, trendingBooks }