import { activityLog, nextId } from "../data/mockData.js";

export const trackEvent = ({ type, actorId, studentId, metadata = {} }) => {
  const event = {
    id: nextId(activityLog),
    type,
    message: `${type}${studentId ? ` for student ${studentId}` : ""}`,
    actorId,
    studentId,
    metadata,
    timestamp: new Date().toISOString()
  };

  activityLog.push(event);
  console.log("[analytics]", event);
  return event;
};
