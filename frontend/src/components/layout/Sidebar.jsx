import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const roleLinks = {
  student: [
    { name: "Workspace", to: "/student", mark: "S" },
    { name: "Course Detail", to: "/courses/1", mark: "C" }
  ],
  teacher: [
    { name: "Workspace", to: "/teacher", mark: "T" },
    { name: "Course Detail", to: "/courses/1", mark: "C" }
  ],
  recruiter: [
    { name: "Pipeline", to: "/recruiter", mark: "R" },
    { name: "Course Detail", to: "/courses/1", mark: "C" }
  ],
  admin: [{ name: "Control Room", to: "/admin", mark: "A" }]
};

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const links = roleLinks[user?.role] || [];

  return (
    <aside className="w-full border-b border-blue-100 bg-[#041949] text-blue-100 md:sticky md:top-0 md:min-h-screen md:w-72 md:border-b-0 md:border-r md:border-blue-900">
      <div className="p-5">
      <Link to="/" className="inline-flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-md bg-[#2454f4] text-sm font-bold text-white shadow-[0_10px_24px_rgba(36,84,244,0.28)]">SB</span>
        <span className="text-xl font-semibold tracking-tight text-white">SkillBridge</span>
      </Link>

      <div className="mt-8 border-y border-blue-900/70 py-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-blue-300/70">Signed in as</p>
        <p className="mt-2 text-sm font-semibold text-white">{user?.name}</p>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan-300">{user?.role}</p>
      </div>

      <nav className="mt-6 space-y-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                active ? "bg-white text-[#071647]" : "text-blue-100 hover:bg-[#123bd6]/45 hover:text-white"
              }`}
            >
              <span className={`grid h-7 w-7 place-items-center rounded border text-xs ${
                active ? "border-blue-100 bg-blue-50 text-[#2454f4]" : "border-blue-800"
              }`}>
                {link.mark}
              </span>
              {link.name}
            </Link>
          );
        })}
      </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
