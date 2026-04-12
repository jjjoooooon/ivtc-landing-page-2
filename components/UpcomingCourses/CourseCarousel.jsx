"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ShineBadge from "@/components/ui/ShineBadge";

const CourseCarousel = ({ courses }) => {
  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {courses.map((course, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:pl-6 basis-[80%] sm:basis-[70%] md:basis-1/2 lg:basis-1/4"
            >
              <div className="group h-full bg-white dark:bg-[#0a0a0a] rounded-[2rem] border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#002147]/50 dark:hover:border-blue-500/50 flex flex-col">
                {/* Image Area */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute top-4 left-4 z-10">
                    <ShineBadge className="px-3 py-1.5 text-[11px] font-bold bg-black/60 text-white dark:text-white border-white/20 backdrop-blur-md rounded-xl">
                      {course.category}
                    </ShineBadge>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 flex flex-col flex-1 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    {/* <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 tracking-wide">
                      <Calendar size={14} className="text-[#002147] dark:text-blue-400 opacity-70" />
                      {course.date}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" /> */}
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 tracking-wide">
                      <Clock size={14} className="text-[#002147] dark:text-blue-400 opacity-70" />
                      {course.duration}
                    </div>
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#002147] dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h4>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1 font-medium">
                    {course.desc}
                  </p>

                  <Link
                    href={`/courses/${course.categorySlug}/${course.slug}`}
                    className="inline-flex items-center justify-center w-full py-3.5 bg-[#002147] hover:bg-blue-900 dark:bg-white dark:text-black dark:hover:bg-slate-200 text-white rounded-[1.25rem] text-sm transition-all group/btn font-bold shadow-md shadow-blue-900/10 hover:shadow-lg focus:scale-95"
                  >
                    View Details
                    <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Navigation */}
        <div className="hidden lg:flex justify-end gap-3 mt-12">
          <CarouselPrevious className="static translate-y-0 h-12 w-12 border-slate-200 dark:border-white/10 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10" />
          <CarouselNext className="static translate-y-0 h-12 w-12 border-slate-200 dark:border-white/10 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10" />
        </div>
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
