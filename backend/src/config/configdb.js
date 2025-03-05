const mongoose = require('mongoose');

const connectDb = async () => {
   try {
        const connected = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully " + connected.connection.host);
    } catch (error) {
        console.log("Database connection error:", error.message);
    }
}

module.exports = connectDb;
