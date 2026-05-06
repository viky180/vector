import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = ({ title }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="panel flex flex-wrap items-center justify-between gap-4 p-5 animate-rise">
      <div>
        <p className="eyebrow">Workspace</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#071647]">{title}</h1>
        <p className="mt-1 text-sm text-stone-400">Welcome back, <span className="font-medium text-stone-500">{user?.name}</span></p>
      </div>
      <button
        className="btn-secondary"
        onClick={onLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
