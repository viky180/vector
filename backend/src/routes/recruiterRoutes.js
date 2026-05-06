import express from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { trackEvent } from "../services/analyticsService.js";
import {
  addToShortlist,
  getCandidateScorecard,
  getShortlistedCandidates,
  listCandidates,
  updateRecruiterDecision
} from "../services/recruiterService.js";

const router = express.Router();

router.use(authenticate, authorize("recruiter", "admin"));

router.get("/candidates", (req, res) => {
  const skills = req.query.skills ? req.query.skills.split(",").map((item) => item.trim()).filter(Boolean) : [];
  const candidates = listCandidates({ skills, minScore: req.query.minScore || 0 });
  return res.json(candidates);
});

router.get("/candidates/:studentId/scorecard", (req, res) => {
  const scorecard = getCandidateScorecard({ recruiterId: req.user.id, studentId: req.params.studentId });

  if (!scorecard) {
    return res.status(404).json({ message: "Candidate not found" });
  }

  trackEvent({
    type: "scorecard_viewed",
    actorId: req.user.id,
    studentId: Number(req.params.studentId)
  });

  return res.json(scorecard);
});

const createDecisionHandler = (action, eventType) => (req, res) => {
  const decision = updateRecruiterDecision({
    recruiterId: req.user.id,
    studentId: req.params.studentId,
    action,
    note: req.body?.note || ""
  });

  if (!decision) {
    return res.status(404).json({ message: "Candidate not found" });
  }

  if (action === "shortlist") {
    addToShortlist({ recruiterId: req.user.id, studentId: req.params.studentId });
  }

  trackEvent({
    type: eventType,
    actorId: req.user.id,
    studentId: Number(req.params.studentId),
    metadata: { note: decision.note }
  });

  return res.json(decision);
};

router.post("/candidates/:studentId/shortlist", createDecisionHandler("shortlist", "candidate_shortlisted"));
router.post("/candidates/:studentId/reject", createDecisionHandler("reject", "candidate_rejected"));
router.post(
  "/candidates/:studentId/request-interview",
  createDecisionHandler("request_interview", "interview_requested")
);

router.post("/shortlist", (req, res) => {
  const { studentId } = req.body;
  if (!studentId) {
    return res.status(400).json({ message: "studentId is required" });
  }

  const shortlist = addToShortlist({ recruiterId: req.user.id, studentId });
  return res.status(201).json(shortlist);
});

router.get("/shortlist", (req, res) => {
  const shortlists = getShortlistedCandidates(req.user.id);
  return res.json(shortlists);
});

export default router;
