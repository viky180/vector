import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = ["Features", "For Students", "For Teachers", "For Recruiters", "Pricing"];

const courses = [
  ["</>", "Full Stack Development", "75%", "bg-emerald-500", "w-3/4"],
  ["AI", "Data Science with Python", "60%", "bg-violet-500", "w-3/5"],
  ["UX", "UI/UX Design Fundamentals", "90%", "bg-orange-500", "w-[90%]"]
];

const features = [
  ["Resume", "Verified Resume", "Resumes are reviewed by multiple teachers selected by the platform for credibility.", "text-emerald-600", "bg-emerald-50"],
  ["Ratings", "Teacher Ratings", "Multi-teacher evaluation ensures fair and comprehensive assessments.", "text-violet-600", "bg-violet-50"],
  ["Live", "Live Classes", "Interactive live sessions with expert instructors and real-time doubt resolution.", "text-blue-600", "bg-blue-50"],
  ["Tests", "Skill Assessments", "Industry-aligned tests evaluate knowledge and practical skills.", "text-orange-600", "bg-orange-50"],
  ["Talent", "Recruiter Shortlisting", "Top recruiters shortlist candidates based on verified skills and performance.", "text-teal-600", "bg-teal-50"],
  ["Track", "Placement Dashboard", "Track applications, shortlists, and offers in a personalized dashboard.", "text-purple-600", "bg-purple-50"]
];

const roles = [
  {
    title: "Students",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=360&q=80",
    tint: "from-blue-50 to-white",
    bullets: ["Learn in-demand skills", "Get rated by expert teachers", "Build a verified resume", "Get shortlisted by recruiters", "Land your dream job"]
  },
  {
    title: "Teachers",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=360&q=80",
    tint: "from-violet-50 to-white",
    bullets: ["Teach live to motivated learners", "Evaluate and rate skills", "Build your expert profile", "Earn recognition", "Be a part of impact"]
  },
  {
    title: "Recruiters",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=360&q=80",
    tint: "from-teal-50 to-white",
    bullets: ["Access verified talent pool", "Smart shortlisting", "View ratings and skills", "Track hiring pipeline", "Hire the right talent"]
  }
];

const journey = [
  ["Book", "Learn", "Explore courses and learn with experts"],
  ["Code", "Practice", "Work on projects and build real skills"],
  ["Star", "Get Rated", "Get evaluated by multiple teachers"],
  ["Doc", "Build Resume", "Create a verified and rated resume"],
  ["Team", "Get Shortlisted", "Attract recruiter shortlisting"],
  ["Job", "Get Hired", "Receive offers and start your career"]
];

