import jwt from "jsonwebtoken";
import BodolandUsers from "../model/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "bagurumba-secret-key";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await BodolandUsers.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};
