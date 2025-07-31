const authorCollection = require('../models/authorModel');


const authorDataInsert = async (req, res) => {
    try {
        const authorInfo = req.body;
        console.log('checking data', authorInfo)
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


module.exports = { authorDataInsert }