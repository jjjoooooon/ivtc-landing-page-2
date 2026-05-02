"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start the fade-out transition
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000); // Adjust duration as needed

    // Completely remove from DOM after the CSS transition completes
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2700); // 2000ms delay + 700ms CSS transition duration

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Once loading is fully complete, return null so it doesn't block UI clicks
  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      <div className="relative flex flex-col items-center">
        {/* --- Interactive Rings Container --- */}
        <div className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#002147] opacity-20 animate-[spin_3s_linear_infinite]"></div>

          {/* Middle Ring */}
          <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-blue-600 opacity-40 animate-reverse-spin"></div>

          {/* Inner Glowing Ring */}
          <div className="absolute inset-4 rounded-full border border-blue-400/20 shadow-[0_0_15px_rgba(37,99,235,0.15)] animate-spin-slow"></div>

          {/* Logo with Smooth Breathing Effect */}
          <div className="relative z-10 animate-gentle-pulse">
            <Image
              src="/ivtc_campus_logo.png"
              alt="IVTC Campus Logo"
              width={120}
              height={120}
              className="object-contain drop-shadow-sm"
              priority
            />
          </div>
        </div>

        {/* --- Sleek Shimmer Loading Bar --- */}
        <div className="mt-12 w-56 h-[3px] bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-600 to-transparent animate-shimmer-bar"></div>
        </div>

        {/* --- Typography --- */}
        <p className="mt-6 text-[10px] md:text-xs font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase text-[#002147] opacity-80 animate-fade-text">
          Empowering Your Digital Future
        </p>
      </div>

      {/* Standard Style Tag (Safe for Next.js) */}
      <style>{`
        @keyframes reverse-spin {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-reverse-spin {
          animation: reverse-spin 2.5s linear infinite;
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.03); opacity: 0.85; }
        }
        .animate-gentle-pulse {
          animation: gentle-pulse 3s ease-in-out infinite;
        }

        @keyframes shimmer-bar {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        .animate-shimmer-bar {
          animation: shimmer-bar 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes fade-text {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-fade-text {
          animation: fade-text 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;