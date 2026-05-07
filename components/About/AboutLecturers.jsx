"use client";

import React from "react";
import Image from "next/image";
import { Linkedin, Facebook, Twitter, Globe, GraduationCap } from "lucide-react";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const AboutLecturers = ({ lecturers = [] }) => {
  if (!lecturers || lecturers.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden" aria-labelledby="lecturers-heading">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#002147]/5 dark:bg-[#002147]/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#002147]/5 dark:bg-white/5 border border-[#002147]/10 dark:border-white/10 rounded-full text-[#002147] dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            <GraduationCap size={14} />
            Academic Excellence
          </div>
          <h2 id="lecturers-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-linear-to-r from-[#002147] to-blue-600 dark:from-white dark:to-blue-400">Expert Faculty</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium">
            Learn from industry veterans and distinguished academics dedicated to bridging the gap between theory and practical application.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {lecturers.map((lecturer, index) => (
            <ScrollReveal 
              key={lecturer.id} 
              className="group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-full bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-[#002147]/10 dark:hover:shadow-blue-500/10 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden group-hover:-translate-y-2">
                
                {/* Image Container */}
                <div className="relative w-40 h-40 mb-8 p-1 rounded-full border-2 border-dashed border-[#002147]/20 dark:border-white/20 group-hover:border-[#002147] dark:group-hover:border-blue-500 transition-colors duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={lecturer.image ? `https://api.ivtccampus.lk/${lecturer.image.replace(/\/+/g, '/')}` : "/staff/placeholder.png"}
                      alt={lecturer.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute -right-2 top-0 bg-[#002147] text-white p-2 rounded-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <GraduationCap size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-[#002147] dark:group-hover:text-blue-400 transition-colors">
                    {lecturer.name}
                  </h3>
                  <div className="text-sm font-bold text-[#002147] dark:text-blue-400 mb-4 uppercase tracking-wider">
                    {lecturer.specialization}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                    {lecturer.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-white/5 w-full justify-center">
                  {lecturer.linkedin_url && (
                    <a href={lecturer.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-[#0077b5] hover:bg-[#0077b5]/10 flex items-center justify-center transition-all">
                      <Linkedin size={18} />
                    </a>
                  )}
                  {lecturer.facebook_url && (
                    <a href={lecturer.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-[#1877f2] hover:bg-[#1877f2]/10 flex items-center justify-center transition-all">
                      <Facebook size={18} />
                    </a>
                  )}
                  {lecturer.twitter_url && (
                    <a href={lecturer.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-[#1da1f2] hover:bg-[#1da1f2]/10 flex items-center justify-center transition-all">
                      <Twitter size={18} />
                    </a>
                  )}
                  {lecturer.website_url && (
                    <a href={lecturer.website_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-[#002147] dark:hover:text-blue-400 hover:bg-[#002147]/10 flex items-center justify-center transition-all">
                      <Globe size={18} />
                    </a>
                  )}
                </div>

                {/* Gradient Corner Overlay */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-linear-to-br from-transparent to-[#002147]/5 dark:to-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutLecturers;
