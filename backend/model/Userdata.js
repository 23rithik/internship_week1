const mongoose = require('mongoose');

// Define the schema for user signup
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please fill a valid phone number'] // Adjust the regex as per your phone number format
    },
    location: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(value) {
                // Check for uppercase letter, number, and special character
                return /[A-Z]/.test(value) && /\d/.test(value) && /[@$!%*?&#]/.test(value);
            },
            message: 'Password must contain an uppercase letter, a number, and a special character'
        }
    },
    cpassword: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Ensure confirm password matches password
                return value === this.password;
            },
            message: 'Passwords do not match'
        }
    }
}, {
    timestamps: true
});

// Create a model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
