import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = ["For Students", "For Teachers", "For Recruiters", "Pricing"];

const courses = [
  ["</>", "Full Stack Development", "75%", "bg-emerald-500", "w-3/4"],
  ["AI", "Data Science with Python", "60%", "bg-violet-500", "w-3/5"],
  ["UX", "UI/UX Design Fundamentals", "90%", "bg-orange-500", "w-[90%]"]
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
              <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="text-sm font-medium text-slate-600 transition hover:text-[#2454f4]">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="hidden text-sm font-semibold text-slate-600 transition hover:text-[#2454f4] sm:block">
              Login
            </Link>
            <button className="btn-primary" onClick={() => navigate(dashboardPath)}>
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
            <div className="animate-rise pt-6 lg:pt-12">
              <h1 className="heading-display max-w-3xl text-5xl md:text-7xl">
                Learn. <span className="text-[#2454f4]">Get Verified.</span>
                <span className="block text-[#0f8197]">Get Hired.</span>
              </h1>
              <p className="body-lead mt-6 max-w-xl">
                SkillBridge connects students, teachers, and recruiters in one platform, empowering skills, verifying expertise, and unlocking career opportunities.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/auth" className="btn-primary h-14 px-8 text-base">
                  Start Learning &rarr;
                </Link>
                <Link to="/auth" className="btn-secondary h-14 px-8 text-base">
                  Hire Talent
                </Link>
              </div>
            </div>

            <div className="relative grid gap-4 animate-rise-delay lg:min-h-[470px]">
              <div className="panel relative p-5 lg:absolute lg:left-0 lg:top-2 lg:w-[42%] lg:z-10">
                <div className="mb-5 flex items-center justify-between">
                  <strong className="heading-card">My Courses</strong>
                  <span className="text-xs font-bold text-[#2454f4] cursor-pointer hover:underline">View all</span>
                </div>
                <div className="space-y-5">
                  {courses.map(([icon, name, value, color, width]) => (
                    <div key={name} className="grid grid-cols-[44px_1fr_auto] items-center gap-3">
                      <span className={`grid h-11 w-11 place-items-center rounded-lg ${color} text-xs font-black text-white shadow-sm`}>{icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#071647]">{name}</p>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color} ${width}`} /></div>
                      </div>
                      <span className="text-xs font-bold text-slate-500">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel relative p-5 lg:absolute lg:right-5 lg:top-8 lg:w-[48%] lg:z-20">
                <div className="mb-5 flex items-center justify-between">
                  <strong className="heading-card">Verified Resume</strong>
                  <span className="rounded bg-emerald-100 px-2 py-1 text-[10px] font-black tracking-wider text-emerald-700">VERIFIED</span>
                </div>
                <div className="flex gap-4 items-center">
                  <img className="h-16 w-16 rounded-full border border-slate-100 object-cover shadow-sm" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80" alt="Arjun Sharma" />
                  <div>
                    <p className="font-bold text-[#071647]">Arjun Sharma</p>
                    <p className="text-sm text-slate-500">Full Stack Developer</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["JavaScript", "React", "Node.js", "MongoDB", "HTML"].map((skill) => (
                    <span key={skill} className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">{skill}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-500">Overall Rating</span>
                  <span className="text-orange-400 tracking-widest text-lg leading-none">★★★★★</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">4.7</span>
                </div>
              </div>

              <div className="panel relative p-5 lg:absolute lg:bottom-16 lg:left-8 lg:w-[46%] lg:z-30">
                <div className="flex items-center justify-between">
                  <strong className="heading-card">Teacher Ratings</strong>
                  <span className="text-xs font-bold text-[#2454f4] cursor-pointer hover:underline">View</span>
                </div>
                <div className="mt-3 flex items-end gap-3">
                  <p className="text-3xl font-black text-[#071647]">4.7</p>
                  <p className="mb-1 text-sm font-medium text-slate-500">out of 5</p>
                </div>
                <div className="mt-4 flex -space-x-3">
                  {testimonials.map(([name, , , image]) => (
                    <img key={name} className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm" src={image} alt={name} />
                  ))}
                  <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-slate-50 text-xs font-bold text-slate-600 shadow-sm">+9</span>
                </div>
              </div>

              <div className="panel relative p-5 lg:absolute lg:bottom-4 lg:right-0 lg:w-[45%] lg:z-10">
                <strong className="heading-card">Shortlisting</strong>
                <div className="mt-4 space-y-3">
                  {["TechNova", "ByteWorks", "InnovateX"].map((company, index) => (
                    <div key={company} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[#071647]">{company}</span>
                      <span className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${index === 2 ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}>{index === 2 ? "Reviewing" : "Shortlisted"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-12 px-4">
          <div className="panel mx-auto grid max-w-7xl gap-6 p-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["🎓", "10,000+", "Students Learning"],
              ["👨‍🏫", "500+", "Expert Teachers"],
              ["🏢", "120+", "Hiring Partners"],
              ["⭐", "95%", "Placement Rate"]
            ].map(([icon, value, label], index) => (
              <div key={label} className={`flex items-center gap-4 ${index ? "lg:border-l lg:border-slate-100 lg:pl-6" : ""}`}>
                <CircleIcon label={icon} className="bg-blue-50/50 text-xl" />
                <div>
                  <p className="text-2xl font-black text-[#071647]">{value}</p>
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-20 lg:py-28" id="for-students">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <span className="eyebrow mb-3 block">Ecosystem</span>
              <h2 className="heading-section">Built for every role in the ecosystem</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {roles.map((role) => (
                <article key={role.title} className={`group grid grid-cols-[110px_1fr] items-end gap-5 overflow-hidden rounded-2xl border border-blue-50 bg-gradient-to-br ${role.tint} p-6 shadow-[0_8px_30px_rgba(23,51,120,0.04)] transition hover:shadow-[0_16px_40px_rgba(23,51,120,0.08)]`}>
                  <img className="h-44 w-full self-end rounded-xl object-cover object-top shadow-sm transition duration-500 group-hover:-translate-y-1" src={role.image} alt={role.title} />
                  <div className="py-2">
                    <h3 className="heading-card text-[#2454f4]">{role.title}</h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#2454f4]/40" />
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/auth" className="mt-6 inline-flex items-center text-sm font-semibold text-[#2454f4] hover:underline">
                      Explore {role.title} &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 bg-slate-50/50" id="for-teachers">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.8fr_1fr_0.4fr]">
            <div>
              <span className="eyebrow mb-3 block">Quality Assurance</span>
              <h2 className="heading-section">Verified. Rated. Trusted.</h2>
              <p className="body-lead mt-5">
                Every resume is reviewed by multiple expert teachers to ensure authenticity, accuracy, and real skills validation.
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-full border border-emerald-100 bg-emerald-50/50 px-5 py-2.5 w-fit">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white text-xs font-bold">✓</span>
                <span className="text-sm font-bold text-emerald-800">Verified by SkillBridge</span>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
              <div className="panel p-6 shadow-[0_16px_40px_rgba(23,51,120,0.08)]">
                <div className="flex items-center gap-4">
                  <img className="h-12 w-12 rounded-full object-cover shadow-sm" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80" alt="Arjun Sharma" />
                  <div>
                    <p className="font-bold text-[#071647]">Arjun Sharma</p>
                    <p className="text-xs font-medium text-slate-500">Full Stack Developer</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["JavaScript", "React", "Node.js"].map((skill) => (
                    <span key={skill} className="rounded bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">{skill}</span>
                  ))}
                </div>
                <div className="mt-6 space-y-2.5">
                  <div className="h-1.5 w-full rounded-full bg-slate-100" />
                  <div className="h-1.5 w-4/5 rounded-full bg-slate-100" />
                </div>
              </div>
              
              <div className="space-y-4">
                {["Dr. Neha Verma", "Prof. Rohan Mehta", "Mr. Ankit Desai"].map((name, index) => (
                  <div key={name} className="panel flex items-center justify-between p-4 shadow-sm transition hover:shadow-md">
                    <div>
                      <p className="text-sm font-bold text-[#071647]">{name}</p>
                      <p className="text-xs text-slate-500">Verified Evaluator</p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded bg-orange-50 px-2 py-1">
                      <span className="text-xs text-orange-400">★</span>
                      <span className="text-xs font-bold text-orange-700">{index === 0 ? "4.8" : index === 1 ? "4.6" : "4.7"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center panel p-8 shadow-sm">
              <div className="relative grid h-32 w-32 place-items-center rounded-full border-8 border-emerald-50 bg-white">
                <svg className="absolute inset-0 h-full w-full -rotate-90 text-emerald-400" viewBox="0 0 36 36">
                  <path strokeDasharray="94, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="text-center">
                  <span className="block text-2xl font-black text-[#071647]">4.7</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Out of 5</span>
                </div>
              </div>
              <p className="mt-6 text-sm font-bold text-[#071647]">Overall Score</p>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 lg:py-28" id="for-recruiters">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <span className="eyebrow mb-3 block">Success Stories</span>
              <h2 className="heading-section">Loved by the community</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map(([name, role, quote, image]) => (
                <article key={name} className="panel flex flex-col justify-between p-8 shadow-sm transition hover:shadow-md">
                  <div>
                    <span className="text-4xl text-blue-200 leading-none block mb-4">"</span>
                    <p className="text-slate-600 leading-relaxed text-sm">{quote}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-4 pt-6 border-t border-slate-50">
                    <img className="h-12 w-12 rounded-full object-cover shadow-sm" src={image} alt={name} />
                    <div>
                      <p className="text-sm font-bold text-[#071647]">{name}</p>
                      <p className="text-xs font-medium text-slate-500">{role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-0" id="pricing">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-t-3xl bg-[linear-gradient(110deg,#123bd6,#0f8197)] px-8 py-12 text-white md:flex-row md:px-16 md:py-16">
            <div className="flex flex-col items-center gap-6 text-center sm:text-left md:items-start md:gap-8">
              <Logo inverse />
              <h2 className="heading-section text-white max-w-xl">
                Ready to bridge the gap between learning and careers?
              </h2>
            </div>
            <div className="shrink-0">
              <Link to="/auth" className="inline-flex h-14 items-center justify-center rounded-lg bg-white px-8 text-base font-bold text-[#123bd6] shadow-[0_16px_34px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
                Join SkillBridge Today
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 pb-6">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-b-3xl bg-[#071647] px-8 py-12 text-white md:grid-cols-[1.5fr_repeat(4,1fr)] md:px-16">
          <div className="pr-8">
            <Logo inverse />
            <p className="mt-6 text-sm leading-relaxed text-blue-200/80">
              Connecting learners, educators, and recruiters to build a verified, skilled workforce for tomorrow.
            </p>
            <p className="mt-8 text-xs font-medium text-blue-400/60">&copy; 2024 SkillBridge. All rights reserved.</p>
          </div>
          {[
            ["Platform", "Features", "Pricing", "How It Works", "FAQs"],
            ["For Students", "Courses", "Assessments", "Career Resources", "Student Dashboard"],
            ["For Teachers", "Become a Teacher", "Teacher Dashboard", "Resources", "Help Center"],
            ["Company", "About Us", "Careers", "Blog", "Contact Us"]
          ].map(([title, ...links]) => (
            <div key={title}>
              <h3 className="eyebrow mb-5 text-white/90">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm font-medium text-blue-200/60 transition hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
