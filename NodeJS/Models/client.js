const mongoose = require('mongoose');

var Client = mongoose.model('Client', {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    gender: { type: String },
    image: { type: String }
});

module.exports = { Client };
