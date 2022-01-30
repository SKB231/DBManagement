const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
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
    status: "string"
});

let profileSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        required: true,
    }
});

let userdb = mongoose.model("userdb", UserSchema);
let profiledb = mongoose.model("profiledb", profileSchema);

module.exports.user = userdb;
module.exports.profile = profiledb;
