import express from "express";
import {
  createUser,
  findUserByEmail,
  validatePassword
} from "../services/userService.js";
import { signToken } from "../utils/jwt.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, role = "student" } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  if (!["student", "teacher", "recruiter", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const user = await createUser({ name, email, password, role });
  const token = signToken({ id: user.id, role: user.role, name: user.name });

  return res.status(201).json({
    message: role === "teacher" ? "Signup successful. Awaiting admin approval." : "Signup successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      approved: user.approved
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const validPassword = await validatePassword(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.role === "teacher" && !user.approved) {
    return res.status(403).json({ message: "Teacher account awaiting admin approval" });
  }

  const token = signToken({ id: user.id, role: user.role, name: user.name });

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      approved: user.approved
    }
  });
});

router.get("/me", authenticate, (req, res) => {
  const { id, name, email, role, approved, skills } = req.user;
  return res.json({ id, name, email, role, approved, skills });
});

export default router;
