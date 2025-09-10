import express from "express";
import { initiatePaystackPayment, verifyPaystackPayment } from "../controllers/paystackController.js";
import { initiateMpesaPayment } from "../controllers/mpesaController.js";

const router = express.Router();

// Paystack
router.post("/paystack/initiate", initiatePaystackPayment);
router.get("/paystack/verify/:reference", verifyPaystackPayment);

// M-Pesa
router.post("/mpesa/initiate", initiateMpesaPayment);

export default router;
