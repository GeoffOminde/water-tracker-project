import axios from "axios";
import dotenv from "dotenv";
import { generateMpesaToken } from "../utils/mpesa.js";

dotenv.config();

const shortcode = process.env.MPESA_SHORTCODE;
const passkey = process.env.MPESA_PASSKEY;
const callbackUrl = "https://yourdomain.com/api/pay/mpesa/callback"; // change to your URL

export const initiateMpesaPayment = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    // 1. Generate token
    const token = await generateMpesaToken();

    // 2. Build password
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);
    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

    // 3. Send STK Push request
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: callbackUrl,
        AccountReference: "WaterTracker",
        TransactionDesc: "Water Tracker Subscription",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
