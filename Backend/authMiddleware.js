const jwt = require("jsonwebtoken");

// Secret key for signing tokens (keep in env variable in production)
const JWT_SECRET = "xyzabc";

function authorizeToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ error: "Unauthorized", message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // attach decoded user info to request
        next(); // proceed to the route handler
    } catch (e) {
        return res.status(403).json({ error: "Forbidden", message: "Invalid or expired token" });
    }
}

module.exports = authorizeToken;
