const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    whitelist: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model("Profile", ProfileSchema);