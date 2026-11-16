import { useRef, useState } from "react";
import { Sparkles, Trophy, Award, Users, Code2, Layers } from "lucide-react";
import AnimatedTimeline from "./AnimatedTimeline";

const EXPERIENCES = [
  {
    title: "Technical Head – Spectra",
    organization: "Spectra Techfest",
    role: "Spearheaded end-to-end technical operations for the collegiate flagship technical festival, mentoring technical coordinators and supervising developer infrastructure.",
    period: "2024 – 2025",
    badge: "Leadership & Fest",
    category: "leadership",
    icon: "Award",
    highlights: [
      "Led and orchestrated digital logistics and event portals for 1,500+ participants across 12+ tech tracks.",
      "Mentored a team of 15+ student coordinators across multi-track event execution and technical support.",
      "Designed real-time event communication pipelines and automated attendee verification workflows.",
    ],
    tags: ["Leadership", "Operations", "Event Architecture", "Project Management", "Team Mentorship"],
  },
  {
    title: "ACROSET 2025 Volunteer",
    organization: "ACROSET Flagship Festival",
    role: "Actively contributed to tech event execution, technology support, and seamless audience coordination for the annual cultural and technical flagship festival.",
    period: "2025",
    badge: "Volunteer & Ops",
    category: "volunteering",
    icon: "Users",
    highlights: [
      "Assisted in stage technical management, audio-visual technology setup, and session pacing.",
      "Facilitated campus logistics and coordinated directly with department faculties and guest speakers.",
      "Resolved live technical snags and audio-visual transitions under rapid timeline pressures.",
    ],
    tags: ["Event Logistics", "Tech Support", "Coordination", "Public Relations"],
  },
  {
    title: "Hackathon Competitions & Rapid Prototyping",
    organization: "National & Collegiate Hackathons",
    role: "Designed, coded, and pitched full-stack web and AI applications under tight time constraints, tackling real-world civic, automation, and web intelligence challenges.",
    period: "2024 – Present",
    badge: "Competitive Dev",
    category: "hackathons",
    icon: "Trophy",
    highlights: [
      "Engineered 3+ full-stack prototypes within rigorous 24h to 36h sprint deadlines.",
      "Architected transactional database schemas, JWT auth models, and responsive React UIs under pressure.",
      "Integrated Gemini AI APIs and vector embeddings to deliver intelligent AI-assisted workflows.",
    ],
    tags: ["MERN Stack", "Gemini AI", "Rapid Prototyping", "REST APIs", "System Architecture"],
  },
  {
    title: "Full Stack & AI Development Journey",
    organization: "Independent Software Engineering",
    role: "Engineered scalable MERN applications, designed transactional backend schemas, experimented with MCP server integrations, and practiced DSA.",
    period: "2023 – Present",
    badge: "Engineering",
    category: "engineering",
    icon: "Code2",
    highlights: [
      "Built full-stack platforms including CineBook (movie ticketing system with seat locking & concurrency handling).",
      "Specialized in RESTful APIs, Node.js/Express middlewares, MongoDB indexing, and Tailwind CSS.",
      "Consistent problem-solver practicing Data Structures & Algorithms on LeetCode.",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Data Structures", "Tailwind CSS"],
  },
];

const CATEGORIES = [
  { label: "All Milestones", value: "all" },
  { label: "Leadership & Fest", value: "leadership" },
  { label: "Hackathons & Dev", value: "dev" },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredExperiences = EXPERIENCES.filter((item) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "leadership") {
      return item.category === "leadership" || item.category === "volunteering";
    }
    if (selectedCategory === "dev") {
      return item.category === "hackathons" || item.category === "engineering";
    }
    return true;
  });

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="bg-glow-orb top-[-100px] right-[-120px] opacity-25 pointer-events-none" />
      <div className="bg-glow-orb bottom-[-100px] left-[-120px] opacity-20 pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff004f]/15 border border-[#ff004f]/40 text-[#ff004f] text-xs font-bold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(255,0,79,0.25)]">
              <Sparkles size={13} />
              Journey &amp; Involvement
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Experience &amp; <span className="text-[#ff004f] glow-pink">Leadership</span>
            </h2>
            <div className="w-24 h-1 bg-[#ff004f] mt-4 rounded-full" />
          </div>

          {/* Quick Metrics Strip */}
          <div className="flex items-center gap-4 sm:gap-6 bg-[#141414] border border-white/10 rounded-2xl p-3 sm:p-4 shadow-xl">
            <div className="text-center px-2">
              <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                {EXPERIENCES.length}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 font-semibold">
                Milestones
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center px-2">
              <span className="block text-2xl sm:text-3xl font-black text-[#ff004f] font-mono">
                15+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 font-semibold">
                Mentees
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center px-2">
              <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                1.5K+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 font-semibold">
                Attendees
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center md:justify-start gap-2.5 mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#ff004f] text-white shadow-[0_0_18px_rgba(255,0,79,0.45)] scale-105"
                    : "bg-[#161616] border border-white/10 text-white/70 hover:text-white hover:border-white/25"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Scrubbed Animated Timeline */}
        <AnimatedTimeline experiences={filteredExperiences} />
      </div>
    </section>
  );
}
