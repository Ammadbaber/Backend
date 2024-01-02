


const mongoose = require("mongoose");

const url = "mongodb+srv://ammadbaber10:Abc12345@cluster0.pwnbwft.mongodb.net/test";
const dbConnection = async () => {
    try {
        await mongoose.connect(url);
        console.log("Database Connected");
    } catch (error) {
        console.log("Failed to connect to the database");
    }
};

module.exports = dbConnection;