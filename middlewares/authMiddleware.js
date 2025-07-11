var jwt = require('jsonwebtoken');



const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    console.log('checking token', token);

    // if (!token) {

    // }
}



module.exports = authMiddleware