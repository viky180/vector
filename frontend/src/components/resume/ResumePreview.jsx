const ResumePreview = ({ resume }) => {
  if (!resume) return null;

  return (
    <div className="panel p-6">
      <p className="eyebrow">Candidate signal</p>
      <h3 className="mt-2 text-xl font-semibold text-[#071647]">Auto-Generated Resume</h3>
      <p className="mt-1 text-sm text-stone-600">{resume.headline}</p>

      <div className="mt-4 space-y-4 text-sm">
        <div>
          <p className="font-semibold text-[#071647]">Summary</p>
          <p className="mt-1 leading-6 text-stone-700">{resume.summary}</p>
        </div>

        <div>
          <p className="font-semibold text-[#071647]">Skills</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {resume.skills?.map((skill) => (
              <span key={skill} className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-semibold text-stone-700">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-[#071647]">Achievements</p>
          <ul className="mt-1 list-disc pl-5 leading-6 text-stone-700">
            {resume.achievements?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
