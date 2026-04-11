"use client";

import React, { useState } from "react";
import { Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const CourseCard = ({ course }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <ScrollReveal animationClass="animate-fade-in" options={{ threshold: 0.1 }}>
      <div className="group h-full bg-white dark:bg-[#0a0a0a] rounded-[1.25rem] border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-500/40 flex flex-col relative transform-gpu">
        
        {/* Compact Course Image Area */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-white/5">
          {course?.image && !imgError ? (
            <img 
              src={course.image} 
              alt={course?.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-500 bg-slate-50 dark:bg-white/5 opacity-40">
               <div className="scale-[1.2]">
                 {course?.icon}
               </div>
            </div>
          )}
          
          {/* Minimalist Badge Overlay */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <div className="bg-black/70 dark:bg-[#002147]/90 text-white px-2 py-0.5 rounded-md text-[8px] font-bold tracking-widest backdrop-blur-sm border border-white/10 uppercase">
              {course?.categoryName}
            </div>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-40 pointer-events-none" />
        </div>

        {/* High-Density Content Area */}
        <div className="p-4 flex flex-col flex-1 relative z-10">
          <div className="flex gap-2.5 mb-2">
            <span className="flex items-center gap-1 text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded-md">
              <Clock size={10} /> {course?.duration}
            </span>
            <span className="flex items-center gap-1 text-[9px] font-bold text-slate-500 dark:text-slate-400">
              <Users size={10} /> {course?.enrolled?.toLocaleString()}
            </span>
          </div>
          
          <h4 className="text-[15px] font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-1">
            {course?.title}
          </h4>
          
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug mb-3 flex-1 line-clamp-2 font-medium">
            {course?.desc}
          </p>

          {/* Minimalist Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {course?.tags?.slice(0, 2).map((tag, idx) => (
              <span 
                key={idx} 
                className="px-1.5 py-0.5 bg-slate-100/50 dark:bg-white/5 border border-slate-200/30 dark:border-white/5 rounded text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Compact Action Button */}
          <Link 
            href={`/course/${course?.id}`}
            className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-[10px] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white"
          >
            Detailed View <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default CourseCard;
