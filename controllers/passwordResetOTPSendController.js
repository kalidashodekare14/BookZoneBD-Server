const otpModel = require('../models/otpModel');
const nodemailer = require("nodemailer");
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const passwordResetSentMail = async (req, res) => {
    try {
        const emailInfo = req.body;
        console.log('checking email', emailInfo.email);

        const userVerify = await userModel.findOne({ email: emailInfo.email });

        if (!userVerify) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }

        const token = jwt.sign({ id: userVerify._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        const updateUser = await userModel.findByIdAndUpdate(
            userVerify._id,
            { $set: { resetToken: token } },
            { new: true }
        )

        console.log('checking update user', updateUser);

        const resetLink = `${process.env.FRONTEND_URL}/reset_password?token=${token}`

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
            to: emailInfo.email,
            subject: "Password Reset",
            html: `<div style="font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; max-width: 500px; margin: auto; padding: 20px;">
               <h2 style="color: #307bc4; text-align: center; ">Forget Password</h2>
               <p>Hi!</p>
               <p style="color: black;">We received a request to reset your password. Click the button below to proceed.</p>
               <div style="text-align: center;">
               <a style="background-color: #307bc4; color: white; padding: 12px 20px; text-decoration: none;" href="${resetLink}">
                  Reset Password
               </a>
               </div>
               <p style="color: black;">If you didn't request this, you can safely ignore this email.</p>
               <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 13px; text-align: center; color: #666;">If you have any issues, contact our BookZoneBD support team.</p>
           </div>`
        })

        res.status(200).send({
            success: true,
            message: "Reset link send your email"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Reset mail sending failed",
            error: error.message
        })
    }
}

const passwordReset = async (req, res) => {
    try {
        const { token, password } = req.body;
        const decoded_id = jwt.verify(token, process.env.JWT_SECRET);
        const userFind = await userModel.findById(decoded_id.id);
        if (!userFind) {
            return res.status(400).send({
                success: false,
                message: "Invalid token"
            })
        }
        const hashPassword = await bcrypt.hash(password, 14);
        await userModel.findByIdAndUpdate(
            userFind._id,
            { $set: { password: hashPassword, resetToken: null } }
        )

        res.status(200).send({
            success: true,
            message: "Password reset successfully",
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Password reset failed",
            error: error.message
        })
    }
}


module.exports = { passwordResetSentMail, passwordReset }