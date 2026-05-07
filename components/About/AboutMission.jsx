"use client";

import React from "react";
import { Rocket } from "lucide-react";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const AboutMission = ({ cmsData }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20" aria-labelledby="purpose-heading">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Sticky Left Column */}
        <div className="lg:w-1/3">
          <ScrollReveal className="sticky top-32">
            <h2 id="purpose-heading" className="text-4xl md:text-6xl font-semibold tracking-tight mb-8 leading-[1.1]">
              Our Purpose <br /> & Direction.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
              We are here to help you move from school to a professional IT career with practical skills.
            </p>
          </ScrollReveal>
        </div>

        {/* Scrolling Right Column */}
        <div className="lg:w-2/3 space-y-10">
          <ScrollReveal>
            <div className="bg-[#002147] dark:bg-blue-950/40 text-white rounded-[3rem] p-12 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden group hover:shadow-blue-900/10 transition-shadow duration-500">
              <Rocket className="absolute -right-16 -bottom-16 w-80 h-80 text-white/5 dark:text-blue-500/5 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-1000" />
              <div className="relative z-10">
                <div className="inline-block px-5 py-2 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-normal mb-8">
                  Our Mission
                </div>
                <h3 className="text-3xl md:text-5xl font-semibold leading-tight mb-8 tracking-tight">
                  {cmsData?.mission_title || "To provide practical IT training that helps you get a good job."}
                </h3>
                <p className="text-blue-100/70 text-lg font-normal leading-relaxed">
                  {cmsData?.mission_desc || "We use modern labs and experienced teachers to make sure you are ready for the IT industry in Sri Lanka and abroad."}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-slate-50 dark:bg-[#0d0d0d] rounded-[3rem] p-12 md:p-16 border border-slate-200 dark:border-white/5 shadow-xl group transition-all duration-500 hover:bg-white dark:hover:bg-[#111]">
              <div className="inline-block px-5 py-2 rounded-full bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-normal mb-8">
                Our Vision
              </div>
              <h3 className="text-3xl md:text-5xl font-semibold leading-tight mb-8 tracking-tight text-slate-900 dark:text-white">
                {cmsData?.vision_title || "To be the most trusted place for IT education in Sri Lanka."}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed">
                {cmsData?.vision_desc || "We want to help all students learn the skills needed for high-paying tech careers."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
