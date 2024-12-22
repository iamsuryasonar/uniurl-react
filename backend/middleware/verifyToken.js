const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../constants/token');

const verify = async (req, res, next) => {
    const token = req?.header('Authorization')?.slice(7);
    if (!token) return res.status(401).json({ success: false, message: "Access denied" });

    try {
        const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
       
        req.user = verified;
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ success: false, message: "Token expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token" });
        } else {
            return res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }
}

module.exports.verify = verify