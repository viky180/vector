import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "student"
};

const demoAccounts = [
  ["Student", "student@skillbridge.com"],
  ["Teacher", "teacher@skillbridge.com"],
  ["Recruiter", "recruiter@skillbridge.com"],
  ["Admin", "admin@skillbridge.com"]
];

const AuthPage = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        const result = await signup(form);
        if (result.user.role === "teacher" && !result.user.approved) {
          setError("Signup complete. Teacher account awaits admin approval.");
        }
        navigate(`/${result.user.role}`);
      } else {
        const user = await login({ email: form.email, password: form.password });
        navigate(`/${user.role}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const useDemo = (email) => {
    setForm((prev) => ({ ...prev, email, password: "password123" }));
    setIsSignup(false);
    setError("");
  };

  return (
    <div className="app-bg min-h-screen px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="animate-rise">
          <Link to="/" className="inline-flex items-center gap-3 text-lg font-semibold text-[#071647]">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#2454f4] text-sm font-bold text-white shadow-[0_10px_24px_rgba(36,84,244,0.24)]">SB</span>
            <span>SkillBridge</span>
          </Link>

          <div className="mt-14 max-w-xl">
            <p className="eyebrow">Secure access</p>
            <h1 className="heading-display mt-4 text-5xl text-[#071647]">
              Open the right workspace for your role.
            </h1>
            <p className="body-lead mt-5">
              Students, teachers, recruiters, and admins each land in a focused interface built for their next decision.
            </p>
          </div>

          <div className="mt-10 grid gap-0 border-y border-blue-100 sm:grid-cols-2">
            {demoAccounts.map(([role, email]) => (
              <button
                key={email}
                type="button"
                onClick={() => useDemo(email)}
                className="border-b border-blue-100 px-0 py-4 text-left transition hover:bg-white/70 sm:px-4 even:sm:border-l"
              >
                <span className="block text-sm font-semibold text-[#071647]">{role}</span>
                <span className="mt-1 block break-all text-xs text-[#33415f]">{email}</span>
              </button>
            ))}
          </div>
        </section>

        <form className="panel animate-rise-delay p-6 md:p-8" onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-blue-100 pb-6">
            <div>
              <p className="eyebrow">{isSignup ? "Create account" : "Welcome back"}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#071647]">{isSignup ? "Join SkillBridge" : "Login to continue"}</h2>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setIsSignup((prev) => !prev);
                setError("");
              }}
            >
              {isSignup ? "Use login" : "Create account"}
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {isSignup ? (
              <label className="block">
                <span className="text-sm font-medium text-stone-700">Full name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="field mt-1.5"
                />
              </label>
            ) : null}

            <label className="block">
              <span className="text-sm font-medium text-stone-700">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="field mt-1.5"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-stone-700">Password</span>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                className="field mt-1.5"
              />
            </label>

            {isSignup ? (
              <label className="block">
                <span className="text-sm font-medium text-stone-700">Role</span>
                <select
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="field mt-1.5"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
            ) : null}

            {error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

            <button disabled={loading} className="btn-accent w-full">
              {loading ? "Please wait..." : isSignup ? "Create account" : "Login"}
            </button>
            <p className="text-xs text-stone-400 leading-relaxed">Demo password for all listed accounts: <code className="font-mono font-semibold text-stone-500">password123</code></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
