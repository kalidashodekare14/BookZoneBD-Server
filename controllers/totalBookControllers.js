const totalBooks = require('../models/totalBooksModel');


const bookAddApi = async (req, res) => {
    try {
        const { book_title, author, publisher, description, price, discount, stock, book_image } = req.body;

        const newbooks = await totalBooks.create({
            book_title,
            author,
            publisher,
            description,
            price,
            discount,
            stock,
            book_image
        })

        res.status(200).send({
            success: true,
            message: "Book add successfully",
            data: {
                book_title: newbooks.book_title,
                author: newbooks.author,
                publisher: newbooks.publisher,
                description: newbooks.description,
                price: newbooks.price,
                discount: newbooks.discount,
                stock: newbooks.stock,
                book_image: newbooks.book_image
            }
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to add book"
        })
    }
}

const totalBookapi = async (req, res) => {
    try {
        const totalBook = await totalBooks.find({});
        console.log('check total book', totalBook)
        res.status(200).send({
            success: true,
            message: "All the books were successfully",
            data: totalBook
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to show all the books."
        })
    }

}


module.exports = { bookAddApi, totalBookapi }