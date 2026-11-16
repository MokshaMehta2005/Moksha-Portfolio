import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Users,
  Trophy,
  Code2,
  Calendar,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Map icon strings to Lucide components
const ICONS = {
  Award: Award,
  Users: Users,
  Trophy: Trophy,
  Code2: Code2,
};

/**
 * AnimatedTimeline Component
 * - Vertical red line draws itself downward smoothly as user scrolls (scrubbed scaleY).
 * - High-tech node dots pop in with back.out bounce containing category icons.
 * - Horizontal connector lines link the center track to each card.
 * - Cards feature glassmorphic depth, diagonal shine sweep, key achievements, and tech pills.
 * - 60fps GPU acceleration: Animates ONLY transform and opacity with force3D: true.
 * - Responsive: Alternates left/right on desktop; aligns on left rail on mobile.
 * - Respects prefers-reduced-motion.
 */
export default function AnimatedTimeline({ experiences }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const line = lineRef.current;
      const items = gsap.utils.toArray(".timeline-item");

      if (prefersReducedMotion) {
        gsap.set(line, { scaleY: 1 });
        gsap.set(".timeline-dot", { scale: 1, opacity: 1 });
        gsap.set(".timeline-card-content", { x: 0, opacity: 1 });
        gsap.set(".timeline-connector", { scaleX: 1 });
        return;
      }

      // 1. Scrubbed vertical red line scaleY downward draw
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 78%",
            scrub: 0.6,
          },
        }
      );

      // 2. Individual Entry Dot Bounce + Connector Beam + Alternating Card Slide-In
      items.forEach((item, idx) => {
        const dot = item.querySelector(".timeline-dot");
        const card = item.querySelector(".timeline-card-content");
        const connector = item.querySelector(".timeline-connector");
        const isEven = idx % 2 === 0;

        // Dot bounce pop-in
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2.2)",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Connector line horizontal wipe-in
        if (connector) {
          gsap.fromTo(
            connector,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.4,
              ease: "power2.out",
              force3D: true,
              scrollTrigger: {
                trigger: item,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Alternating side slide-in (Even: from left (-60px), Odd: from right (+60px))
        // Mobile (<768px): always slides from right (+35px)
        const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
        const fromX = isDesktop ? (isEven ? -60 : 60) : 35;

        gsap.fromTo(
          card,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top 74%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [experiences] }
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-10 px-2 sm:px-4">
      {/* Background Track Line (Subtle grey) */}
      <div
        className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-white/10 rounded-full"
        aria-hidden="true"
      />

      {/* Scrubbed Vertical Red Progress Line */}
      <div
        ref={lineRef}
        className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-[#ff004f] via-[#ff0055] to-[#ff3377] rounded-full origin-top scale-y-0 will-change-transform shadow-[0_0_20px_#ff004f]"
        aria-hidden="true"
      />

      {/* Timeline Entries */}
      <div className="space-y-14 sm:space-y-20">
        {experiences.map((item, idx) => {
          const isEven = idx % 2 === 0;
          const IconComponent = ICONS[item.icon] || Award;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={idx}
              className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Card Container (46% width on desktop, full width on mobile) */}
              <div className="w-full md:w-[46%] pl-16 md:pl-0">
                <div
                  className="timeline-card-content relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#161616] via-[#131313] to-[#0a0a0a] border border-white/10 hover:border-[#ff004f]/60 p-6 sm:p-7 shadow-2xl transition-all duration-400 group will-change-transform"
                  style={{
                    boxShadow: isHovered
                      ? "0 16px 45px rgba(255, 0, 79, 0.22)"
                      : "0 10px 30px rgba(0, 0, 0, 0.7)",
                  }}
                >
                  {/* Diagonal White Shine Sweep on Hover */}
                  <div className="shine-sweep" />

                  {/* Top Bar: Category Pill & Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#ff004f]/15 border border-[#ff004f]/40 text-[#ff004f] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,0,79,0.25)]">
                      <IconComponent size={13} />
                      {item.badge}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/80 text-xs font-mono flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#ff004f]" />
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#ff004f] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {item.organization && (
                    <p className="text-xs font-semibold tracking-wider uppercase text-white/50 mt-1 mb-3">
                      {item.organization}
                    </p>
                  )}

                  {/* Role Overview */}
                  <p className="text-sm sm:text-base text-[#ababab] leading-relaxed font-light mb-4">
                    {item.role}
                  </p>

                  {/* Key Achievements Bullet Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="space-y-2 mb-5 pt-3 border-t border-white/10">
                      {item.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85"
                        >
                          <span className="text-[#ff004f] font-bold text-xs mt-0.5 select-none flex-shrink-0">
                            ✦
                          </span>
                          <span className="leading-normal">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technology & Competency Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#1f1f1f] border border-white/10 text-white/80 group-hover:border-[#ff004f]/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Horizontal Connector Line (Desktop) */}
              <div
                className={`timeline-connector hidden md:block w-[4%] h-[2px] bg-gradient-to-r ${
                  isEven
                    ? "from-[#ff004f] to-transparent origin-left"
                    : "from-transparent to-[#ff004f] origin-right"
                } z-10 will-change-transform`}
                aria-hidden="true"
              />

              {/* Center Dot / Icon Node with Bounce Pop-in */}
              <div className="timeline-dot absolute left-6 md:left-1/2 -translate-x-1/2 top-7 md:top-1/2 md:-translate-y-1/2 z-20 will-change-transform">
                <div className="relative flex items-center justify-center">
                  {/* Glowing Pulse Ring */}
                  <span className="absolute w-12 h-12 rounded-full bg-[#ff004f]/25 animate-ping pointer-events-none" />

                  {/* High-Tech Circular Glass Node */}
                  <div
                    className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#121212] border-2 flex items-center justify-center transition-all duration-300 shadow-[0_0_18px_rgba(255,0,79,0.5)] cursor-pointer"
                    style={{
                      borderColor: isHovered ? "#ffffff" : "#ff004f",
                      transform: isHovered ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    <IconComponent
                      size={18}
                      className={`transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-[#ff004f]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Desktop Empty Spacer (opposite 46% side) */}
              <div className="hidden md:block md:w-[46%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
