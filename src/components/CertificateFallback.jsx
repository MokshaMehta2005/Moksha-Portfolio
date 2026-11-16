import React from "react";
import { Award, ShieldCheck } from "lucide-react";

/**
 * CertificateFallback Component
 * Renders an authentic, high-fidelity digital certificate design.
 * Used when an external image file is loading, missing, or as a visual fallback.
 */
export default function CertificateFallback({ cert, className = "" }) {
  if (!cert) return null;

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0c0c0c] border-2 border-[#ff004f]/40 rounded-xl p-5 sm:p-6 flex flex-col justify-between select-none overflow-hidden text-white shadow-inner ${className}`}
    >
      {/* Subtle Guilloche / Geometric Certificate Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #ff004f 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Decorative Corner Ornaments */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#ff004f]" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#ff004f]" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#ff004f]" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#ff004f]" />

      {/* Header: Issuer & Certificate Badge */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#ff004f]/15 border border-[#ff004f]/40 flex items-center justify-center">
            <Award size={18} className="text-[#ff004f]" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#ababab] block">
              Official Credential
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-white">
              {cert.issuer || "ACADEMIC"}
            </span>
          </div>
        </div>

        {cert.score && (
          <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#ff004f]/20 border border-[#ff004f] text-[#ff004f] uppercase shadow-[0_0_10px_rgba(255,0,79,0.3)]">
            {cert.score}
          </span>
        )}
      </div>

      {/* Center Body: Certification Recipient & Title */}
      <div className="text-center my-auto py-3 relative z-10">
        <p className="text-[11px] uppercase tracking-widest text-white/50 mb-1">
          This is to certify that
        </p>
        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wide mb-1">
          Moksha Mehta
        </h3>
        <p className="text-[11px] text-white/60 mb-2">has successfully completed</p>
        <h4 className="text-base sm:text-lg font-bold text-[#ff004f] uppercase tracking-wider leading-snug">
          {cert.title || "Course Certification"}
        </h4>
      </div>

      {/* Bottom Bar: Year, Verification & Seal */}
      <div className="flex items-end justify-between border-t border-white/10 pt-3 relative z-10">
        <div className="text-left">
          <span className="text-[10px] font-mono text-white/40 uppercase block">Year</span>
          <span className="text-xs font-bold text-white font-mono">{cert.year || "2024"}</span>
        </div>

        {/* Red Wax Seal Emblem */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15">
          <ShieldCheck size={14} className="text-[#ff004f]" />
          <span className="text-[10px] font-semibold tracking-wider text-white/90 uppercase">
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}
