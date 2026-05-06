import express from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { listUsers, approveTeacher } from "../services/userService.js";
import { listActivity } from "../services/activityService.js";
import { courses, shortlists } from "../data/mockData.js";

const router = express.Router();

router.use(authenticate, authorize("admin"));

router.get("/dashboard", (_req, res) => {
  const users = listUsers();
  const pendingTeachers = users.filter((user) => user.role === "teacher" && !user.approved).length;

  return res.json({
    stats: {
      totalUsers: users.length,
      totalStudents: users.filter((user) => user.role === "student").length,
      totalTeachers: users.filter((user) => user.role === "teacher").length,
      totalRecruiters: users.filter((user) => user.role === "recruiter").length,
      pendingTeachers,
      totalCourses: courses.length,
      totalShortlists: shortlists.length
    },
    recentActivity: listActivity().slice(0, 8)
  });
});

router.get("/users", (req, res) => {
  return res.json(listUsers(req.query.role));
});

router.put("/teachers/:teacherId/approve", (req, res) => {
  const teacher = approveTeacher(req.params.teacherId);
  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }
  return res.json(teacher);
});

router.get("/activity", (_req, res) => {
  return res.json(listActivity());
});

export default router;
