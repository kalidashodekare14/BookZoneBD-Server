const authorCollection = require('../models/authorModel');
const Users = require('../models/userModel');

const authorDataInsert = async (req, res) => {
    try {
        const authorInfo = req.body;
        const id = req.user.id

        const userVerify = await Users.findById(id);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }


        const authorData = await authorCollection.create(authorInfo);
        res.status(200).send({
            success: true,
            message: "Your author data insert successfully",
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Your author data insert failed",
            error: error.message
        })
    }
}

const totalAuthors = async (req, res) => {
    try {
        const { search, page, limit } = req.query;
        const id = req.user.id

        const userVerify = await Users.findById(id);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }


        const total = await authorCollection.countDocuments();
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;


        const authorData = await authorCollection.find({}).skip(skip).limit(limitNum);
        const authorInfo = {
            totalPages: Math.ceil(total / limitNum),
            books: authorData
        }
        res.status(200).send({
            success: true,
            message: "Authors data successfully",
            data: authorInfo
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Authors data failed",
            error: error.message
        })
    }
}
// Add Book Author dropdown api set
const totalAuthorsGet = async (req, res) => {
    try {
        const id = req.user.id
        const userVerify = await Users.findById(id);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const totalAuthor = await authorCollection.find({});
        res.status(200).send({
            success: true,
            message: "Authors data successfully",
            data: totalAuthor
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Authors data failed",
            error: error.message
        })
    }
}

module.exports = { authorDataInsert, totalAuthors, totalAuthorsGet }