"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";

const VerifyPreloader = ({ isComplete = false, onFadeComplete }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Disable scroll when preloader is active
    document.body.style.overflow = "hidden";
    
    if (isComplete) {
      // Small buffer before starting the exit fade
      const timer = setTimeout(() => {
        setShouldRender(false);
        // Restore scroll after fade animation
        setTimeout(() => {
          document.body.style.overflow = "unset";
          onFadeComplete();
        }, 800); 
      }, 300);
      return () => clearTimeout(timer);
    }

    return () => {
      // Cleanup: always restore scroll on unmount
      document.body.style.overflow = "unset";
    };
  }, [isComplete, onFadeComplete]);

  if (!shouldRender && isComplete) {
    // We return null only after the parent unmounts us via onFadeComplete
    // but the CSS transition handles the visual part
  }

  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] transition-all duration-700 ease-in-out ${
        isComplete ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Soft Backdrop Glow */}
      <div className="absolute inset-0 bg-[#002147]/5 dark:bg-blue-500/5 blur-[120px] animate-pulse" />

      <div className="relative flex flex-col items-center justify-center">
        <div className="relative bg-[#002147] p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] text-white shadow-2xl shadow-[#002147]/20 flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
          <ShieldCheck size={40} strokeWidth={1.5} className="sm:size-14 animate-pulse" />
          
          {/* Internal Progress Ring */}
          <div className="absolute inset-2 border-2 border-white/10 rounded-[1.2rem] sm:rounded-[2rem] animate-[spin_10s_linear_infinite]" />
        </div>

        {/* Status Typography */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Loader2 className="animate-spin text-[#002147] dark:text-blue-400" size={14} />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#002147]/40 dark:text-blue-400/40">
              Validating
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
            Secure Certification Portal
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VerifyPreloader;
