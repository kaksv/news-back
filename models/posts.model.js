const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    cover: String,
}, {
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema);