const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {

    if (isConnected) {
        return
    }

    if (!process.env.MONGODB_URI) {
        console.log("MongoDB_URI is not set in env");
        return
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10
        });
        isConnected = conn.connection.readyState === 1;
        console.log(`MongoDB Connected ${conn.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection error", error.message);
        throw error;
    }
}


module.exports = connectDB
