"use client";

import React, { useMemo } from "react";
import { BookOpen, Droplets, Zap, Baby, ArrowRight, Target } from "lucide-react";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const MISSION_PILLARS = [
  {
    title: "Educational Support",
    icon: BookOpen,
    desc: "Providing scholarships, free learning resources, and skill development programs for underprivileged students.",
    theme: "dark",
    bgColor: "bg-[#002147] dark:bg-blue-950/40",
    textColor: "text-white",
    pillColor: "bg-blue-500/20 text-blue-300",
    descColor: "text-blue-100/70",
    iconGlow: "text-white/5 dark:text-blue-500/5",
  },
  {
    title: "Community Development",
    icon: Droplets,
    desc: "Initiatives to improve access to clean water, healthcare, and sustainable livelihoods for rural communities.",
    theme: "light",
    bgColor: "bg-slate-50 dark:bg-[#111]",
    textColor: "text-slate-900 dark:text-white",
    pillColor: "bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400",
    descColor: "text-slate-600 dark:text-slate-400",
    iconGlow: "text-slate-900/5 dark:text-white/5",
  },
  {
    title: "Disaster Relief",
    icon: Zap,
    desc: "Providing immediate aid, food, and shelter support to those affected by natural calamities and emergencies.",
    theme: "light",
    bgColor: "bg-slate-50 dark:bg-[#111]",
    textColor: "text-slate-900 dark:text-white",
    pillColor: "bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400",
    descColor: "text-slate-600 dark:text-slate-400",
    iconGlow: "text-slate-900/5 dark:text-white/5",
  },
  {
    title: "Women & Children",
    icon: Baby,
    desc: "Programs aimed at ensuring equal opportunities, safety, and protection for vulnerable women and children.",
    theme: "light",
    bgColor: "bg-slate-50 dark:bg-[#111]",
    textColor: "text-slate-900 dark:text-white",
    pillColor: "bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400",
    descColor: "text-slate-600 dark:text-slate-400",
    iconGlow: "text-slate-900/5 dark:text-white/5",
  },
];

const BoardWhatWeDo = () => {
  const pillars = useMemo(() => MISSION_PILLARS, []);

  return (
    <section className="bg-white dark:bg-[#0a0a0a] relative" aria-labelledby="foundation-purpose-heading">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sticky Left Column - Institute Heading Style */}
          <div className="lg:w-1/3">
            <ScrollReveal className="lg:sticky lg:top-32">
              <h2 id="foundation-purpose-heading" className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white">
                Our Core <br /> Initiatives.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                Our multi-faceted approach ensures that we address the most pressing needs of our community while building a foundation for sustainable growth.
              </p>
            </ScrollReveal>
          </div>

          {/* Scrolling Right Column - Mission Cards Style */}
          <div className="lg:w-2/3 space-y-10">
            {pillars.map((pillar, idx) => (
              <ScrollReveal key={idx}>
                <div className={`${pillar.bgColor} rounded-[3rem] p-12 md:p-16 border border-slate-200/60 dark:border-white/5 shadow-xl group transition-all duration-500 relative overflow-hidden hover:shadow-2xl`}>
                  
                  {/* Background Icon Decoration */}
                  <pillar.icon className={`absolute -right-16 -bottom-16 w-80 h-80 ${pillar.iconGlow} group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-1000`} />
                  
                  <div className="relative z-10">
                    <div className={`inline-block px-5 py-2 rounded-full ${pillar.pillColor} text-[10px] font-bold uppercase tracking-wider mb-8`}>
                      Pillar {idx + 1}
                    </div>
                    
                    <h3 className={`text-3xl md:text-5xl font-bold leading-tight mb-8 tracking-tight ${pillar.textColor}`}>
                      {pillar.title}
                    </h3>
                    
                    <p className={`${pillar.descColor} text-lg font-medium leading-relaxed max-w-xl`}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardWhatWeDo;
