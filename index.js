const express = require("express");
const mogoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const dashboardData = require('./routes/dashboardDataRoutes');
const userInfo = require('./routes/userInfoRoutes');
const publicBooks = require('./routes/publicTotalBookRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const usrVerifyRoutes = require('./routes/userVerifyRoutes');
const paymentIntegration = require('./routes/usePaymentRoutes');
const passwordReset = require('./routes/passwordResetRoutes');

const app = express();
dotenv.config();


connectDB();
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use('/api/user', userRoutes);
app.use('/api/user_verify', authMiddleware, usrVerifyRoutes)
app.use('/api/userInfo', authMiddleware, userInfo);
app.use('/api/dashboard', dashboardData);
app.use('/api/public', publicBooks);
app.use('/api/payment', paymentIntegration);
app.use('/api/password_reset', passwordReset)



app.get('/', async (req, res) => {
    res.send('EcoForce server running');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running port ${process.env.PORT}`);
})

