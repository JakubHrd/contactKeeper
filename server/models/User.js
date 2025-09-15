const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Middleware pro hashing hesla před uložením uživatele
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Pokud heslo nebylo změněno, pokračujte

    const salt = await bcrypt.genSalt(10); // Vytvořte salt
    this.password = await bcrypt.hash(this.password, salt); // Hash hesla
    console.log('Hashed Password before saving:', this.password);
    next();
});

module.exports = mongoose.model('User', UserSchema);
