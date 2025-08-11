const orderModel = require('../models/paymentModel');
const Users = require('../models/userModel');

const orderManage = async (req, res) => {
    try {
        const id = req.user.id

        const userVerify = await Users.findById(id);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const orderInfo = await orderModel.find({});
        res.status(200).send({
            success: true,
            message: "Order data successfully",
            data: orderInfo
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Order data failed",
            error: error.message
        })
    }
}

const orderStatus = async (req, res) => {
    try {
        const id = req.params.id
        const { order_status } = req.body;
        const verifyId = req.user.id;

        const userVerify = await Users.findById(verifyId);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const orderInfo = await orderModel.findByIdAndUpdate(
            id,
            { $set: { order_status } },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Order status update successfully",
            data: orderInfo
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Order status update failed",
            error: error.message
        })
    }
}

const orderDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const verifyId = req.user.id;

        const userVerify = await Users.findById(verifyId);
        if (userVerify.role.toLowerCase() !== "admin") {
            res.status(400).send({
                success: false,
                message: "Forbidden access - admin mismatch",
            })
        }

        const orderData = await orderModel.findById(id);
        res.status(200).send({
            success: true,
            message: "Order details data successfully",
            data: orderData
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Order details data failed",
            error: error.message
        })
    }
}

module.exports = { orderManage, orderStatus, orderDetails };