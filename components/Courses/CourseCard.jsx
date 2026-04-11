"use client";

import React, { useState } from "react";
import { Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const CourseCard = ({ course }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <ScrollReveal animationClass="animate-fade-in" options={{ threshold: 0.1 }}>
      <div className="group relative bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 flex flex-col h-full transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Header: Icon & Category */}
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-blue-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
            {course?.image && !imgError ? (
              <img 
                src={course.image} 
                alt={course?.title} 
                className="w-full h-full object-cover" 
                onError={() => setImgError(true)}
              />
            ) : (
              course?.icon
            )}
          </div>
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide">
            {course?.categoryName}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative z-10">
          <div className="flex gap-3 mb-6">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 dark:bg-blue-500/5 rounded-xl text-[11px] font-bold text-blue-600 dark:text-blue-400">
              <Clock size={12} /> {course?.duration}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-400">
              <Users size={12} /> {course?.enrolled?.toLocaleString()}+ Enrolled
            </span>
          </div>
          
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-500 transition-colors">
            {course?.title}
          </h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
            {course?.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {course?.tags?.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
        <Link 
          href={`/course/${course?.id}`}
          className="relative z-10 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white group-hover:shadow-lg hover:scale-[1.02] active:scale-95"
        >
          Enroll Now <ArrowRight size={16} />
        </Link>

        {/* Background Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-transparent to-blue-500/0 group-hover:to-blue-500/5 transition-all duration-700 rounded-[2.5rem] pointer-events-none" />
      </div>
    </ScrollReveal>
  );
};

export default CourseCard;
