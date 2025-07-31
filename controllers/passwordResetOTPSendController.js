const otpModel = require('../models/otpModel');
const nodemailer = require("nodemailer");
const userModel = require('../models/userModel');



const otpSendSytem = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('email chcking', email)
        const userCollection = await userModel.findOne({ email });
        if (!userCollection) {
            return res.status(404).send({
                success: false,
                message: "Could not find user",
            })
        }
        const generateOTP = () => {
            return Math.floor(1000 + Math.random() * 900).toString();
        }

        const otp = generateOTP();
        const expireAt = new Date(Date.now() + 5 * 60000);
        await otpModel.findOneAndDelete({ email });

        await otpModel.create({ email, otp, expireAt });

        const transporter = nodemailer.createTransport({
            // host: process.env.NEXT_EMAIL, 
            service: "gmail",
            auth: {
                user: process.env.NEXT_EMAIL,
                pass: process.env.NEXT_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.NEXT_EMAIL,
            to: email,
            subject: "Password Reset",
            text: `Your OTP is ${otp}. It will expire in 5  minites`
        })

        res.status(200).send({
            success: true,
            message: "Otp send successfully",
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Otp send failed"
        })
    }

}

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const record = await otpModel.findOne({ email });
    if (!record) {
        return res.status(400).send({
            success: false,
            message: "No TOP found"
        })
    }
    if (record.otp !== otp) {
        return res.status(400).send({
            success: false,
            message: "Invalid Otp"
        })
    }
    if (record.expireAt < new Date()) {
        return res.status(400).send({
            success: false,
            message: "OTP expired"
        })
    }
    // await otpModel.deleteOne({ email });

    res.status(200).send({
        success: true,
        message: "OTP Verifyed successfully"
    })

}

module.exports = { otpSendSytem, verifyOtp }