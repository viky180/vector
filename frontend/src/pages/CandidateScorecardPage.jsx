import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../api/client";
import DashboardShell from "../components/layout/DashboardShell";
import { useAuth } from "../context/AuthContext";

const metricHealth = (value, strong = 80, weak = 60) => {
  if (value === null || value === undefined) return "missing";
  if (value >= strong) return "strong";
  if (value < weak) return "weak";
  return "average";
};

const healthStyles = {
  strong: "border-emerald-200 bg-emerald-50 text-emerald-800",
  average: "border-amber-200 bg-amber-50 text-amber-800",
  weak: "border-red-200 bg-red-50 text-red-800",
  missing: "border-stone-200 bg-stone-50 text-stone-500"
};

const decisionStyles = {
  not_reviewed: "border-stone-200 bg-stone-50 text-stone-700",
  shortlisted: "border-emerald-200 bg-emerald-50 text-emerald-800",
  rejected: "border-red-200 bg-red-50 text-red-800",
  interview_requested: "border-amber-200 bg-amber-50 text-amber-800"
};

const formatPercent = (value) => (value === null || value === undefined ? "Missing" : `${value}%`);
const formatStatus = (value = "") => value.replaceAll("_", " ");

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>
    {children}
  </span>
);

const ProgressBar = ({ value, health }) => (
  <div className="mt-3 h-2 rounded-full bg-stone-200">
    <div
      className={`h-2 rounded-full ${
        health === "strong" ? "bg-emerald-500" : health === "weak" ? "bg-red-500" : "bg-amber-500"
      }`}
      style={{ width: `${Math.max(0, Math.min(value || 0, 100))}%` }}
    />
  </div>
);

const MetricBlock = ({ label, value, strong, weak }) => {
  const health = metricHealth(value, strong, weak);

  return (
    <div className={`rounded-md border p-4 ${healthStyles[health]}`}>
      <p className="text-sm font-medium capitalize">{label}</p>
      <p className="mt-2 text-3xl font-bold">{formatPercent(value)}</p>
      <ProgressBar value={value} health={health} />
    </div>
  );
};

