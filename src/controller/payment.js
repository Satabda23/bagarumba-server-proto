import BodolandUsers from "../model/user.model.js";

// Category pricing
const CATEGORY_PRICES = {
  assam: 200,
  india: 500,
  global: 800,
};

// For prototype: Mock payment simulation
// In production: Integrate with Razorpay
export const initiatePayment = async (req, res) => {
  try {
    const { category } = req.body;
    const userId = req.user._id;

    if (!CATEGORY_PRICES[category]) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const amount = CATEGORY_PRICES[category];

    // For prototype: Generate a mock order ID
    const orderId = `order_${Date.now()}_${userId}`;

    res.json({
      orderId,
      amount,
      currency: "INR",
      category,
      // In production, this would be Razorpay order details
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};

// For prototype: Mock payment verification
// In production: Verify with Razorpay signature
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, category } = req.body;
    const userId = req.user._id;

    if (!CATEGORY_PRICES[category]) {
      return res.status(400).json({ error: "Invalid category" });
    }

    // For prototype: Always succeed
    // In production: Verify Razorpay signature
    const user = await BodolandUsers.findByIdAndUpdate(
      userId,
      {
        category,
        paymentStatus: "completed",
        paymentId: orderId,
        amountPaid: CATEGORY_PRICES[category],
      },
      { new: true }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        category: user.category,
        paymentStatus: user.paymentStatus,
        amountPaid: user.amountPaid,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment verification failed" });
  }
};

export const getCategoryPrices = (req, res) => {
  res.json({ prices: CATEGORY_PRICES });
};
