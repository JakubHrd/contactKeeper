// server/routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Přidej import databáze

// Registration route
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ id: this.lastID, username });
    });
});

module.exports = router;
