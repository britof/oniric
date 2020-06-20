const mongoose = require('mongoose');

const DreamSchema = new mongoose.Schema({
    dreamer: String,
    title: String,
    content: String,
    private: {
        type: Number,
        default: 0 //0: private; 1: whitelisted; 2: public
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Dream", DreamSchema);