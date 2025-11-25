import express from "express";
import {
  getCategoryPrices,
  initiatePayment,
  verifyPayment,
} from "../controller/payment.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/prices", getCategoryPrices);
router.post("/initiate", authMiddleware, initiatePayment);
router.post("/verify", authMiddleware, verifyPayment);

export default router;
