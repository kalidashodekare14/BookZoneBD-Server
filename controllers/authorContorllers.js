const publisherCollection = require('../models/publisherModel');
const Users = require('../models/userModel');

const publisherDataInsert = async (req, res) => {
    try {
        const publisherInfo = req.body;
        const id = req.user.id

        const userVerify = await Users.findById(id);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }


        const publisherData = await publisherCollection.create(publisherInfo);
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

const totalPublishers = async (req, res) => {
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


        const total = await publisherCollection.countDocuments();
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;


        const publisherData = await publisherCollection.find({}).sort({ createdAt: -1 }).skip(skip).limit(limitNum);
        const publisherInfo = {
            totalPages: Math.ceil(total / limitNum),
            books: publisherData
        }
        res.status(200).send({
            success: true,
            message: "Authors data successfully",
            data: publisherInfo
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Authors data failed",
            error: error.message
        })
    }
}

const publisherUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const publisherData = req.body
        const userId = req.user.id

        const userVerify = await Users.findById(userId);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const updateData = await publisherCollection.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...publisherData
                }
            },
            { new: true }
        )
        res.status(200).send({
            success: true,
            message: "Publisher info update successfully",
            data: updateData
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Publisher info update failed",
            error: error.message
        })
    }
}

const publisherDelete = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.id

        const userVerify = await Users.findById(userId);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const deleteData = await publisherCollection.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Publisher data delete successfully",
            data: { _id: deleteData._id }
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Publisher data delete failed",
            error: error.message
        })
    }
}

// Add Book Author dropdown api set
const totalAuthorsPublishersGet = async (req, res) => {
    try {
        const id = req.user.id
        const userVerify = await Users.findById(id);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }


        const totalPublisher = await publisherCollection.find({});
        const totalAuthor = await Users.find({ role: "Writer" });
        const dropdownInfo = {
            totalPublisher: totalPublisher,
            totalAuthor: totalAuthor
        }
        res.status(200).send({
            success: true,
            message: "Authors data successfully",
            data: dropdownInfo
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Authors data failed",
            error: error.message
        })
    }
}

module.exports = { publisherDataInsert, totalPublishers, publisherUpdate, publisherDelete, totalAuthorsPublishersGet }