import jwt from "jsonwebtoken";
import axios from "axios";

export const loginAdmin = (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@babycare.com" && password === "admin123") {
        const token = jwt.sign({ role: "admin" }, "secret123", { expiresIn: "24h" });
        return res.json({ token });
    }

    res.status(401).json({ msg: "Invalid Admin Credentials" });
};

// forward requests to main backend
export const forwardRequest = async (req, res) => {
    try {
        const mainBackendURL = "http://localhost:5000";

        const response = await axios({
            method: req.method,
            url: mainBackendURL + req.originalUrl.replace("/forward", ""),
            data: req.body
        });

        res.json(response.data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
