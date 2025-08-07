const orderModel = require('../models/paymentModel');


const orderManage = async (req, res) => {
    try {
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
        const id = req.params.id
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