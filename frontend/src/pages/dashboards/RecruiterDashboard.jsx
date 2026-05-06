import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardShell from "../../components/layout/DashboardShell";
import StatCard from "../../components/common/StatCard";
import { apiRequest } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const RecruiterDashboard = () => {
  const { token } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const [filters, setFilters] = useState({ skills: "", minScore: "0" });
  const [error, setError] = useState("");

  const fetchCandidates = async () => {
    try {
      const query = new URLSearchParams({
        skills: filters.skills,
        minScore: filters.minScore
      }).toString();

      const [candidateList, shortlist] = await Promise.all([
        apiRequest(`/recruiter/candidates?${query}`, { token }),
        apiRequest("/recruiter/shortlist", { token })
      ]);

      setCandidates(candidateList);
      setShortlisted(shortlist);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const shortlistCandidate = async (studentId) => {
    try {
      await apiRequest("/recruiter/shortlist", {
        method: "POST",
        token,
        body: { studentId }
      });
      fetchCandidates();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DashboardShell title="Recruiter Dashboard">
      {error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <section className="panel grid overflow-hidden md:grid-cols-3">
        <StatCard label="Filtered Candidates" value={candidates.length} />
        <StatCard label="Shortlisted" value={shortlisted.length} />
        <StatCard label="Min Score Filter" value={`${filters.minScore}%`} />
      </section>

      <section className="panel p-5">
        <h3 className="section-title">Filter Candidates</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            placeholder="Skills (comma separated)"
            value={filters.skills}
            onChange={(e) => setFilters((prev) => ({ ...prev, skills: e.target.value }))}
            className="field"
          />
          <input
            type="number"
            placeholder="Min score"
            value={filters.minScore}
            onChange={(e) => setFilters((prev) => ({ ...prev, minScore: e.target.value }))}
            className="field"
          />
          <button className="btn-accent" onClick={fetchCandidates}>
            Apply Filters
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="panel p-5">
          <h3 className="section-title">Candidate Pool</h3>
          <div className="mt-4 divide-y divide-stone-200">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#071647]">{candidate.name}</p>
                    <p className="text-sm text-stone-600">{candidate.targetRole} · {candidate.location}</p>
                    <p className="text-sm text-stone-500">{candidate.email}</p>
                  </div>
                  <p className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-semibold text-stone-700">
                    {candidate.avgScore}% score
                  </p>
                </div>
                <p className="mt-2 text-sm text-stone-700">
                  Attendance: {candidate.avgAttendance}% · Skills: {candidate.skills.join(", ")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {candidate.verified ? (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                      Verified
                    </span>
                  ) : (
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                      Needs more evidence
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    to={`/recruiter/candidates/${candidate.id}`}
                    className="rounded-md bg-[#071647] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#123bd6]"
                  >
                    View scorecard
                  </Link>
                  <button
                    className="rounded-md bg-[#2454f4] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#123bd6]"
                    onClick={() => shortlistCandidate(candidate.id)}
                  >
                    Shortlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h3 className="section-title">Shortlisted Candidates</h3>
          <div className="mt-4 space-y-3">
            {shortlisted.map((candidate) => (
              <div key={candidate.id} className="panel-muted p-3">
                <p className="font-semibold text-[#071647]">{candidate.name}</p>
                <p className="text-sm text-stone-600">{candidate.email}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default RecruiterDashboard;
