"use client";

import React, { useMemo } from "react";
import { Users, Briefcase, GraduationCap } from "lucide-react";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const DIRECTORS = [
  { name: "Athambawa Mohamed Sulfikar", role: "Board Director" },
  { name: "Athambawa Jaleel", role: "Board Director" },
  { name: "Athambawa Jarees", role: "Board Director" },
  { name: "Athambawa Rameez", role: "Board Director" },
  { name: "Athambawa Mohamed Jahan", role: "Board Director" },
  { name: "Athambawa Fathima Inan", role: "Board Director" },
];

const BoardDirectors = () => {
  const directors = useMemo(() => DIRECTORS, []);

  return (
    <section className="bg-slate-50 dark:bg-[#0d0d0d] border-t border-slate-200 dark:border-white/5" aria-labelledby="leadership-heading">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3">
            <ScrollReveal className="lg:sticky lg:top-32">
              <h2 id="leadership-heading" className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white">
                Board Of <br /> Directors.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                Dedicated to driving impactful change through education, humanitarian aid, and community development. Our leadership ensures every initiative aligns with our mission to uplift lives.
              </p>
            </ScrollReveal>
          </div>

          {/* Scrolling Right Column - Directors Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
              {directors.map((director, idx) => (
                <ScrollReveal key={idx} animationClass="animate-fade-in" options={{ threshold: 0.1, delay: idx * 0.1 }}>
                  <div className="flex flex-col group">
                    <div className="w-full aspect-square rounded-[2rem] bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 p-2 mb-6 group-hover:border-[#002147] dark:group-hover:border-blue-500 transition-all duration-500 relative overflow-hidden shadow-sm group-hover:shadow-xl">
                      <div className="w-full h-full rounded-[1.75rem] overflow-hidden bg-slate-50 dark:bg-black relative">
                         <img 
                           src={`https://ui-avatars.com/api/?name=${director.name.replace(/\s+/g, "+")}&background=002147&color=fff&bold=true`} 
                           alt={director.name}
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                         />
                      </div>
                      <div className="absolute top-6 right-6 bg-[#002147] dark:bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Briefcase size={16} />
                      </div>
                    </div>
                    
                    <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#002147] dark:group-hover:text-blue-400 transition-colors">
                      {director.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 group-hover:text-slate-500 transition-colors">
                      <div className="w-4 h-[2px] bg-slate-200 dark:bg-slate-800" />
                      {director.role}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardDirectors;
