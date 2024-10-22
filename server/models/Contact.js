const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String }, // Nebo použijte typ Buffer pro uložení binárních dat
    contactSource: { type: String, required: true },
    company: { type: String },
    position: { type: String },
    email: { type: String },
    phone: { type: String },
    hobbies: { type: String },
    discussionTopics: { type: String },
    avoidTopics: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
