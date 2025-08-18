const express = require("express");
const mogoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const dashboardData = require('./routes/dashboardDataRoutes');
const userInfo = require('./routes/userInfoRoutes');
const writerInfo = require('./routes/writerInfoRoutes');
const publicBooks = require('./routes/publicTotalBookRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const usrVerifyRoutes = require('./routes/userVerifyRoutes');
const orderRoutes = require('./routes/orderRoutes');
const passwordReset = require('./routes/passwordResetRoutes');

const app = express();
dotenv.config();


connectDB();
app.use(cors({
    origin: ['http://localhost:5173', 'https://bookzonebd.vercel.app'],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user', userRoutes);
app.use('/api/user_verify', authMiddleware, usrVerifyRoutes)
app.use('/api/userInfo', authMiddleware, userInfo);
app.use('/api/writerInfo', authMiddleware, writerInfo);
app.use('/api/dashboard', authMiddleware, dashboardData);
app.use('/api/public', publicBooks);
app.use('/api/order', orderRoutes);
app.use('/api/password_manage', passwordReset);



app.get('/', async (req, res) => {
    res.send('BookZoneBD server running');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running port ${process.env.PORT}`);
})

