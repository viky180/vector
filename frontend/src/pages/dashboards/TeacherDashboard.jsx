import { useEffect, useState } from "react";
import DashboardShell from "../../components/layout/DashboardShell";
import StatCard from "../../components/common/StatCard";
import { apiRequest } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const TeacherDashboard = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [courseForm, setCourseForm] = useState({ title: "", description: "", level: "Beginner" });

  const fetchData = async () => {
    try {
      const result = await apiRequest("/teacher/dashboard", { token });
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createCourse = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await apiRequest("/teacher/courses", {
        method: "POST",
        token,
        body: { ...courseForm, tags: ["New"] }
      });
      setCourseForm({ title: "", description: "", level: "Beginner" });
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DashboardShell title="Teacher Dashboard">
      {error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <section className="panel grid overflow-hidden md:grid-cols-3">
        <StatCard label="My Courses" value={data?.courses?.length || 0} />
        <StatCard label="Scheduled Live Classes" value={data?.liveClasses?.length || 0} />
        <StatCard label="Enrolled Students" value={data?.studentCount || 0} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-5">
          <h3 className="section-title">Create New Course</h3>
          <form onSubmit={createCourse} className="mt-4 space-y-3">
            <input
              required
              placeholder="Course title"
              value={courseForm.title}
              onChange={(e) => setCourseForm((prev) => ({ ...prev, title: e.target.value }))}
              className="field"
            />
            <textarea
              required
              placeholder="Course description"
              value={courseForm.description}
              onChange={(e) => setCourseForm((prev) => ({ ...prev, description: e.target.value }))}
              className="field h-28"
            />
            <select
              value={courseForm.level}
              onChange={(e) => setCourseForm((prev) => ({ ...prev, level: e.target.value }))}
              className="field"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <button className="btn-accent">Create Course</button>
          </form>
        </div>

        <div className="panel p-5">
          <h3 className="section-title">Course Management</h3>
          <div className="mt-4 divide-y divide-stone-200">
            {data?.courses?.map((course) => (
              <div key={course.id} className="flex items-center justify-between gap-4 py-4">
                <p className="font-semibold text-[#071647]">{course.title}</p>
                <p className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-semibold text-stone-600">{course.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default TeacherDashboard;