const testimonials = [
  ["Riya Patel", "Software Engineer at TechNova", "SkillBridge helped me go from a beginner to a job-ready developer. The verified resume and ratings really made a difference.", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"],
  ["Prof. Sneha Iyer", "Data Science Instructor", "The multi-teacher review system ensures quality and fairness. I love being able to mentor and make an impact.", "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80"],
  ["Vikram Malhotra", "Head of Talent at ByteWorks", "SkillBridge gives us access to pre-verified, high-quality candidates. Our hiring process is faster and smarter.", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80"]
];

const Logo = ({ inverse = false }) => (
  <span className="inline-flex items-center gap-2.5 font-black tracking-tight">
    <span className={`relative h-8 w-11 ${inverse ? "text-white" : "text-[#2454f4]"}`}>
      <span className="absolute left-0 top-3 h-3 w-2 rounded-sm border-2 border-current" />
      <span className="absolute right-0 top-3 h-3 w-2 rounded-sm border-2 border-current" />
      <span className="absolute left-2 right-2 top-2 h-0.5 bg-current" />
      <span className="absolute left-2 top-2 h-5 w-0.5 rotate-[28deg] bg-current" />
      <span className="absolute right-2 top-2 h-5 w-0.5 rotate-[-28deg] bg-current" />
      <span className="absolute left-[18px] top-0 h-7 w-1.5 rounded-full border-2 border-current" />
    </span>
    <span className={inverse ? "text-white" : "text-[#071647]"}>
      Skill<span className={inverse ? "text-cyan-200" : "text-[#2454f4]"}>Bridge</span>
    </span>
  </span>
);

const CircleIcon = ({ label, className = "" }) => (
  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-black shadow-sm ${className}`}>
    {label}
  </span>
);

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dashboardPath = user ? `/${user.role}` : "/auth";

  return (
    <div className="min-h-screen overflow-hidden bg-white text-[#071647]">
      <header className="sticky top-0 z-30 border-b border-blue-100/70 bg-white/90 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <Link to="/" className="text-2xl">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="text-sm font-medium tracking-[0.01em] text-[#071647] transition hover:text-[#2454f4]">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="hidden px-3 py-2 text-sm font-bold text-[#071647] transition hover:text-[#2454f4] sm:inline-flex">
              Login
            </Link>
            <button className="rounded-lg bg-[#2454f4] px-5 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(36,84,244,0.24)] transition hover:-translate-y-0.5 hover:bg-[#123bd6]" onClick={() => navigate(dashboardPath)}>
              {user ? "Open Workspace" : "Get Started"}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative bg-[linear-gradient(120deg,#f9fcff_0%,#eff6ff_48%,#f4f0ff_100%)] px-4 pb-20 pt-12">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(150deg,transparent_0%,transparent_55%,rgba(36,84,244,0.18)_55.3%,transparent_55.8%),repeating-linear-gradient(165deg,transparent_0,transparent_10px,rgba(36,84,244,0.13)_11px,transparent_12px)]" />
          <div className="absolute -right-24 top-44 h-72 w-72 rounded-full bg-[#b7a8ff]/45 blur-sm" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="animate-rise pt-6">
              <h1 className="heading-display max-w-3xl text-5xl text-[#071647] md:text-7xl">
                Learn. <span className="text-[#2454f4]">Get Verified.</span>
                <span className="block text-[#0f8197]">Get Hired.</span>
              </h1>
              <p className="body-lead mt-6 max-w-xl">
                SkillBridge connects students, teachers, and recruiters in one platform, empowering skills, verifying expertise, and unlocking career opportunities.
              </p>
              <div className="mt-9 flex flex-wrap gap-5">
                <Link to="/auth" className="inline-flex min-h-14 items-center gap-3 rounded-lg bg-[#2454f4] px-7 text-base font-black text-white shadow-[0_16px_34px_rgba(36,84,244,0.25)] transition hover:-translate-y-0.5">
                  Start Learning <span aria-hidden="true">-&gt;</span>
                </Link>
                <Link to="/auth" className="inline-flex min-h-14 items-center gap-3 rounded-lg border-2 border-[#2454f4]/45 bg-white/70 px-7 text-base font-black text-[#2454f4] transition hover:-translate-y-0.5 hover:border-[#2454f4]">
                  Hire Talent <span aria-hidden="true">++</span>
                </Link>
              </div>
            </div>

            <div className="relative grid gap-4 animate-rise-delay lg:min-h-[470px]">
              <div className="relative rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_22px_60px_rgba(23,51,120,0.14)] lg:absolute lg:left-0 lg:top-2 lg:w-[42%]">
                <div className="mb-5 flex items-center justify-between text-sm">
                  <strong>My Courses</strong>
                  <span className="text-xs font-bold text-blue-400">View all</span>
                </div>
                <div className="space-y-5">
                  {courses.map(([icon, name, value, color, width]) => (
                    <div key={name} className="grid grid-cols-[44px_1fr_auto] items-center gap-3">
                      <span className={`grid h-11 w-11 place-items-center rounded-lg ${color} text-xs font-black text-white`}>{icon}</span>
                      <div>
                        <p className="text-xs font-black">{name}</p>
                        <div className="mt-2 h-1.5 rounded-full bg-slate-200"><div className={`h-1.5 rounded-full ${color} ${width}`} /></div>
                      </div>
                      <span className="text-xs font-black text-slate-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_22px_60px_rgba(23,51,120,0.16)] lg:absolute lg:right-5 lg:top-2 lg:w-[48%]">
                <div className="mb-5 flex items-center justify-between">
                  <strong className="text-sm">Verified Resume</strong>
                  <span className="rounded-md bg-emerald-100 px-2 py-1 text-[10px] font-black text-emerald-700">VERIFIED</span>
                </div>
                <div className="flex gap-4">
                  <img className="h-16 w-16 rounded-full object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80" alt="Arjun Sharma" />
                  <div>
                    <p className="font-black">Arjun Sharma</p>
                    <p className="text-sm font-semibold text-slate-500">Full Stack Developer</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["JavaScript", "React", "Node.js", "MongoDB", "HTML", "CSS"].map((skill) => (
                    <span key={skill} className="rounded bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">{skill}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-black">Overall Rating</span>
                  <span className="text-orange-400">*****</span>
                  <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-emerald-400 text-sm font-black text-emerald-700">4.7/5</span>
                </div>
              </div>

              <div className="relative rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_22px_60px_rgba(23,51,120,0.14)] lg:absolute lg:bottom-24 lg:left-0 lg:w-[48%]">
                <div className="flex items-center justify-between">
                  <strong className="text-sm">Teacher Ratings</strong>
                  <span className="text-xs font-bold text-blue-400">View</span>
                </div>
                <p className="mt-3 text-3xl font-black">4.7/5 <span className="text-xl text-orange-400">****</span><span className="text-xl text-slate-300">*</span></p>
                <p className="mt-1 text-sm font-semibold text-slate-500">Based on 12 reviews</p>
                <div className="mt-4 flex -space-x-2">
                  {testimonials.map(([name, , , image]) => (
                    <img key={name} className="h-10 w-10 rounded-full border-2 border-white object-cover" src={image} alt={name} />
                  ))}
                  <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-slate-100 text-xs font-black">+9</span>
                </div>
              </div>

              <div className="relative rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_22px_60px_rgba(23,51,120,0.14)] lg:absolute lg:bottom-20 lg:right-0 lg:w-[45%]">
                <strong className="text-sm">Recruiter Shortlisting</strong>
                <div className="mt-4 space-y-3">
                  {["TechNova", "ByteWorks", "InnovateX"].map((company, index) => (
                    <div key={company} className="flex items-center justify-between text-sm font-bold">
                      <span>{company}</span>
                      <span className={`rounded-md px-2 py-1 text-xs ${index === 2 ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>{index === 2 ? "Under Review" : "Shortlisted"}</span>
                    </div>
                  ))}
                </div>
                <Link to="/auth" className="mt-4 inline-flex text-sm font-black text-[#2454f4]">View all opportunities -&gt;</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-12 px-4">
          <div className="mx-auto grid max-w-7xl gap-4 rounded-2xl border border-blue-100 bg-white px-7 py-7 shadow-[0_18px_50px_rgba(23,51,120,0.13)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["++", "10,000+", "Students"],
              ["Cap", "500+", "Teachers"],
              ["Org", "120+", "Recruiters"],
              ["Badge", "95%", "Placement Readiness"]
            ].map(([icon, value, label], index) => (
              <div key={label} className={`flex items-center justify-center gap-4 ${index ? "lg:border-l lg:border-blue-100" : ""}`}>
                <CircleIcon label={icon} className="bg-blue-50 text-[#2454f4]" />
                <div><p className="text-3xl font-black text-[#2454f4]">{value}</p><p className="font-bold">{label}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="heading-section text-center">Everything you need to learn and get hired</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {features.map(([icon, title, copy, color, bg]) => (
                <article key={title} className="rounded-xl border border-blue-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(23,51,120,0.1)]">
                  <CircleIcon label={icon} className={`mx-auto ${bg} ${color}`} />
                  <h3 className="heading-card mt-4">{title}</h3>
                  <p className="mt-2 text-sm leading-[1.6] text-[#33415f]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-10" id="for-students">
          <div className="mx-auto max-w-7xl">
            <h2 className="heading-section text-center">Built for every role in the ecosystem</h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {roles.map((role) => (
                <article key={role.title} className={`grid grid-cols-[120px_1fr] items-end gap-5 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br ${role.tint} p-5 shadow-sm`}>
                  <img className="h-48 w-32 self-end rounded-xl object-cover object-top" src={role.image} alt={role.title} />
                  <div className="py-2">
                    <h3 className="text-xl font-bold tracking-tight text-[#2454f4]">{role.title}</h3>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#243154]">
                      {role.bullets.map((bullet) => <li key={bullet}>○ {bullet}</li>)}
                    </ul>
                    <Link to="/auth" className="mt-5 inline-flex text-sm font-semibold text-[#2454f4]">Explore for {role.title} &rarr;</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-10" id="for-teachers">
          <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-2xl bg-[linear-gradient(110deg,#f7fbff,#eef5ff_45%,#f4fbff)] p-7 lg:grid-cols-[0.8fr_1fr_0.5fr]">
            <div>
              <h2 className="heading-section">Verified. Rated. Trusted.</h2>
              <p className="mt-4 text-lg font-semibold leading-snug">Multi-teacher review for trustable candidate profiles.</p>
              <p className="mt-4 leading-[1.7] text-[#33415f]">Every resume is reviewed by multiple expert teachers to ensure authenticity, accuracy, and real skills validation.</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-emerald-700 shadow-sm">Verified by SkillBridge</p>
            </div>
            <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
              <div className="rounded-2xl bg-white p-5 shadow-[0_16px_40px_rgba(23,51,120,0.12)]">
                <div className="flex gap-4">
                  <img className="h-14 w-14 rounded-full object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80" alt="Arjun Sharma" />
                  <div><p className="font-black">Arjun Sharma</p><p className="text-sm font-semibold text-slate-500">Full Stack Developer</p></div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">{["JavaScript", "React", "Node.js", "MongoDB"].map((skill) => <span key={skill} className="rounded bg-slate-100 px-2 py-1 text-[11px] font-bold">{skill}</span>)}</div>
                <div className="mt-6 space-y-2"><div className="h-2 rounded bg-slate-200" /><div className="h-2 w-4/5 rounded bg-slate-200" /></div>
              </div>
              <div className="space-y-4">
                {["Dr. Neha Verma", "Prof. Rohan Mehta", "Mr. Ankit Desai"].map((name, index) => (
                  <div key={name} className="rounded-xl bg-white p-4 shadow-[0_12px_30px_rgba(23,51,120,0.1)]">
                    <p className="text-sm font-black">{name}</p>
                    <p className="mt-1 text-sm font-black text-orange-400">**** <span className="text-[#071647]">{index === 0 ? "4.8" : index === 1 ? "4.6" : "4.7"}</span></p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="mx-auto grid h-36 w-36 place-items-center rounded-full border-[10px] border-[#0f8197] bg-white text-3xl font-black text-[#0f8197]">4.7/5</div>
              <p className="mt-4 font-black">Overall Score</p>
              <p className="mt-2 inline-flex rounded bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-700">VERIFIED</p>
            </div>
          </div>
        </section>

        <section className="px-4 pb-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="heading-section text-center">Your journey from learning to getting hired</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {journey.map(([icon, title, copy]) => (
                <div key={title} className="text-center">
                  <CircleIcon label={icon} className="mx-auto bg-emerald-50 text-emerald-700" />
                  <h3 className="mt-3 font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1 text-sm leading-[1.6] text-[#33415f]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-8" id="for-recruiters">
          <div className="mx-auto max-w-7xl">
            <h2 className="heading-section text-center">Loved by learners, teachers and recruiters</h2>
            <div className="mt-7 grid gap-6 lg:grid-cols-3">
              {testimonials.map(([name, role, quote, image]) => (
                <article key={name} className="rounded-2xl bg-[linear-gradient(120deg,#edf8ff,#f7f2ff)] p-6 shadow-sm">
                  <p className="text-4xl font-black leading-none text-[#2454f4]/45">"</p>
                  <p className="text-[0.9375rem] leading-[1.65] text-[#243154]">{quote}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <img className="h-12 w-12 rounded-full object-cover" src={image} alt={name} />
                    <div><p className="text-sm font-semibold text-[#071647]">{name}</p><p className="mt-0.5 text-xs text-[#33415f]">{role}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-0" id="pricing">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-t-2xl bg-[linear-gradient(110deg,#311ee4,#006ff0_48%,#00aab8)] px-8 py-9 text-white md:flex-row">
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left md:gap-8">
              <Logo inverse />
              <h2 className="max-w-xl text-3xl font-bold leading-snug tracking-tight md:text-4xl">Bridge the gap between learning and careers</h2>
            </div>
            <Link to="/auth" className="rounded-xl bg-white px-8 py-4 font-black text-[#2454f4] shadow-[0_16px_34px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5">Join SkillBridge Today -&gt;</Link>
          </div>
        </section>
      </main>

      <footer className="px-4 pb-6">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-b-2xl bg-[#041949] px-8 py-9 text-white md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Logo inverse />
            <p className="mt-4 max-w-xs text-sm leading-[1.7] text-blue-200">Connecting learners, educators, and recruiters to build a skilled workforce for tomorrow.</p>
            <p className="mt-7 text-xs text-blue-300">&copy; 2024 SkillBridge. All rights reserved.</p>
          </div>
          {[
            ["Platform", "Features", "Pricing", "How It Works", "FAQs"],
            ["For Students", "Courses", "Assessments", "Career Resources", "Student Dashboard"],
            ["For Teachers", "Become a Teacher", "Teacher Dashboard", "Resources", "Help Center"],
            ["Company", "About Us", "Careers", "Blog", "Contact Us"]
          ].map(([title, ...links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold tracking-[0.06em] uppercase text-blue-300">{title}</h3>
              <div className="mt-4 space-y-2">
                {links.map((link) => <p key={link} className="text-sm text-blue-200/80 transition hover:text-white cursor-pointer">{link}</p>)}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
