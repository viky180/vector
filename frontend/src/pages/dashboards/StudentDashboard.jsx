import { useEffect, useState } from "react";
import DashboardShell from "../../components/layout/DashboardShell";
import StatCard from "../../components/common/StatCard";
import LiveClassPlaceholder from "../../components/live/LiveClassPlaceholder";
import ResumePreview from "../../components/resume/ResumePreview";
import { apiRequest } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { token } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [dashboardData, resumeData] = await Promise.all([
          apiRequest("/student/dashboard", { token }),
          apiRequest("/student/resume", { token })
        ]);
        setDashboard(dashboardData);
        setResume(resumeData);
      } catch (err) {
        setError(err.message);
      }
    };

    load();
  }, [token]);

  return (
    <DashboardShell title="Student Dashboard">
      {error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <section className="panel grid overflow-hidden md:grid-cols-3">
        <StatCard label="Enrolled Courses" value={dashboard?.courses?.length || 0} />
        <StatCard label="Average Score" value={`${dashboard?.metrics?.avgScore || 0}%`} />
        <StatCard label="Attendance" value={`${dashboard?.metrics?.avgAttendance || 0}%`} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="panel p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="section-title">Enrolled Courses</h3>
            <span className="text-xs font-semibold uppercase text-stone-500">Active</span>
          </div>
          <div className="mt-4 divide-y divide-stone-200">
            {dashboard?.courses?.map((course) => (
              <div key={course.id} className="py-4">
                <p className="font-semibold text-[#071647]">{course.title}</p>
                <p className="mt-1 text-sm leading-6 text-stone-600">{course.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h3 className="section-title">Live Classes</h3>
          <div className="mt-4 space-y-3">
            {dashboard?.liveClasses?.map((liveClass) => (
              <LiveClassPlaceholder key={liveClass.id} {...liveClass} />
            ))}
          </div>
        </div>
      </section>

      <ResumePreview resume={resume} />
    </DashboardShell>
  );
};

export default StudentDashboard;
