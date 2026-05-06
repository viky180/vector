import { assignments, courses, enrollments, liveClasses, nextId, performance, users } from "../data/mockData.js";

export const listCourses = () =>
  courses.map((course) => ({ ...course, teacher: users.find((user) => user.id === course.teacherId)?.name || "Unknown" }));

export const getCourseById = (id) => {
  const course = courses.find((item) => item.id === Number(id));
  if (!course) return null;

  return {
    ...course,
    teacher: users.find((user) => user.id === course.teacherId)?.name || "Unknown",
    assignments: assignments.filter((item) => item.courseId === course.id),
    liveClasses: liveClasses.filter((item) => item.courseId === course.id),
    enrolledStudents: enrollments.filter((item) => item.courseId === course.id).length
  };
};

export const createCourse = ({ title, description, teacherId, level, tags = [] }) => {
  const newCourse = { id: nextId(courses), title, description, teacherId: Number(teacherId), level, tags };
  courses.push(newCourse);
  return newCourse;
};

export const updateCourse = (courseId, payload, teacherId) => {
  const course = courses.find((item) => item.id === Number(courseId) && item.teacherId === Number(teacherId));
  if (!course) return null;
  Object.assign(course, payload);
  return course;
};

export const scheduleClass = ({ courseId, teacherId, title, startTime, meetingLink }) => {
  const newClass = {
    id: nextId(liveClasses),
    courseId: Number(courseId),
    teacherId: Number(teacherId),
    title,
    startTime,
    meetingLink
  };
  liveClasses.push(newClass);
  return newClass;
};

export const createAssignment = ({ courseId, teacherId, title, description, dueDate }) => {
  const newAssignment = {
    id: nextId(assignments),
    courseId: Number(courseId),
    teacherId: Number(teacherId),
    title,
    description,
    dueDate,
    submissions: []
  };
  assignments.push(newAssignment);
  return newAssignment;
};

export const gradeAssignment = ({ assignmentId, studentId, score, feedback }) => {
  const assignment = assignments.find((item) => item.id === Number(assignmentId));
  if (!assignment) return null;

  const existingSubmission = assignment.submissions.find((item) => item.studentId === Number(studentId));
  if (existingSubmission) {
    existingSubmission.score = Number(score);
    existingSubmission.feedback = feedback;
  } else {
    assignment.submissions.push({ studentId: Number(studentId), score: Number(score), feedback });
  }

  const performanceEntry = performance.find(
    (item) => item.studentId === Number(studentId) && item.courseId === assignment.courseId
  );
  if (performanceEntry) {
    performanceEntry.score = Math.round((performanceEntry.score + Number(score)) / 2);
  }

  return assignment;
};

export const getStudentDashboard = (studentId) => {
  const enrolledCourseIds = enrollments.filter((item) => item.studentId === Number(studentId)).map((item) => item.courseId);
  const studentCourses = courses.filter((course) => enrolledCourseIds.includes(course.id));
  const studentPerformance = performance.filter((item) => item.studentId === Number(studentId));
  const studentClasses = liveClasses.filter((item) => enrolledCourseIds.includes(item.courseId));

  return {
    courses: studentCourses,
    performance: studentPerformance,
    liveClasses: studentClasses,
    metrics: {
      avgScore: studentPerformance.length
        ? Math.round(studentPerformance.reduce((sum, item) => sum + item.score, 0) / studentPerformance.length)
        : 0,
      avgAttendance: studentPerformance.length
        ? Math.round(studentPerformance.reduce((sum, item) => sum + item.attendance, 0) / studentPerformance.length)
        : 0,
      assignmentsCompleted: studentPerformance.reduce((sum, item) => sum + item.assignmentsCompleted, 0)
    }
  };
};

export const getTeacherDashboard = (teacherId) => {
  const myCourses = courses.filter((course) => course.teacherId === Number(teacherId));
  const courseIds = myCourses.map((course) => course.id);

  return {
    courses: myCourses,
    liveClasses: liveClasses.filter((liveClass) => liveClass.teacherId === Number(teacherId)),
    assignments: assignments.filter((assignment) => assignment.teacherId === Number(teacherId)),
    studentCount: enrollments.filter((enrollment) => courseIds.includes(enrollment.courseId)).length
  };
};
