import {
  candidateScorecards,
  performance,
  recruiterDecisions,
  shortlists,
  users,
  nextId
} from "../data/mockData.js";

const decisionStatusByAction = {
  shortlist: "shortlisted",
  reject: "rejected",
  request_interview: "interview_requested"
};

const defaultDecision = {
  status: "not_reviewed",
  note: ""
};

const normalizeStudentId = (studentId) => Number(studentId);

const findStudent = (studentId) => users.find((user) => user.id === normalizeStudentId(studentId) && user.role === "student");

const findDecision = ({ recruiterId, studentId }) =>
  recruiterDecisions.find(
    (item) => item.recruiterId === Number(recruiterId) && item.studentId === normalizeStudentId(studentId)
  );

export const listCandidates = ({ skills, minScore = 0 }) => {
  const students = users.filter((user) => user.role === "student");

  return students
    .map((student) => {
      const scores = performance.filter((item) => item.studentId === student.id);
      const scorecard = candidateScorecards.find((item) => item.studentId === student.id);
      const avgScore = scores.length
        ? Math.round(scores.reduce((sum, item) => sum + item.score, 0) / scores.length)
        : 0;
      const avgAttendance = scores.length
        ? Math.round(scores.reduce((sum, item) => sum + item.attendance, 0) / scores.length)
        : 0;

      return {
        id: student.id,
        name: student.name,
        email: student.email,
        skills: student.skills,
        targetRole: scorecard?.student?.targetRole || "Not specified",
        location: scorecard?.student?.location || "Not specified",
        verified: Boolean(scorecard?.verification?.isVerified),
        avgScore,
        avgAttendance
      };
    })
    .filter((candidate) => {
      const skillMatch = skills.length
        ? skills.every((skill) => candidate.skills.map((item) => item.toLowerCase()).includes(skill.toLowerCase()))
        : true;

      return skillMatch && candidate.avgScore >= Number(minScore || 0);
    });
};

export const getCandidateScorecard = ({ recruiterId, studentId }) => {
  const student = findStudent(studentId);
  if (!student) return null;

  const scorecard = candidateScorecards.find((item) => item.studentId === student.id);
  const decision = findDecision({ recruiterId, studentId: student.id }) || defaultDecision;

  if (!scorecard) {
    return {
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        location: "Not specified",
        targetRole: "Not specified",
        openToWork: false,
        profileCompleteness: 0,
        resumeUrl: ""
      },
      verification: {
        isVerified: false,
        source: "insufficient_activity",
        lastUpdated: null
      },
      skills: [],
      learningMetrics: {
        courseCompletionPercent: null,
        attendancePercent: null,
        averageAssignmentScore: null,
        assessmentScore: null
      },
      project: null,
      teacherRecommendation: {
        status: "insufficient_data",
        rating: null,
        note: "No verified learning activity is available yet.",
        recommendedBy: ""
      },
      recruiterDecision: decision
    };
  }

  return {
    student: {
      id: student.id,
      name: student.name,
      email: student.email,
      ...scorecard.student
    },
    verification: scorecard.verification,
    skills: scorecard.skills,
    learningMetrics: scorecard.learningMetrics,
    project: scorecard.project,
    teacherRecommendation: scorecard.teacherRecommendation,
    recruiterDecision: {
      status: decision.status,
      note: decision.note || "",
      updatedAt: decision.updatedAt
    }
  };
};

export const updateRecruiterDecision = ({ recruiterId, studentId, action, note = "" }) => {
  const student = findStudent(studentId);
  if (!student) return null;

  const status = decisionStatusByAction[action];
  if (!status) {
    throw new Error(`Unsupported recruiter decision action: ${action}`);
  }

  const existing = findDecision({ recruiterId, studentId: student.id });
  const updatedAt = new Date().toISOString();

  if (existing) {
    existing.status = status;
    existing.note = note;
    existing.updatedAt = updatedAt;
    return existing;
  }

  const decision = {
    id: nextId(recruiterDecisions),
    recruiterId: Number(recruiterId),
    studentId: student.id,
    status,
    note,
    updatedAt
  };
  recruiterDecisions.push(decision);
  return decision;
};

export const addToShortlist = ({ recruiterId, studentId }) => {
  const existing = shortlists.find(
    (item) => item.recruiterId === Number(recruiterId) && item.studentId === Number(studentId)
  );
  if (existing) return existing;

  const shortlist = { id: nextId(shortlists), recruiterId: Number(recruiterId), studentId: Number(studentId) };
  shortlists.push(shortlist);
  return shortlist;
};

export const getShortlistedCandidates = (recruiterId) => {
  const entries = shortlists.filter((item) => item.recruiterId === Number(recruiterId));
  return entries.map((entry) => users.find((user) => user.id === entry.studentId)).filter(Boolean);
};
