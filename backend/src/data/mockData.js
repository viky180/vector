import bcrypt from "bcryptjs";

const hash = (value) => bcrypt.hashSync(value, 10);

export const users = [
  {
    id: 1,
    name: "Riya Sharma",
    email: "student@skillbridge.com",
    password: hash("password123"),
    role: "student",
    approved: true,
    skills: ["React", "JavaScript", "Tailwind CSS", "Communication"]
  },
  {
    id: 6,
    name: "Arjun Mehta",
    email: "arjun.student@skillbridge.com",
    password: hash("password123"),
    role: "student",
    approved: true,
    skills: ["JavaScript", "React", "HTML", "CSS"]
  },
  {
    id: 7,
    name: "Sneha Iyer",
    email: "sneha.student@skillbridge.com",
    password: hash("password123"),
    role: "student",
    approved: true,
    skills: ["Node.js", "Express", "MongoDB", "APIs"]
  },
  {
    id: 8,
    name: "Kabir Khan",
    email: "kabir.student@skillbridge.com",
    password: hash("password123"),
    role: "student",
    approved: true,
    skills: ["React", "TypeScript", "Testing", "Git"]
  },
  {
    id: 9,
    name: "Nisha Verma",
    email: "nisha.student@skillbridge.com",
    password: hash("password123"),
    role: "student",
    approved: true,
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 2,
    name: "Meera Teacher",
    email: "teacher@skillbridge.com",
    password: hash("password123"),
    role: "teacher",
    approved: true,
    skills: ["System Design", "JavaScript", "Mentoring"]
  },
  {
    id: 3,
    name: "Rohan Recruiter",
    email: "recruiter@skillbridge.com",
    password: hash("password123"),
    role: "recruiter",
    approved: true,
    skills: ["Hiring", "Talent Sourcing"]
  },
  {
    id: 4,
    name: "Priya Admin",
    email: "admin@skillbridge.com",
    password: hash("password123"),
    role: "admin",
    approved: true,
    skills: ["Operations", "Analytics"]
  },
  {
    id: 5,
    name: "Karan Pending Teacher",
    email: "pending.teacher@skillbridge.com",
    password: hash("password123"),
    role: "teacher",
    approved: false,
    skills: ["Python", "Data Structures"]
  }
];

export const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Build production-ready full stack apps with React and Node.",
    teacherId: 2,
    level: "Intermediate",
    tags: ["React", "Node.js", "API", "Database"]
  },
  {
    id: 2,
    title: "DSA for Interviews",
    description: "Master problem solving for coding interviews.",
    teacherId: 2,
    level: "Beginner",
    tags: ["DSA", "Algorithms", "Interviews"]
  }
];

export const enrollments = [
  { id: 1, studentId: 1, courseId: 1 },
  { id: 2, studentId: 1, courseId: 2 }
];

export const liveClasses = [
  {
    id: 1,
    courseId: 1,
    teacherId: 2,
    title: "React State Management Live Session",
    startTime: "2026-04-14T14:00:00.000Z",
    meetingLink: "https://meet.example.com/skillbridge-react-live"
  },
  {
    id: 2,
    courseId: 2,
    teacherId: 2,
    title: "Graphs and BFS Deep Dive",
    startTime: "2026-04-15T10:00:00.000Z",
    meetingLink: "https://meet.example.com/skillbridge-dsa-live"
  }
];

export const assignments = [
  {
    id: 1,
    courseId: 1,
    teacherId: 2,
    title: "Build JWT Auth Module",
    description: "Create backend auth endpoints with role-based access.",
    dueDate: "2026-04-18",
    submissions: [
      { studentId: 1, score: 88, feedback: "Good work. Add refresh token support next." }
    ]
  }
];

export const performance = [
  {
    id: 1,
    studentId: 1,
    courseId: 1,
    courseTitle: "Full Stack Web Development",
    score: 87,
    attendance: 92,
    assignmentsCompleted: 6
  },
  {
    id: 2,
    studentId: 1,
    courseId: 2,
    courseTitle: "DSA for Interviews",
    score: 81,
    attendance: 89,
    assignmentsCompleted: 4
  },
  {
    id: 3,
    studentId: 6,
    courseId: 1,
    courseTitle: "Full Stack Web Development",
    score: 74,
    attendance: 84,
    assignmentsCompleted: 5
  },
  {
    id: 4,
    studentId: 7,
    courseId: 1,
    courseTitle: "Full Stack Web Development",
    score: 78,
    attendance: 87,
    assignmentsCompleted: 5
  },
  {
    id: 5,
    studentId: 8,
    courseId: 1,
    courseTitle: "Full Stack Web Development",
    score: 58,
    attendance: 76,
    assignmentsCompleted: 4
  }
];

