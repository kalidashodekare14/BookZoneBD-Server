const puppeteer = require('puppeteer');
const paymentModel = require('../models/paymentModel');

const orderReceiptApi = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orderInfo = await paymentModel.findById(orderId);
        const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 30px; }
          h1 { text-align: center; color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          td, th { border: 1px solid #ccc; padding: 10px; }
          .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <h1>Payment Receipt</h1>
        <table>
          <tr><th>Payment ID</th><td>${orderInfo._id}</td></tr>
          <tr><th>Name</th><td>${orderInfo.customar_name}</td></tr>
          <tr><th>Email</th><td>${orderInfo.customar_email}</td></tr>
          <tr><th>Amount</th><td>${orderInfo.amount}</td></tr>
          <tr><th>Method</th><td>${orderInfo.currency}</td></tr>
          <tr><th>Date</th><td>${orderInfo.createdAt}</td></tr>
        </table>
        <div class="footer">Thanks for your payment!</div>
      </body>
    </html>
    `;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffter = await page.pdf({ format: "A4" });
        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=payment_${orderId}.pdf`);
        res.send(pdfBuffter);

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Order Data pdf create failed"
        })
    }

}


module.exports = { orderReceiptApi };