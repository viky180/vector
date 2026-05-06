import { useEffect, useState } from "react";
import DashboardShell from "../../components/layout/DashboardShell";
import StatCard from "../../components/common/StatCard";
import RoleBadge from "../../components/common/RoleBadge";
import { apiRequest } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { token } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [dash, userList] = await Promise.all([
        apiRequest("/admin/dashboard", { token }),
        apiRequest("/admin/users", { token })
      ]);
      setDashboard(dash);
      setUsers(userList);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveTeacher = async (teacherId) => {
    try {
      await apiRequest(`/admin/teachers/${teacherId}/approve`, {
        method: "PUT",
        token
      });
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DashboardShell title="Admin Dashboard">
      {error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <section className="panel grid overflow-hidden md:grid-cols-4">
        <StatCard label="Total Users" value={dashboard?.stats?.totalUsers || 0} />
        <StatCard label="Students" value={dashboard?.stats?.totalStudents || 0} />
        <StatCard label="Teachers" value={dashboard?.stats?.totalTeachers || 0} />
        <StatCard label="Pending Approvals" value={dashboard?.stats?.pendingTeachers || 0} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-5">
          <h3 className="section-title">User Management</h3>
          <div className="mt-4 max-h-96 divide-y divide-stone-200 overflow-auto pr-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-semibold text-[#071647]">{user.name}</p>
                  <p className="text-sm text-stone-600">{user.email}</p>
                  <div className="mt-1">
                    <RoleBadge role={user.role} />
                  </div>
                </div>
                {user.role === "teacher" && !user.approved ? (
                  <button
                    className="rounded-md bg-[#2454f4] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#123bd6]"
                    onClick={() => approveTeacher(user.id)}
                  >
                    Approve
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h3 className="section-title">Recent Activity</h3>
          <div className="mt-4 space-y-3">
            {dashboard?.recentActivity?.map((activity) => (
              <div key={activity.id} className="border-l-2 border-[#2454f4] py-1 pl-3">
                <p className="text-sm font-medium text-stone-900">{activity.message}</p>
                <p className="text-xs text-stone-500">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default AdminDashboard;
