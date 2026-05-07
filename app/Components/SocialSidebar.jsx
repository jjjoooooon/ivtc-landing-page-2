"use client";

import React from "react";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const SocialSidebar = ({ cmsData }) => {
  const SOCIAL_LINKS = [
    { 
      id: "fb",
      icon: Facebook, 
      url: cmsData?.fb_url || "https://facebook.com/ivtc.campus", 
      label: "Facebook",
      active: cmsData?.fb_active === "true"
    },
    { 
      id: "inst",
      icon: Instagram, 
      url: cmsData?.ig_url || "https://instagram.com/ivtc.campus", 
      label: "Instagram",
      active: cmsData?.ig_active === "true"
    },
    { 
      id: "li",
      icon: Linkedin, 
      url: cmsData?.li_url || "https://linkedin.com/school/ivtc", 
      label: "LinkedIn",
      active: cmsData?.li_active === "true"
    },
    { 
      id: "yt",
      icon: Youtube, 
      url: cmsData?.yt_url || "https://youtube.com/@ivtc", 
      label: "YouTube",
      active: cmsData?.yt_active === "true"
    },
    { 
      id: "tw",
      icon: Twitter, 
      url: cmsData?.tw_url || "https://twitter.com/ivtc", 
      label: "Twitter",
      active: cmsData?.tw_active === "true"
    },
  ].filter(link => link.active);
  return (
    <div 
      className="fixed right-3 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6 items-center animate-fade-in [animation-delay:1s]"
    >
      {/* Top Decorative Line */}
      <div className="w-px h-12 bg-linear-to-b from-transparent to-[#002147]/40 dark:to-blue-500/60" />

      {/* Icons List */}
      <div className="flex flex-col gap-4">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.id}
            href={social.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2 text-slate-500 hover:text-[#002147] dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
            aria-label={social.label}
          >
            {/* Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-neutral-900 dark:bg-neutral-800 text-white text-[10px] font-bold uppercase rounded-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl border border-white/10">
              {social.label}
              {/* Tooltip Arrow */}
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-neutral-900 dark:bg-neutral-800 rotate-45 transform border-r border-t border-white/10" />
            </span>

            {/* Icon */}
            <social.icon size={20} strokeWidth={1.5} />
          </a>
        ))}
      </div>

      {/* Bottom Decorative Line */}
      <div className="w-px h-12 bg-linear-to-t from-transparent to-[#002147]/40 dark:to-blue-500/60" />
    </div>
  );
};

export default SocialSidebar;
