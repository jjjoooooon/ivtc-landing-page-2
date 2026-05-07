"use client";

import React, { useMemo } from "react";
import { Users, Target, Building2, Globe } from "lucide-react";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const AboutStats = ({ cmsData }) => {
  const statsListing = [
    { label: cmsData?.stat_1_label || "Successful Students", val: cmsData?.stat_1_val || "5,000+", icon: Users },
    { label: cmsData?.stat_2_label || "Job Placement", val: cmsData?.stat_2_val || "High Rate", icon: Target },
    { label: cmsData?.stat_3_label || "Industry Partners", val: cmsData?.stat_3_val || "30+", icon: Building2 },
    { label: cmsData?.stat_4_label || "Learning Hub", val: cmsData?.stat_4_val || "Modern", icon: Globe },
  ];

  return (
    <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-12 md:-mt-24 mb-32" aria-label="Campus Statistics">
      <ScrollReveal className="stats-pill bg-white/90 dark:bg-[#111]/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-10 md:p-12 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,33,71,0.15)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 gap-x-8 md:divide-x divide-slate-100 dark:divide-white/5">
          {statsListing.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center space-y-3 md:px-4"
            >
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 text-[#002147] dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
                <stat.icon size={22} className="opacity-80" />
              </div>
              <div className="text-xl md:text-4xl font-medium text-slate-900 dark:text-white">
                {stat.val}
              </div>
              <div className="text-sm  font-medium text-slate-400 dark:text-slate-500 ">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutStats;
