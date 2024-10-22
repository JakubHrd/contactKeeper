const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
const contactsRouter = require('./routes/contacts');



require('dotenv').config(); // Načti proměnné prostředí

const app = express();

// Připoj CORS middleware
app.use(cors());
app.use('/api/contacts', contactsRouter);
app.use(express.json());

// Připojení k MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

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

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Najdi uživatele podle emailu
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Zkontroluj heslo (můžeš použít bcrypt pro porovnání)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Odeslat odpověď s uživatelským jménem
        res.json({ name: user.name });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get('/api/contacts', async (req, res) => {
    const { user } = req.query; // Get the user from the query params
    try {
        const contacts = await Contact.find({ user }); // Assuming you have a user field in your Contact model
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contacts" });
    }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
