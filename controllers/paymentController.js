const { default: axios } = require('axios');
const orderModel = require('../models/orderModel');
const crypto = require('crypto');

const paymentIntegration = async (req, res) => {
    try {
        const paymentInfo = req.body;
        const tnxId = crypto.randomBytes(8).toString("hex");
        console.log('checking payment Info', paymentInfo);

        const addressData = paymentInfo.addressInfo
        const products = paymentInfo.products
        const product_name = products.map(product => product.product_name).join(", ")
        const product_category = products.map(product => product.product_category).join(", ")


        const initateData = {
            store_id: "progr687f4d7ea536d",
            store_passwd: "progr687f4d7ea536d@ssl",
            total_amount: paymentInfo.amount || 0,
            currency: paymentInfo.currency || "BDT",
            tran_id: tnxId,
            success_url: "https://book-zone-bd-server.vercel.app/api/order/payment_success",
            fail_url: "https://book-zone-bd-server.vercel.app/api/order/payment_fail",
            cancel_url: "https://book-zone-bd-server.vercel.app/order/payment_cancel",
            cus_name: paymentInfo.customar_name || "None",
            cus_email: paymentInfo.customar_email || "None",
            cus_add1: addressData.address || "None",
            cus_add2: "Dhaka",
            cus_city: addressData.address || "None",
            cus_state: "Dhaka",
            cus_postcode: paymentInfo.postal_code || "None",
            cus_country: paymentInfo.country || "None",
            cus_phone: paymentInfo.phone_number || "None",
            cus_fax: "01711111111",
            shipping_method: "NO",
            product_name: product_name || "None",
            product_category: product_category || "None",
            product_profile: "general",
            multi_card_name: "mastercard,visacard,amexcard",
            value_a: "ref001_A&",
            value_b: "ref002_B&",
            value_c: "ref003_C&",
            value_d: "ref004_D",
        };

        const response = await axios({
            method: "POST",
            url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
            data: initateData,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        })


        const saveData = {
            tran_id: tnxId,
            customar_name: paymentInfo.customar_name,
            customar_email: paymentInfo.customar_email,
            amount: paymentInfo.amount,
            image: paymentInfo.image,
            currency: paymentInfo.currency,
            addressData,
            products,
            payment_status: "Pending",
            order_status: "Pending"
        }
        const save = await orderModel.create(saveData);
        if (save) {
            res.status(200).send({
                success: true,
                message: "Payment Url",
                paymentUrl: response.data.GatewayPageURL
            })
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Payment failed",
            error: error.message
        })
    }
}

const paymentSucces = async (req, res) => {
    try {
        console.log('checking success', req.body)
        const successData = req.body;
        if (successData.status !== "VALID") {
            throw new Error("Unauthorized payment, Invalid Payment")
        }
        const findData = await orderModel.updateOne(
            { tran_id: successData?.tran_id },
            {
                $set: {
                    payment_status: "Success"
                }
            }
        )
        console.log('checking pament status', findData)
        res.redirect(`https://bookzonebd.vercel.app/payment_success`)

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Status not update",
            error: error.message
        })
    }
}
const paymentFail = async (req, res) => {
    res.redirect('https://bookzonebd.vercel.app/payment_fail')
}
const paymentCancel = async (req, res) => {
    res.redirect('https://bookzonebd.vercel.app/payment_cancel')
}

const cashOnPayment = async (req, res) => {
    try {
        const paymentInfo = req.body;
        const tnxId = crypto.randomBytes(8).toString("hex");
        const addressData = paymentInfo.addressInfo
        const products = paymentInfo.products

        const saveData = {
            tran_id: tnxId,
            customar_name: paymentInfo.customar_name,
            customar_email: paymentInfo.customar_email,
            amount: paymentInfo.amount,
            image: paymentInfo.image,
            currency: paymentInfo.currency,
            addressData,
            products,
            payment_status: "Pending",
            order_status: "Pending"
        }
        await orderModel.create(saveData);
        res.status(200).send({
            success: true,
            message: "Payment successfully",
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Payment failed",
            error: error.message
        })
    }
}


module.exports = { paymentIntegration, cashOnPayment, paymentSucces, paymentFail, paymentCancel }