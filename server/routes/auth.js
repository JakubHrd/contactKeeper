// server/routes/auth.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Registrace uživatele
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ name }); // Můžete vrátit jakékoliv informace, které chcete
    } catch (error) {
        res.status(400).json({ message: "Registrace selhala: " + error.message });
    }
});

module.exports = router;
