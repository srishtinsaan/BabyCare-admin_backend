import jwt from "jsonwebtoken";

export default function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Token required" });

    try {
        jwt.verify(token, "secret123");
        next();
    } catch {
        res.status(403).json({ msg: "Invalid token" });
    }
}
