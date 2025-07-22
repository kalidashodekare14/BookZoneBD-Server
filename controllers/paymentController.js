const { default: axios } = require('axios');
const paymentModel = require('../models/paymentModel');
const crypto = require('crypto');

const paymentIntegration = async (req, res) => {
    try {
        const paymentInfo = req.body;
        const tnxId = crypto.randomBytes(8).toString("hex");
        // console.log('check payment data', paymentInfo);

        const addressData = paymentInfo.addressInfo
        const products = paymentInfo.products
        const product_name = products.map(product => product.product_name).join(", ")
        const product_category = products.map(product => product.product_category).join(", ")


        const initateData = {
            store_id: "webwa66d6f4cb94fee",
            store_passwd: "webwa66d6f4cb94fee@ssl",
            total_amount: paymentInfo.amount || 0,
            currency: paymentInfo.currency || "BDT",
            tran_id: tnxId,
            success_url: "http://localhost:5173/success-payment",
            fail_url: "http://localhost:5173/payment-fail",
            cancel_url: "http://localhost:5173/payment-cancel",
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

        console.log('payment response check', response)

        const saveData = {
            tran_id: tnxId,
            customar_name: paymentInfo.customar_name,
            customar_email: paymentInfo.customar_email,
            amount: paymentInfo.amount,
            image: paymentInfo.image,
            currency: paymentInfo.currency,
            addressData,
            products,
            status: "Pending",
        }
        const save = await paymentModel.create(saveData);
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
            message: "Payment failed"
        })
    }
}


module.exports = { paymentIntegration }