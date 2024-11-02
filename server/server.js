require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Contact = require('./models/Contact');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const app = express();

// Připoj CORS middleware
app.use(cors());
app.use(express.json());

// Připojení k MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Inicializace GridFSStorage
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'uploads', // Název kolekce pro GridFS
        };
    },
});

// Inicializace multer
const upload = multer({ storage });

// Registrace uživatele
app.post('/api/auth/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Zkontrolujte, zda uživatel už neexistuje
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Vytvořte nového uživatele
        user = new User({ email, password, name });
        await user.save();
        console.log('User registered successfully:', user);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Přihlašování uživatele
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Bad password' });
        }

        res.json({ user, name: user.name, userId: user._id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Post route to create a new contact
app.post('/api/newContact', async (req, res) => {
    console.log('Body data:', req.body);

    const userId = req.body.userId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const contactSource = req.body.contactSource;
    const company = req.body.company;
    const position = req.body.position;
    const email = req.body.email;
    const phone = req.body.phone;
    const hobbies = req.body.hobbies;
    const discussionTopics = req.body.discussionTopics;
    const avoidTopics = req.body.avoidTopics;

    try {
        const newContact = {
            userId,
            firstName,
            lastName,
            contactSource,
            company,
            position,
            email,
            phone,
            hobbies,
            discussionTopics,
            avoidTopics,
        };

        await Contact.create(newContact);
        res.status(200).json({ message: 'Kontakt přidán', contact: newContact });
    } catch (error) {
        console.error('Chyba při přidávání kontaktu:', error);
        res.status(500).json({ message: 'Chyba při přidávání kontaktu' });
    }
});


// Endpoint pro získání kontaktů podle uživatelského ID
app.get('/api/contacts', async (req, res) => {
    const userId = req.query.userId; // Získání userId z parametrů dotazu

    try {
        const contacts = await Contact.find({ userId });
        res.status(200).json(contacts); // Odeslat kontakty jako odpověď
    } catch (error) {
        console.error('Chyba při získávání kontaktů:', error);
        res.status(500).json({ message: 'Chyba při získávání kontaktů' });
    }
});

// Endpoint pro získání detailů kontaktu podle jeho ID
app.get('/api/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params; // Získání contactId z parametrů URL

    try {
        // Najdeme kontakt podle jeho ID
        const contact = await Contact.findById(contactId);

        if (!contact) {
            return res.status(404).json({ message: 'Kontakt nenalezen' });
        }

        // Vrátíme nalezený kontakt
        res.status(200).json(contact);
    } catch (error) {
        console.error('Chyba při získávání detailů kontaktu:', error);
        res.status(500).json({ message: 'Chyba při získávání detailů kontaktu' });
    }
});

// Endpoint pro úpravu kontaktu podle jeho ID
app.put('/api/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params; // Získání contactId z parametrů URL
    console.log('data body' , {'body' : req.body});
    const {
        firstName,
        lastName,
        contactSource,
        company,
        position,
        email,
        phone,
        hobbies,
        discussionTopics,
        avoidTopics,
    } = req.body; // Data pro aktualizaci

    try {
        // Najdeme kontakt podle jeho ID a aktualizujeme jeho údaje
        const updatedContact = await Contact.findByIdAndUpdate(
            contactId,
            {
                firstName,
                lastName,
                contactSource,
                company,
                position,
                email,
                phone,
                hobbies,
                discussionTopics,
                avoidTopics,
            },
            { new: true } // Vrátí aktualizovaný dokument
        );

        if (!updatedContact) {
            return res.status(404).json({ message: 'Kontakt nenalezen' });
        }

        // Vrátíme aktualizovaný kontakt
        res.status(200).json({ message: 'Kontakt aktualizován', contact: updatedContact });
    } catch (error) {
        console.error('Chyba při úpravě kontaktu:', error);
        res.status(500).json({ message: 'Chyba při úpravě kontaktu' });
    }
});


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Contact = require('./models/Contact');
const contactsRouter = require('./routes/contacts');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const app = express();

// Připoj CORS middleware
app.use(cors());
app.use(express.json());
// Připojení k MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'uploads', // Název kolekce pro GridFS
        };
    },
});

// Inicializace multer
const upload = multer({ storage});


// Registrace uživatele
app.post('/api/auth/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Zkontrolujte, zda uživatel už neexistuje
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Vytvořte nového uživatele
        user = new User({ email, password, name });
        await user.save();
        console.log('user', { message: 'User registered successfully', user: user, name: name, userId: user._id });
        res.status(201).json({ message: 'User registered successfully', user: user, name: name, userId: user._id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Přihlašování uživatele
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log('data', {'password1': user.password,password})
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Bad password' });
        }

        res.json({ user: user, name: user.name, userId: user._id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Post route to upload a file and create a new contact
app.post('/api/newContact', (req, res) => {
    upload.single('photo')(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ message: 'Chyba při nahrávání souboru' });
        }

        console.log('Multer middleware executed');
        console.log('File data:', req.file);
        console.log('Body data:', req.body);

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const userId = req.body.userId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const contactSource = req.body.contactSource;
        const company = req.body.company;
        const position = req.body.position;
        const email = req.body.email;
        const phone = req.body.phone;
        const hobbies = req.body.hobbies;
        const discussionTopics = req.body.discussionTopics;
        const avoidTopics = req.body.avoidTopics;

        try {
            const newContact = {
                userId,
                firstName,
                lastName,
                photo: req.file._id, // Uložení ID obrázku
                contactSource,
                company,
                position,
                email,
                phone,
                hobbies,
                discussionTopics,
                avoidTopics,
            };

            await Contact.create(newContact);
            res.status(200).json({ message: 'Kontakt přidán', contact: newContact });
        } catch (error) {
            console.error('Chyba při přidávání kontaktu:', error);
            res.status(500).json({ message: 'Chyba při přidávání kontaktu' });
        }
    });
});


// Endpoint pro získání kontaktů podle uživatelského ID
app.get('/api/contacts', async (req, res) => {
    const userId = req.query.userId; // Získání userId z parametrů dotazu

    try {
        const contacts = await Contact.find({ userId });
        res.status(200).json(contacts); // Odeslat kontakty jako odpověď
    } catch (error) {
        console.error('Chyba při získávání kontaktů:', error);
        res.status(500).json({ message: 'Chyba při získávání kontaktů' });
    }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/
