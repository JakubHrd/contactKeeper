const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Získání kontaktů pro daného uživatele
router.get('/:userId', async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.params.userId });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Přidání nového kontaktu
router.post('/', async (req, res) => {
    const { userId, firstName, lastName, photo, contactSource, company, position, email, phone, hobbies, discussionTopics, avoidTopics } = req.body;

    const newContact = new Contact({
        userId,
        firstName,
        lastName,
        photo,
        contactSource,
        company,
        position,
        email,
        phone,
        hobbies,
        discussionTopics,
        avoidTopics
    });

    try {
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
