"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CourseGrid = ({ pathways }) => {
  return (
    <div className="pathway-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {pathways.map((item, i) => (
        <Link
          key={i}
          href={`/courses?category=${item.slug || 'all'}`}
          className="pathway-card group relative h-[400px] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-8 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#002147]/30 dark:hover:border-blue-400/30 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none"
        >
          <div className="relative z-10">
            <div className="icon-wrapper w-14 h-14 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#002147] dark:text-blue-400 mb-8 transition-all duration-300 group-hover:bg-[#002147] group-hover:text-white dark:group-hover:bg-blue-400 dark:group-hover:text-[#002147]">
              {item.icon}
            </div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#002147] dark:group-hover:text-blue-400 transition-colors duration-300">
              {item.title}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-slate-900 dark:text-white text-xs font-bold flex items-center gap-2 group-hover:gap-3 transition-all duration-300 uppercase">
              See All Courses{" "}
              <ArrowRight size={14} className="text-[#002147] dark:text-blue-400" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CourseGrid;
