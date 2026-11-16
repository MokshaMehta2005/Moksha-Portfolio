import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Calendar, ShieldCheck, Sparkles, Eye, CheckCircle2 } from "lucide-react";
import { CERTIFICATES } from "../data/certificates";
import CertificateLightbox from "./CertificateLightbox";
import CertificateFallback from "./CertificateFallback";

gsap.registerPlugin(ScrollTrigger);

/**
 * Certifications Component
 * - Clean, elegant list & grid presentation of verified academic and technical certifications.
 * - Staggered 60fps GPU entrance animation using GSAP ScrollTrigger (y: 40, opacity: 0).
 * - High-contrast red (#ff004f) and white/black card styling matching the portfolio aesthetic.
 * - Displays preview image, issuer badge, year, optional score (hidden if empty), description, and skill chips.
 * - Clicking any card opens the focused Lightbox modal with zero external links.
 * - Fully responsive (1 col on mobile, 2 col on tablet, 3 col on desktop) and accessible.
 */
export default function Certifications({ certificates = CERTIFICATES || [] }) {
  const sectionRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  const certsList = certificates || [];

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  // 60fps Scroll Reveal Animation
  useGSAP(
    () => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      const cards = gsap.utils.toArray(".cert-card");
      if (cards.length === 0) return;

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [certsList] }
  );

  return (
    <section id="certifications" ref={sectionRef} className="py-24 bg-[#080808] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="bg-glow-orb top-[-100px] left-[-120px] opacity-25 pointer-events-none" />
      <div className="bg-glow-orb bottom-[-100px] right-[-120px] opacity-20 pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff004f]/15 border border-[#ff004f]/40 text-[#ff004f] text-xs font-bold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(255,0,79,0.25)]">
              <Sparkles size={13} />
              Verified Credentials
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Academic &amp; Professional <span className="text-[#ff004f] glow-pink">Certifications</span>
            </h2>
            <div className="w-24 h-1 bg-[#ff004f] mt-4 rounded-full" />
          </div>

          <p className="text-xs text-[#ababab] uppercase tracking-widest font-mono">
            NPTEL &bull; ADDA &bull; Academic Honors
          </p>
        </div>

        {/* Certifications Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certsList.map((cert) => {
            const hasFailed = failedImages[cert.id];

            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="cert-card bg-gradient-to-br from-[#161616] via-[#131313] to-[#0a0a0a] border border-white/10 hover:border-[#ff004f]/70 rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-2xl group cursor-pointer relative will-change-transform"
                style={{
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
                }}
                role="button"
                tabIndex={0}
                aria-label={`View certificate for ${cert.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCert(cert);
                  }
                }}
              >
                {/* Diagonal White Sweep Shine */}
                <div className="shine-sweep" />

                <div>
                  {/* Certificate Image Frame */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#0d0d0d] mb-5 border border-white/5">
                    {!hasFailed ? (
                      <img
                        src={cert.image}
                        alt={`${cert.title} Certificate`}
                        loading="lazy"
                        onError={() => handleImageError(cert.id)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <CertificateFallback cert={cert} />
                    )}

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-[#ff004f] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye size={15} />
                        Inspect Credential
                      </span>
                    </div>
                  </div>

                  {/* Badges Strip */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {/* Issuer Pill */}
                    <span className="px-3 py-1 rounded-full bg-[#ff004f] text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(255,0,79,0.3)] flex items-center gap-1.5">
                      <Award size={13} />
                      {cert.issuer}
                    </span>

                    {/* Year */}
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-white/80 text-xs font-mono flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#ff004f]" />
                      {cert.year}
                    </span>

                    {/* Score (Hidden if empty or omitted) */}
                    {cert.score && (
                      <span className="px-2.5 py-1 rounded-full bg-[#ff004f]/15 border border-[#ff004f] text-[#ff004f] text-xs font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,0,79,0.2)]">
                        <ShieldCheck size={12} />
                        {cert.score}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ff004f] transition-colors mb-2 leading-snug">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#ababab] font-light leading-relaxed mb-4 line-clamp-3">
                    {cert.description}
                  </p>
                </div>

                {/* Bottom Section: Skills & Action */}
                <div>
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 mb-4">
                      {cert.skills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#1f1f1f] border border-white/10 text-white/70 group-hover:border-[#ff004f]/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 4 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 text-white/40 self-center">
                          +{cert.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* View Action Pill */}
                  <div className="w-full py-2.5 rounded-xl bg-white/5 group-hover:bg-[#ff004f] border border-white/10 group-hover:border-[#ff004f] text-white/80 group-hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-sm">
                    <Eye size={14} />
                    <span>View Credential</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Certificate Lightbox (No external links) */}
      <CertificateLightbox
        cert={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
