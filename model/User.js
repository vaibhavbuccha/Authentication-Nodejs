const mongooes = require('mongoose');

const userSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        trim: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        trim: true,
        min: 6,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max:1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongooes.model('User',userSchema);