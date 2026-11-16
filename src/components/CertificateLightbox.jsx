import React, { useEffect, useRef, useState } from "react";
import { X, Award, Shield, Calendar } from "lucide-react";
import { gsap } from "gsap";
import CertificateFallback from "./CertificateFallback";

/**
 * CertificateLightbox Component
 * - Full-screen modal with dark blurred overlay.
 * - Scales up smoothly from center with GSAP GPU transforms.
 * - Traps focus, handles Escape key, and restores focus upon exit.
 * - Displays certificate preview, issuer, title, year, optional score, and skills.
 * - Strictly NO external links.
 */
export default function CertificateLightbox({ cert, isOpen, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  // Reset image error state when cert changes
  useEffect(() => {
    setImageError(false);
  }, [cert]);

  // Focus trap & keyboard listeners
  useEffect(() => {
    if (!isOpen || !cert) return;

    previousFocusRef.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Entrance Animation
    if (overlayRef.current && modalRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.88, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }

    // Focus close button initially
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "Tab") {
        // Focus trap
        if (!modalRef.current) return;
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, cert]);

  const handleClose = () => {
    if (overlayRef.current && modalRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(modalRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 15,
        duration: 0.25,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  if (!isOpen || !cert) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-[#121212] border border-[#ff004f]/40 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          aria-label="Close certificate lightbox"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#ff004f] hover:border-[#ff004f] flex items-center justify-center transition-colors shadow-lg"
        >
          <X size={20} />
        </button>

        {/* Left Column: Certificate Visual Preview */}
        <div className="w-full md:w-1/2 bg-[#0a0a0a] p-4 sm:p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
          <div className="w-full max-w-[420px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl relative">
            {!imageError ? (
              <img
                src={cert.image}
                alt={`${cert.title} Certificate`}
                loading="lazy"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <CertificateFallback cert={cert} />
            )}
          </div>
        </div>

        {/* Right Column: Detailed Credential Info */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#ff004f] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(255,0,79,0.3)]">
                {cert.issuer}
              </span>

              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold flex items-center gap-1.5">
                <Calendar size={13} className="text-[#ff004f]" />
                {cert.year}
              </span>

              {/* Show score ONLY if provided and non-empty */}
              {cert.score && (
                <span className="px-3 py-1 rounded-full bg-[#ff004f]/20 border border-[#ff004f] text-[#ff004f] text-xs font-bold flex items-center gap-1.5">
                  <Award size={13} />
                  {cert.score}
                </span>
              )}
            </div>

            {/* Certificate Title */}
            <h3
              id="cert-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3"
            >
              {cert.title}
            </h3>

            {/* Course Description */}
            <p className="text-[#ababab] text-sm leading-relaxed mb-6 font-light">
              {cert.description}
            </p>

            {/* Verified Skills / Topics */}
            {cert.skills && cert.skills.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">
                  Competencies &amp; Topics
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#1c1c1c] border border-white/10 text-xs text-white/90 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Verification Footnote */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span className="flex items-center gap-1.5 text-white/80">
              <Shield size={14} className="text-[#ff004f]" />
              Verified Academic Credential
            </span>
            <span className="font-mono text-[11px] text-[#ff004f]">Moksha Mehta</span>
          </div>
        </div>
      </div>
    </div>
  );
}
