"use client";

import React, { useState } from "react";
import { Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/Animations/ScrollReveal";
import DOMPurify from "isomorphic-dompurify";

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
          
          {/* Minimalist Badge */}
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-black/70 dark:bg-[#002147]/90 text-white px-2.5 py-1 rounded-md text-[9px] font-bold tracking-widest backdrop-blur-sm border border-white/10 uppercase">
              {course?.categoryName}
            </div>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-40 pointer-events-none" />
        </div>

        {/* Content Area - Optimized for Readability */}
        <div className="p-5 flex flex-col flex-1 relative z-10">
          <div className="flex gap-3 mb-2.5">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded-md">
              <Clock size={11} /> {course?.duration}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
              <Users size={11} /> {course?.enrolled?.toLocaleString()}
            </span>
          </div>
          
          <h4 className="text-[17px] font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
            {course?.title}
          </h4>
          
          <div 
            className="text-slate-600 dark:text-slate-400 text-[12px] leading-relaxed mb-4 flex-1 font-medium"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.desc) }}
          />

          {/* Tags - Improved Readability */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {course?.tags?.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx} 
                className="px-2 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-md text-[9px] font-medium text-slate-600 dark:text-slate-400 uppercase tracking-tight"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button - Standard Size */}
          <Link 
            href={`/course/${course?.id}`}
            className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white"
          >
            Course Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default CourseCard;
