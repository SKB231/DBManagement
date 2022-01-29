const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
        unique: true,
    },
    gender: "string",
    status: "string",
});

let userdb = mongoose.model("userdb", schema);

module.exports = userdb;
