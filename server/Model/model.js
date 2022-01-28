const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: String,
    status: String,
});

let userdb = mongoose.model("userdb", schema);

module.exports = userdb;
