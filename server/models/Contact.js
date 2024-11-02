const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactSource: { type: String },
    company: { type: String },
    position: { type: String },
    email: { type: String },
    phone: { type: String },
    hobbies: { type: String },
    discussionTopics: { type: String },
    avoidTopics: { type: String },
});

module.exports = mongoose.model('Contact', contactSchema);
