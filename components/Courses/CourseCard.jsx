"use client";

import React, { useState } from "react";
import { Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const CourseCard = ({ course }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <ScrollReveal animationClass="animate-fade-in" options={{ threshold: 0.1 }}>
      <div className="group h-full bg-white dark:bg-[#0a0a0a] rounded-[1.5rem] border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-500/50 flex flex-col relative transform-gpu">
        
        {/* Course Image Area - Compact Aspect Ratio */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/5">
          {course?.image && !imgError ? (
            <img 
              src={course.image} 
              alt={course?.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-500 bg-slate-50 dark:bg-white/5">
              <div className="scale-[1.5]">
                {course?.icon || <Users size={24} />}
              </div>
            </div>
          )}
          
          {/* Category Badge - More Compact */}
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-black/60 dark:bg-[#002147]/90 text-white px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider backdrop-blur-md border border-white/10 uppercase">
              {course?.categoryName}
            </div>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Content Area - Denser Padding */}
        <div className="p-5 flex flex-col flex-1 relative z-10">
          <div className="flex gap-3 mb-3">
            <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
              <Clock size={10} /> {course?.duration}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400">
              <Users size={10} /> {course?.enrolled?.toLocaleString()}
            </span>
          </div>
          
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {course?.title}
          </h4>
          
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
            {course?.desc}
          </p>

          {/* Tags - Smaller Chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {course?.tags?.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx} 
                className="px-2 py-0.5 bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-md text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button - Compact Height */}
          <Link 
            href={`/course/${course?.id}`}
            className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white active:scale-95"
          >
            Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default CourseCard;
