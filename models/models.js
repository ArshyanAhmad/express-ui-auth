const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true,
        minlength: [4, 'Username must be at least 4 characters long.'],
        maxlength: [20, 'Username cannot exceed 20 characters.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                return emailRegex.test(value);
            },
            message: 'Please enter a valid email address.',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [6, 'Password must be at least 6 characters long.'],
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm password is required.'],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: 'Passwords do not match.',
        },
    },
});

userSchema.methods = {
    jwtToken() {
        const payload = {
            id: this._id,
            email: this.email
        }

        const SECRET = process.env.SECRET;

        const options = {
            expiresIn: "24h"
        }

        return JWT.sign(payload, SECRET, options)
    }
}


module.exports = mongoose.model('User', userSchema)