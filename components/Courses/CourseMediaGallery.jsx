"use client";

import React, { useState } from "react";
import { PlayCircle, Image as ImageIcon, Maximize2 } from "lucide-react";

export default function CourseMediaGallery({ media = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!media || media.length === 0) {
    return (
      <div className="w-full aspect-video bg-slate-100 dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-inner">
        <ImageIcon className="text-slate-300 dark:text-slate-600 animate-pulse" size={48} />
      </div>
    );
  }

  const activeMedia = media[activeIndex];

  return (
    <div className="space-y-6">
      {/* Main Viewer - Redesigned with premium subtle border and shadow */}
      <div className="relative aspect-video rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-slate-900 group shadow-2xl border border-slate-200/50 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5">
        
        {/* Soft Inner Glow Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none ring-1 ring-inset ring-white/10" />

        <div className="w-full h-full relative transition-all duration-500 ease-in-out">
          {activeMedia.type === "video" ? (
            <iframe
              src={activeMedia.url}
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                key={activeMedia.url}
                src={activeMedia.url}
                alt="Course media"
                className="w-full h-full object-cover opacity-100 transition-all duration-700 ease-out animate-in fade-in zoom-in-95"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          )}
        </div>

        {/* Action Indicators */}
        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="bg-black/50 backdrop-blur-md p-2 rounded-xl border border-white/10 text-white cursor-pointer hover:bg-black/70 transition-colors">
            <Maximize2 size={18} />
          </div>
        </div>
      </div>

      {/* Thumbnail Selector - Redesigned with hidden scrollbar and faded edges */}
      {media.length > 1 && (
        <div className="relative group/thumbs">
          {/* Faded Edges for context */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-slate-50 dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none opacity-0 group-hover/thumbs:opacity-100 transition-opacity" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-slate-50 dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none opacity-0 group-hover/thumbs:opacity-100 transition-opacity" />

          <div className="flex gap-4 overflow-x-auto py-2 px-1 scrollbar-hide snap-x scroll-smooth">
            {media.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-shrink-0 w-24 sm:w-32 aspect-video rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer snap-start border-2 ${
                  activeIndex === idx
                    ? "border-blue-600 scale-105 shadow-lg shadow-blue-500/20"
                    : "border-transparent opacity-60 hover:opacity-100 dark:border-white/5"
                }`}
              >
                {item.type === "video" ? (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50">
                      <PlayCircle size={20} />
                    </div>
                  </div>
                ) : (
                  <img src={item.url} className="w-full h-full object-cover" alt="thumbnail" />
                )}
                
                {/* Active Indicator Overlay */}
                {activeIndex === idx && (
                  <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
