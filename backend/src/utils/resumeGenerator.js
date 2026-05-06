export const generateResume = ({ student, performance, skills }) => {
  const avgScore = performance.length
    ? Math.round(performance.reduce((sum, item) => sum + item.score, 0) / performance.length)
    : 0;

  return {
    name: student.name,
    email: student.email,
    headline: "Aspiring tech professional from SkillBridge",
    summary: `${student.name} has shown consistent progress across technical coursework with an average score of ${avgScore}%.`,
    skills,
    achievements: performance.map((item) => `${item.courseTitle}: ${item.score}% (${item.attendance}% attendance)`),
    availability: "Open to internships and entry-level roles"
  };
};
