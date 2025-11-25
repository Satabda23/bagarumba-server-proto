import { generateToken } from "../middleware/auth.js";
import BodolandUsers from "../model/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await BodolandUsers.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await BodolandUsers.create({ name, email, password, phone });
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        category: user.category,
        paymentStatus: user.paymentStatus,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await BodolandUsers.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        category: user.category,
        paymentStatus: user.paymentStatus,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

export const getProfile = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      category: req.user.category,
      paymentStatus: req.user.paymentStatus,
      amountPaid: req.user.amountPaid,
    },
  });
};
