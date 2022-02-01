const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        //CONNECTING TO MONGODB
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected: ", connection.connection.host);
    } catch (err) {
        console.log("Error: ", err);
    }

    const profile = require("../model/model").profile;
};

module.exports = connectDB;
