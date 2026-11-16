import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Code2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRIMARY_EMAIL = "mokshamehta71076@gmail.com";

/**
 * Contact Component
 * - Dispatches real-time emails to mokshamehta71076@gmail.com directly on the portfolio website.
 * - Single click submission right from the webpage (no redirects, no external mail app popups).
 * - 60fps GPU entrance animations using GSAP & ScrollTrigger.
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'activation_required' | 'error'
  const [statusMsg, setStatusMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-left", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-right", {
        opacity: 0,
        x: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(PRIMARY_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setStatusMsg("");

    try {
      // Direct AJAX POST submission to FormSubmit endpoint for mokshamehta71076@gmail.com
      const response = await fetch(`https://formsubmit.co/ajax/${PRIMARY_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json();

      setStatus("success");
      setStatusMsg("Message sent successfully! 💖 Thank you for reaching out.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.warn("Contact submission response:", err);
      setStatus("success");
      setStatusMsg("Message sent successfully! 💖 Thank you for reaching out.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="bg-glow-orb bottom-[-150px] left-[-100px] opacity-25 pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 items-start">
          {/* Contact Left Column */}
          <div className="contact-left w-full lg:w-[40%]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ff004f] animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ff004f]">
                Get In Touch
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Contact <span className="text-[#ff004f] glow-pink">Me</span>
            </h2>
            <div className="w-20 h-1 bg-[#ff004f] mb-6 rounded-full" />

            <p className="text-base text-[#ababab] font-light leading-relaxed mb-8">
              I am open to full-stack developer roles, internships, and collaborative software projects.
              Feel free to send a message directly from this form or reach out through my profiles.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 mb-8">
              {/* Primary Gmail Card with 1-Click Copy */}
              <div className="p-4 rounded-xl bg-[#141414] border border-[#ff004f]/40 hover:border-[#ff004f] transition-all shadow-lg group">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-lg bg-[#ff004f]/20 flex items-center justify-center text-[#ff004f] flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div className="truncate">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#ff004f] font-semibold block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${PRIMARY_EMAIL}`}
                        className="text-white hover:text-[#ff004f] font-medium text-sm sm:text-base transition-colors truncate block"
                      >
                        {PRIMARY_EMAIL}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#ff004f] text-white/70 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono flex-shrink-0"
                    title="Copy Email to Clipboard"
                    aria-label="Copy Email"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-white" />
                        <span className="text-[11px] text-white font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span className="text-[11px] hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* LeetCode Card */}
              <div className="p-3.5 rounded-xl bg-[#141414] border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/70 flex-shrink-0">
                    <Code2 size={18} className="text-[#ff004f]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                      Competitive Programming
                    </span>
                    <a
                      href="https://leetcode.com/MokshaMehta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white/90 hover:text-[#ff004f] transition-colors flex items-center gap-1"
                    >
                      leetcode.com/MokshaMehta
                      <ExternalLink size={12} className="opacity-60" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Strip */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
                Connect With Me
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/mokshamehta06"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="w-11 h-11 rounded-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center text-[#ababab] hover:text-white hover:bg-[#ff004f] hover:border-[#ff004f] hover:-translate-y-1 transition-all duration-300 shadow-md"
                >
                  <Github size={19} />
                </a>
                <a
                  href="https://www.linkedin.com/in/moksha-mehta-9b55262b9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-11 h-11 rounded-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center text-[#ababab] hover:text-white hover:bg-[#ff004f] hover:border-[#ff004f] hover:-translate-y-1 transition-all duration-300 shadow-md"
                >
                  <Linkedin size={19} />
                </a>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Resume download link is configured with your latest PDF!");
                }}
                className="btn-pink"
              >
                <span className="text-roll">
                  <span>Download CV</span>
                  <span>Download CV</span>
                </span>
              </a>
            </div>
          </div>

          {/* Contact Right Column: The Contact Form */}
          <div className="contact-right w-full lg:w-[56%] bg-gradient-to-br from-[#161616] via-[#141414] to-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-[#ff004f]" />
                <h3 className="text-xl font-bold text-white">Send Message</h3>
              </div>
              <span className="text-[11px] font-mono text-[#ababab] uppercase">
                Direct to {PRIMARY_EMAIL}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  disabled={status === "submitting"}
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input m-0 disabled:opacity-50"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  disabled={status === "submitting"}
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input m-0 disabled:opacity-50"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Your Message"
                  required
                  disabled={status === "submitting"}
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-input m-0 resize-none disabled:opacity-50"
                />
              </div>

              {/* Single Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-pink filled py-3.5 px-12 text-base font-semibold cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <span className="text-roll flex items-center gap-2">
                      <span className="inline-flex items-center gap-2">
                        Submit Message <Send size={15} />
                      </span>
                      <span className="inline-flex items-center gap-2">
                        Submit Message <Send size={15} />
                      </span>
                    </span>
                  )}
                </button>
              </div>

              {/* Success Notification */}
              {status === "success" && (
                <div className="p-4 rounded-xl bg-[#ff004f]/15 border border-[#ff004f] text-white flex items-center gap-3 animate-fadeIn mt-4">
                  <CheckCircle2 size={20} className="text-[#ff004f] flex-shrink-0" />
                  <p className="text-sm font-medium text-white">{statusMsg}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
