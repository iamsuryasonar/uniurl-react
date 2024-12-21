const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../constants/token');

const verify = async (req, res, next) => {
    const token = req?.header('Authorization')?.slice(7);
    const refreshToken = req.cookies['refreshToken'];
    if (!token && !refreshToken) return res.status(401).json({ success: false, message: "Access denied" });

    try {
        const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
        let verifiedRefreshToken;

        try {
            verifiedRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Access denied" });
        }

        if (verified._id !== verifiedRefreshToken._id) return res.status(400).json({ success: false, message: "Token mismatch" });

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