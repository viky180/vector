import { activityLog } from "../data/mockData.js";

export const listActivity = () => activityLog.slice().reverse();
