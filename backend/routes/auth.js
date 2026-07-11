const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

let users = [];

// Register
router.post("/register", async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({
            fullName,
            username,
            email,
            password: hashedPassword
        });

        res.json({
            success: true,
            message: "User Registered Successfully",
            users
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;