const express = require("express");
const mogoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes')

const app = express();
dotenv.config();


connectDB();
app.use(cors());
app.use(express.json());



app.use('/api/user', userRoutes)





app.get('/', async (req, res) => {
    res.send('EcoForce server running');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running port ${process.env.PORT}`);
})

