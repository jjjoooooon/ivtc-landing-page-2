"use client";

import React from "react";
import Image from "next/image";
import { Award } from "lucide-react";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const PARTNERS = [
  { name: "Marwadi University", image: "/partners/Marwadi-University.png" },
  { name: "FOM International University", image: "/partners/FOM-logo2.png" },
  { name: "International American University", image: "/partners/iau.png" },
  { name: "WES Approved", image: "/partners/wes-approved.jpeg" },
  { name: "British Council", image: "/partners/british-council.svg" },
  { name: "Ofqual", image: "/partners/ofqual.png" },
  { name: "SQA", image: "/partners/sqa.png" },
  { name: "OTHM Qualifications", image: "/partners/logo_othm.png" },
];

const AboutPartners = ({ header, partners = [] }) => {
  const displayPartners = partners.length > 0 
    ? partners.map(p => ({
        name: p.name || "Official Partner",
        image: `https://api.ivtccampus.lk/${p.logo.replace(/\/+/g, '/')}`
      }))
    : PARTNERS;

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:pb-32" aria-labelledby="partners-heading">
      <ScrollReveal className="text-center mb-20">
        <div className="text-[#002147] dark:text-blue-400 text-xs font-semibold mb-4">
          Global Recognition
        </div>
        <h2 id="partners-heading" className="text-4xl md:text-5xl font-semibold mb-6">
          {header?.partners_title || "Our Affiliated Partners"}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          {header?.partners_subtitle || "IVTC partners with leading institutions and organizations to enhance education, foster innovation, and create opportunities for our students."}
        </p>
      </ScrollReveal>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayPartners.map((partner, i) => (
          <ScrollReveal key={i}>
            <div 
              className="group aspect-video flex items-center justify-center bg-white dark:bg-[#0d0d0d] border border-slate-100 dark:border-white/5 rounded-3xl hover:border-[#002147] dark:hover:border-blue-500 hover:shadow-2xl transition-all duration-500 cursor-default p-8 overflow-hidden"
            >
              <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">
                <Image
                  src={partner.image}
                  alt={`${partner.name} logo - Official Partner of IVTC Campus`}
                  className="object-contain"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* <ScrollReveal className="flex flex-wrap justify-center gap-4 mt-16">
        {["ISO 9001:2015", "TVEC Approved", "City & Guilds Partner", "Pearson VUE Authorized"].map((badge, i) => (
          <div key={i} className="px-6 py-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-sm font-bold flex items-center gap-3 border border-slate-100 dark:border-white/5 shadow-sm transition-all hover:bg-white dark:hover:bg-white/10">
            <Award size={18} className="text-[#002147] dark:text-blue-400" />
            {badge}
          </div>
        ))}
      </ScrollReveal> */}
    </section>
  );
};

export default AboutPartners;
