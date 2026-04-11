"use client";

import React, { useState } from "react";
import { Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const CourseCard = ({ course }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <ScrollReveal animationClass="animate-fade-in" options={{ threshold: 0.1 }}>
      <div className="group h-full bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-500/50 flex flex-col relative transform-gpu">
        
        {/* Course Image Area */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-white/5">
          {course?.image && !imgError ? (
            <img 
              src={course.image} 
              alt={course?.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-500 bg-slate-50 dark:bg-white/5">
               <div className="scale-[2]">
                 {course?.icon}
               </div>
            </div>
          )}
          
          {/* Category Badge Overlays on Image */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-black/60 dark:bg-[#002147]/80 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wider backdrop-blur-md border border-white/10 uppercase">
              {course?.categoryName}
            </div>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col flex-1 relative z-10">
          <div className="flex gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/5 px-2.5 py-1 rounded-lg">
              <Clock size={12} /> {course?.duration}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <Users size={12} /> {course?.enrolled?.toLocaleString()}+ Enrolled
            </span>
          </div>
          
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-[1.3]">
            {course?.title}
          </h4>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1 font-medium">
            {course?.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {course?.tags?.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-lg text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <Link 
            href={`/course/${course?.id}`}
            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            Enroll Now <ArrowRight size={16} />
          </Link>
        </div>

        {/* Subtle Decorative Gradient */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
      </div>
    </ScrollReveal>
  );
};

export default CourseCard;
