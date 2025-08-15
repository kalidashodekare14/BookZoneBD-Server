const totalBooks = require('../models/totalBooksModel');
const publisherModel = require('../models/publisherModel');
const Users = require('../models/userModel');

const bookAddApi = async (req, res) => {
    try {
        const { title, author_id, publisher, description, price, stock, discount, category, subCategory, image } = req.body;
        const id = req.user.id

        const userVerify = await Users.findById(id);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const checkAuthor = await publisherModel.findById(author_id)

        const newbooks = await totalBooks.create({
            title,
            author_id,
            author: {
                author_id: checkAuthor._id,
                author_name: checkAuthor.author_name
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

        console.log('create a new book', newbooks)

        res.status(200).send({
            success: true,
            message: "Book add successfully",
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to add book",
            error: error.message
        })
    }
}

const totalBookapi = async (req, res) => {
    try {
        const { search, page, limit } = req.query;

        const id = req.user.id
        const userVerify = await Users.findById(id);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin  mismatch",
            })
        }


        const total = await totalBooks.countDocuments();
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;


        const totalBook = await totalBooks.find({}).skip(skip).limit(limitNum);
        const booksData = {
            totalPages: Math.ceil(total / limitNum),
            books: totalBook
        }
        res.status(200).send({
            success: true,
            message: "All the books were successfully",
            data: booksData
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to show all the books.",
            error: error.message
        })
    }

}


module.exports = { bookAddApi, totalBookapi }