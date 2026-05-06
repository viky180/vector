import express from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import {
  createAssignment,
  createCourse,
  getTeacherDashboard,
  gradeAssignment,
  scheduleClass,
  updateCourse
} from "../services/courseService.js";

const router = express.Router();

router.use(authenticate, authorize("teacher"));

router.get("/dashboard", (req, res) => {
  const dashboard = getTeacherDashboard(req.user.id);
  return res.json(dashboard);
});

router.post("/courses", (req, res) => {
  const { title, description, level, tags = [] } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  const course = createCourse({
    title,
    description,
    level: level || "Beginner",
    tags,
    teacherId: req.user.id
  });

  return res.status(201).json(course);
});

router.put("/courses/:courseId", (req, res) => {
  const course = updateCourse(req.params.courseId, req.body, req.user.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  return res.json(course);
});

router.post("/classes", (req, res) => {
  const { courseId, title, startTime, meetingLink } = req.body;
  if (!courseId || !title || !startTime) {
    return res.status(400).json({ message: "Course, title, and start time are required" });
  }

  const liveClass = scheduleClass({
    courseId,
    teacherId: req.user.id,
    title,
    startTime,
    meetingLink: meetingLink || "https://meet.example.com/skillbridge-live-placeholder"
  });

  return res.status(201).json(liveClass);
});

router.post("/assignments", (req, res) => {
  const { courseId, title, description, dueDate } = req.body;
  if (!courseId || !title || !dueDate) {
    return res.status(400).json({ message: "Course, title, and due date are required" });
  }

  const assignment = createAssignment({
    courseId,
    teacherId: req.user.id,
    title,
    description: description || "Assignment description",
    dueDate
  });

  return res.status(201).json(assignment);
});

router.post("/assignments/:assignmentId/grade", (req, res) => {
  const { studentId, score, feedback = "" } = req.body;

  if (!studentId || score === undefined) {
    return res.status(400).json({ message: "studentId and score are required" });
  }

  const assignment = gradeAssignment({
    assignmentId: req.params.assignmentId,
    studentId,
    score,
    feedback
  });

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  return res.json(assignment);
});

export default router;
