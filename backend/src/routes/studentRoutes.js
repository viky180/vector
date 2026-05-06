import express from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { getStudentDashboard } from "../services/courseService.js";
import { generateResume } from "../utils/resumeGenerator.js";
import { findUserById } from "../services/userService.js";

const router = express.Router();

router.use(authenticate, authorize("student"));

router.get("/dashboard", (req, res) => {
  const dashboard = getStudentDashboard(req.user.id);
  return res.json(dashboard);
});

router.get("/performance", (req, res) => {
  const dashboard = getStudentDashboard(req.user.id);
  return res.json(dashboard.performance);
});

router.get("/live-classes", (req, res) => {
  const dashboard = getStudentDashboard(req.user.id);
  return res.json(dashboard.liveClasses);
});

router.get("/resume", (req, res) => {
  const student = findUserById(req.user.id);
  const dashboard = getStudentDashboard(req.user.id);
  const resume = generateResume({
    student,
    performance: dashboard.performance,
    skills: student.skills
  });
  return res.json(resume);
});

export default router;
