"use client";

import React from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const AboutStaff = ({ staffs = [] }) => {
  if (!staffs || staffs.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden" aria-labelledby="staff-heading">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0E0E49]/5 dark:bg-[#0E0E49]/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E0E49]/5 dark:bg-white/5 border border-[#0E0E49]/10 dark:border-white/10 rounded-full text-[#0E0E49] dark:text-blue-400 text-sm font-bold  mb-4">
            <Users size={14} />
            Our Support Team
          </div>
          <h2 id="staff-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Dedicated <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0E0E49] to-blue-600 dark:from-white dark:to-blue-400">Staff Members</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium">
            Our campus is supported by a dedicated team of professionals ensuring smooth operations and student success.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staffs.map((staff, index) => (
            <ScrollReveal 
              key={staff.id} 
              className="group"
              style={{ transitionDelay: `${(index % 4) * 100}ms` }}
            >
              <div className="h-full bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-[2rem] p-5 shadow-sm hover:shadow-2xl hover:shadow-[#0E0E49]/10 dark:hover:shadow-blue-500/10 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden group-hover:-translate-y-2">
                
                {/* Image Container */}
                <div className="relative w-24 h-24 mb-5 p-1 rounded-full border-2 border-dashed border-[#0E0E49]/20 dark:border-white/20 group-hover:border-[#0E0E49] dark:group-hover:border-blue-500 transition-colors duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Image
                      src={staff.profile_image ? `https://api.ivtccampus.lk/${staff.profile_image.replace(/\/+/g, '/')}` : "/staff/placeholder.png"}
                      alt={staff.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute -right-2 top-0 bg-[#0E0E49] text-white p-2 rounded-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Users size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 tracking-tight group-hover:text-[#0E0E49] dark:group-hover:text-blue-400 transition-colors">
                    {staff.name}
                  </h3>
                  <div className="text-xs text-[#0E0E49] dark:text-blue-400 mb-3">
                    {staff.designation}
                  </div>
                  <div 
                    className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-5 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: staff.bio || '' }}
                  />
                </div>

                {/* Gradient Corner Overlay */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-linear-to-br from-transparent to-[#0E0E49]/5 dark:to-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStaff;