export const candidateScorecards = [
  {
    studentId: 1,
    student: {
      location: "Bangalore",
      targetRole: "Frontend Intern",
      openToWork: true,
      profileCompleteness: 86,
      resumeUrl: "/resumes/riya-sharma.pdf"
    },
    verification: {
      isVerified: true,
      source: "platform_activity",
      lastUpdated: "2026-05-06"
    },
    skills: [
      { name: "React", level: "Intermediate", score: 78 },
      { name: "JavaScript", level: "Intermediate", score: 82 },
      { name: "Tailwind CSS", level: "Intermediate", score: 80 },
      { name: "Git", level: "Beginner", score: 70 }
    ],
    learningMetrics: {
      courseCompletionPercent: 82,
      attendancePercent: 91,
      averageAssignmentScore: 76,
      assessmentScore: 79
    },
    project: {
      title: "Job Portal Frontend",
      description: "Built a responsive job portal using React and Tailwind.",
      url: "https://github.com/example/job-portal"
    },
    teacherRecommendation: {
      status: "job_ready",
      rating: 4.3,
      note: "Consistent learner with strong React fundamentals.",
      recommendedBy: "Anita Mehra"
    }
  },
  {
    studentId: 6,
    student: {
      location: "Pune",
      targetRole: "Web Developer Intern",
      openToWork: true,
      profileCompleteness: 74,
      resumeUrl: "/resumes/arjun-mehta.pdf"
    },
    verification: {
      isVerified: true,
      source: "platform_activity",
      lastUpdated: "2026-05-02"
    },
    skills: [
      { name: "JavaScript", level: "Intermediate", score: 72 },
      { name: "React", level: "Beginner", score: 68 },
      { name: "HTML", level: "Intermediate", score: 80 },
      { name: "CSS", level: "Intermediate", score: 76 }
    ],
    learningMetrics: {
      courseCompletionPercent: 69,
      attendancePercent: 84,
      averageAssignmentScore: 71,
      assessmentScore: 70
    },
    project: {
      title: "Personal Portfolio",
      description: "Created a responsive portfolio with project sections and contact form.",
      url: "https://github.com/example/arjun-portfolio"
    },
    teacherRecommendation: {
      status: "promising",
      rating: 3.8,
      note: "Reliable on assignments and improving steadily; needs more confidence in React state patterns.",
      recommendedBy: "Anita Mehra"
    }
  },
  {
    studentId: 7,
    student: {
      location: "Hyderabad",
      targetRole: "Backend Intern",
      openToWork: true,
      profileCompleteness: 68,
      resumeUrl: "/resumes/sneha-iyer.pdf"
    },
    verification: {
      isVerified: true,
      source: "platform_activity",
      lastUpdated: "2026-04-28"
    },
    skills: [
      { name: "Node.js", level: "Intermediate", score: 77 },
      { name: "Express", level: "Intermediate", score: 75 },
      { name: "MongoDB", level: "Beginner", score: 64 },
      { name: "REST APIs", level: "Intermediate", score: 79 }
    ],
    learningMetrics: {
      courseCompletionPercent: 73,
      attendancePercent: 88,
      averageAssignmentScore: 78,
      assessmentScore: 74
    },
    project: null,
    teacherRecommendation: {
      status: "needs_portfolio_evidence",
      rating: 3.6,
      note: "Good backend fundamentals, but the final project has not been submitted yet.",
      recommendedBy: "Meera Teacher"
    }
  },
  {
    studentId: 8,
    student: {
      location: "Delhi",
      targetRole: "Frontend QA Intern",
      openToWork: false,
      profileCompleteness: 81,
      resumeUrl: "/resumes/kabir-khan.pdf"
    },
    verification: {
      isVerified: true,
      source: "platform_activity",
      lastUpdated: "2026-04-30"
    },
    skills: [
      { name: "React", level: "Beginner", score: 62 },
      { name: "TypeScript", level: "Beginner", score: 58 },
      { name: "Testing", level: "Intermediate", score: 72 },
      { name: "Git", level: "Intermediate", score: 76 }
    ],
    learningMetrics: {
      courseCompletionPercent: 64,
      attendancePercent: 76,
      averageAssignmentScore: 66,
      assessmentScore: 49
    },
    project: {
      title: "Component Test Suite",
      description: "Added unit tests for common React components and documented edge cases.",
      url: "https://github.com/example/component-tests"
    },
    teacherRecommendation: {
      status: "not_job_ready",
      rating: 3.1,
      note: "Strong testing discipline, but current assessment score is below interview-ready threshold.",
      recommendedBy: "Anita Mehra"
    }
  },
  {
    studentId: 9,
    student: {
      location: "Mumbai",
      targetRole: "Frontend Intern",
      openToWork: true,
      profileCompleteness: 42,
      resumeUrl: ""
    },
    verification: {
      isVerified: false,
      source: "insufficient_activity",
      lastUpdated: "2026-05-01"
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
    }
  }
];

export const shortlists = [];

export const recruiterDecisions = [];

export const activityLog = [
  { id: 1, type: "signup", message: "Riya Sharma created an account", timestamp: new Date().toISOString() },
  { id: 2, type: "course", message: "Meera Teacher published Full Stack Web Development", timestamp: new Date().toISOString() }
];

export const nextId = (collection) => {
  if (!collection.length) return 1;
  return Math.max(...collection.map((item) => item.id)) + 1;
};
