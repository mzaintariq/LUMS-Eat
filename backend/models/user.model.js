const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: false,
        unique: false
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
   
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;