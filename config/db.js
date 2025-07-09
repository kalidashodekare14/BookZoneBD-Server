const mongoose = require("mongoose");

const connectDB = async () => {

    if (!process.env.MONGODB_URI) {
        console.log("MongoDB_URI is not set in env");
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected ${conn.connection.host}`)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


module.exports = connectDB
