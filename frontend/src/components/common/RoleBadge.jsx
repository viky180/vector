const roleColors = {
  student: "bg-sky-50 text-sky-800 border-sky-200",
  teacher: "bg-emerald-50 text-emerald-800 border-emerald-200",
  recruiter: "bg-amber-50 text-amber-800 border-amber-200",
  admin: "bg-violet-50 text-violet-800 border-violet-200"
};

const RoleBadge = ({ role }) => (
  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${roleColors[role] || "border-stone-200 bg-stone-100 text-stone-600"}`}>
    {role}
  </span>
);

export default RoleBadge;