const CandidateScorecardPage = () => {
  const { studentId } = useParams();
  const { token } = useAuth();
  const [scorecard, setScorecard] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  const loadScorecard = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest(`/recruiter/candidates/${studentId}/scorecard`, { token });
      setScorecard(data);
      setNote(data.recruiterDecision?.note || "");
      console.log("scorecard_viewed", { studentId });
    } catch (err) {
      setError(err.message || "Backend/network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScorecard();
  }, [studentId]);

  const interviewSignal = useMemo(() => {
    if (!scorecard) return "Needs review";
    const metrics = scorecard.learningMetrics;
    if (!scorecard.verification.isVerified) return "Needs more evidence";
    if ((metrics.assessmentScore || 0) >= 75 && (metrics.attendancePercent || 0) >= 85 && scorecard.project?.url) {
      return "Strong interview signal";
    }
    if ((metrics.assessmentScore || 0) < 60 || !scorecard.project?.url) return "Review carefully";
    return "Moderate interview signal";
  }, [scorecard]);

  const submitDecision = async (actionPath, eventName) => {
    setActionLoading(actionPath);
    setActionError("");
    try {
      await apiRequest(`/recruiter/candidates/${studentId}/${actionPath}`, {
        method: "POST",
        token,
        body: { note }
      });
      console.log(eventName, { studentId, note });
      await loadScorecard();
    } catch (err) {
      setActionError(err.message || "Could not save recruiter decision");
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <DashboardShell title="Candidate Scorecard">
        <div className="panel p-6">
          <p className="text-stone-600">Loading candidate scorecard...</p>
        </div>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell title="Candidate Scorecard">
        <div className="rounded-md border border-red-200 bg-red-50 p-6 text-red-800">
          <p className="font-semibold">{error === "Candidate not found" ? "Candidate not found" : "Backend/network error"}</p>
          <p className="mt-2 text-sm">Return to the candidate pool and try again.</p>
          <Link to="/recruiter" className="mt-4 inline-block rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white">
            Back to dashboard
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const { student, verification, learningMetrics, project, teacherRecommendation, recruiterDecision } = scorecard;
  const noVerifiedData = !verification.isVerified;

  return (
    <DashboardShell title="Candidate Scorecard">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/recruiter" className="text-sm font-semibold text-stone-700 hover:text-[#071647]">
          Back to recruiter dashboard
        </Link>
        <p className="text-sm text-stone-500">Last updated: {verification.lastUpdated || "Not available"}</p>
      </div>

      {noVerifiedData ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <p className="font-semibold">Candidate has no verified learning data yet.</p>
          <p className="mt-1 text-sm">Use caution before shortlisting; this profile needs more platform evidence.</p>
        </div>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="panel p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-3xl font-semibold text-[#071647]">{student.name}</h2>
                  {student.openToWork ? <Badge className="border-sky-200 bg-sky-50 text-sky-800">Open to work</Badge> : null}
                  {verification.isVerified ? (
                    <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800">Verified</Badge>
                  ) : (
                    <Badge className="border-amber-200 bg-amber-50 text-amber-800">Needs more evidence</Badge>
                  )}
                </div>
                <p className="mt-2 text-lg font-semibold text-stone-700">{student.targetRole}</p>
                <p className="text-sm text-slate-500">{student.location} · {student.email}</p>
              </div>

              <div className="panel-muted min-w-44 p-4">
                <p className="text-sm font-medium text-stone-600">Profile completeness</p>
                <p className="mt-1 text-3xl font-semibold text-[#071647]">{student.profileCompleteness}%</p>
                <ProgressBar value={student.profileCompleteness} health={metricHealth(student.profileCompleteness, 80, 50)} />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className={verification.isVerified ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-stone-200 bg-stone-50 text-stone-700"}>
                {verification.isVerified ? "Verified from platform activity" : "Needs more evidence"}
              </Badge>
              <Badge className="border-[#071647] bg-[#071647] text-white">{interviewSignal}</Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <MetricBlock label="Course completion" value={learningMetrics.courseCompletionPercent} />
            <MetricBlock label="Attendance" value={learningMetrics.attendancePercent} strong={85} weak={70} />
            <MetricBlock label="Assignment score" value={learningMetrics.averageAssignmentScore} />
            <MetricBlock label="Assessment score" value={learningMetrics.assessmentScore} strong={75} weak={60} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="panel p-5">
              <h3 className="section-title">Skills</h3>
              <div className="mt-4 space-y-3">
                {scorecard.skills.length ? (
                  scorecard.skills.map((skill) => {
                    const health = metricHealth(skill.score, 75, 60);
                    return (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-stone-900">{skill.name}</p>
                            <p className="text-sm text-stone-500">{skill.level}</p>
                          </div>
                          <Badge className={healthStyles[health]}>{skill.score}%</Badge>
                        </div>
                        <ProgressBar value={skill.score} health={health} />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-stone-500">No verified skills are available yet.</p>
                )}
              </div>
            </div>

            <div className="panel p-5">
              <h3 className="section-title">Final Project</h3>
              {project ? (
                <div className="mt-4">
                  <p className="font-semibold text-stone-900">{project.title}</p>
                  <p className="mt-2 text-sm text-stone-600">{project.description}</p>
                  {project.url ? (
                    <a className="mt-4 inline-block text-sm font-semibold text-[#2454f4] hover:text-[#123bd6]" href={project.url} target="_blank" rel="noreferrer">
                      View project
                    </a>
                  ) : null}
                </div>
              ) : (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  Final project is missing. Needs more evidence before an interview decision.
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="panel p-5">
              <h3 className="section-title">Teacher Recommendation</h3>
              <div className="mt-4 space-y-2 text-sm text-stone-700">
                <p><span className="font-semibold">Status:</span> {formatStatus(teacherRecommendation.status)}</p>
                <p><span className="font-semibold">Rating:</span> {teacherRecommendation.rating || "Not available"}</p>
                <p><span className="font-semibold">Recommended by:</span> {teacherRecommendation.recommendedBy || "Not available"}</p>
                <p className="pt-2 text-stone-600">{teacherRecommendation.note}</p>
              </div>
            </div>

            <div className="panel p-5">
              <h3 className="section-title">Resume</h3>
              {student.resumeUrl ? (
                <a className="mt-4 inline-block rounded-md bg-[#2454f4] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#123bd6]" href={student.resumeUrl}>
                  Preview or download resume
                </a>
              ) : (
                <p className="mt-4 text-sm text-stone-500">Resume is not available.</p>
              )}
            </div>
          </div>
        </div>

        <aside className="panel h-fit p-5 lg:sticky lg:top-6">
          <h3 className="section-title">Recruiter Decision</h3>
          <div className="mt-3">
            <Badge className={decisionStyles[recruiterDecision.status] || decisionStyles.not_reviewed}>
              {formatStatus(recruiterDecision.status)}
            </Badge>
          </div>
          <label className="mt-5 block text-sm font-medium text-stone-700" htmlFor="recruiter-note">
            Recruiter note
          </label>
          <textarea
            id="recruiter-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="field mt-2 min-h-32"
            placeholder="Add context for the hiring team."
          />
          {actionError ? <p className="mt-3 text-sm text-red-600">{actionError}</p> : null}
          <div className="mt-5 grid gap-3">
            <button
              onClick={() => submitDecision("request-interview", "interview_requested")}
              className="btn-accent"
              disabled={Boolean(actionLoading)}
            >
              {actionLoading === "request-interview" ? "Saving..." : "Request interview"}
            </button>
            <button
              onClick={() => submitDecision("shortlist", "candidate_shortlisted")}
              className="rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
              disabled={Boolean(actionLoading)}
            >
              {actionLoading === "shortlist" ? "Saving..." : "Shortlist"}
            </button>
            <button
              onClick={() => submitDecision("reject", "candidate_rejected")}
              className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
              disabled={Boolean(actionLoading)}
            >
              {actionLoading === "reject" ? "Saving..." : "Reject"}
            </button>
          </div>
        </aside>
      </section>
    </DashboardShell>
  );
};

export default CandidateScorecardPage;
