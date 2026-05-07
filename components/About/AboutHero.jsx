"use client";

import React, { useMemo } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShineBadge from "@/components/ui/ShineBadge";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const AboutHero = ({ cmsData }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 lg:pt-50 pt-36 pb-32" aria-labelledby="about-hero-title">
      <ScrollReveal className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* <div>
          <ShineBadge className="mb-8">
            <Sparkles
              size={16}
              className="text-[#002147] dark:text-blue-400"
            />
            Sri Lanka's Leading Tech Campus
          </ShineBadge>
        </div> */}

        <h1
          id="about-hero-title"
          className="text-[2.8rem] sm:text-6xl md:text-8xl lg:text-7xl font-bold leading-[1]  mb-6 tracking-tight overflow-hidden"
        >
          <div className="pb-2">
            {cmsData?.hero_title?.split(" ").slice(0, 3).join(" ") || "Empower Your Future"}
          </div>
          <div className="text-transparent bg-clip-text bg-linear-to-r from-[#002147] via-blue-700 to-blue-900 dark:from-white dark:via-blue-200 dark:to-blue-400 pb-2">
            {cmsData?.hero_title?.split(" ").slice(3).join(" ") || "From A/Ls to Beyond."}
          </div>
        </h1>

        <p className="text-md md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium leading-relaxed mb-10">
          {cmsData?.hero_subtitle || "Providing expert A/L ICT classes in Sri Lanka, specialized After A/L diploma programs, and dedicated pathways to help you achieve your Degree and Post-Graduate dreams."}
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Button className="h-14 px-12! rounded-full bg-[#002147] text-white hover:bg-blue-900 dark:bg-white dark:text-black dark:hover:bg-slate-200 font-semibold text-lg shadow-2xl shadow-[#002147]/20 transition-all hover:scale-105 active:scale-95">
            Explore Programs
          </Button>
          <Button
            variant="outline"
            className="h-14 px-12! rounded-full border-2 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 font-semibold text-lg transition-all"
          >
            Meet Our Faculty
          </Button>
        </div> */}
      </ScrollReveal>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-300 dark:text-slate-700 hidden md:block"
        aria-hidden="true"
      >
        <ChevronDown size={40} />
      </div>
    </section>
  );
};

export default AboutHero;
