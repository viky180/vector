import bcrypt from "bcryptjs";
import { users, nextId, activityLog } from "../data/mockData.js";

export const findUserByEmail = (email) => users.find((user) => user.email.toLowerCase() === email.toLowerCase());

export const findUserById = (id) => users.find((user) => user.id === Number(id));

export const createUser = async ({ name, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: nextId(users),
    name,
    email,
    password: hashedPassword,
    role,
    approved: role !== "teacher",
    skills: []
  };

  users.push(newUser);
  activityLog.push({
    id: nextId(activityLog),
    type: "signup",
    message: `${name} signed up as ${role}`,
    timestamp: new Date().toISOString()
  });

  return newUser;
};

export const validatePassword = async (plain, hashed) => bcrypt.compare(plain, hashed);

export const listUsers = (role) => {
  if (!role) return users;
  return users.filter((user) => user.role === role);
};

export const approveTeacher = (teacherId) => {
  const teacher = users.find((user) => user.id === Number(teacherId) && user.role === "teacher");
  if (!teacher) return null;
  teacher.approved = true;
  activityLog.push({
    id: nextId(activityLog),
    type: "approval",
    message: `${teacher.name} was approved as teacher`,
    timestamp: new Date().toISOString()
  });
  return teacher;
};
