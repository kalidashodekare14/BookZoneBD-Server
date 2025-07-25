var jwt = require('jsonwebtoken');



const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }
    try {
        const docoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = docoded.id;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }


}

module.exports = authMiddleware