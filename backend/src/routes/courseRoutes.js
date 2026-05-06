import express from "express";
import { getCourseById, listCourses } from "../services/courseService.js";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.json(listCourses());
});

router.get("/:courseId", (req, res) => {
  const course = getCourseById(req.params.courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  return res.json(course);
});

export default router;
