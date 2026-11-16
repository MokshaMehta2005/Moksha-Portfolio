import { Heart, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 bg-[#111111] text-[#ababab] font-light text-sm mt-12 border-t border-white/10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff004f]" />
          <p className="font-bold text-white tracking-wider text-base">
            <span className="text-[#ff004f]">M</span>oksha Mehta
          </p>
          <span className="text-xs text-white/40 hidden sm:inline">&bull; Full Stack Developer</span>
        </div>

        {/* Center Credits */}
        <p className="flex items-center justify-center gap-1.5 text-xs text-[#ababab]">
          <span>© 2026 Moksha Mehta. Crafted with</span>
          <Heart size={13} className="text-[#ff004f] fill-[#ff004f] inline-block" />
          <span>&bull; MERN &amp; GSAP</span>
        </p>

        {/* Quick Social & Mail Links */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <a
            href="mailto:mokshamehta71076@gmail.com"
            className="text-white/70 hover:text-[#ff004f] transition-colors flex items-center gap-1"
            title="Email Moksha"
          >
            <Mail size={14} />
            <span className="hidden sm:inline">mokshamehta71076@gmail.com</span>
          </a>
          <a
            href="https://github.com/mokshamehta06"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-[#ff004f] transition-colors"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/moksha-mehta-9b55262b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-[#ff004f] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
