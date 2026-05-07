"use client";

import React from "react";
import { ShieldCheck, Users, Briefcase, Globe, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const POLICIES = [
  {
    title: "Honest Learning",
    desc: "We expect all students to be honest in their studies and follow our campus rules.",
    icon: ShieldCheck,
  },
  {
    title: "Everyone is Welcome",
    desc: "Tech is for everyone. We welcome all students regardless of their background.",
    icon: Users,
  },
  {
    title: "Safety & Privacy",
    desc: "We protect your personal information with the best security systems.",
    icon: Briefcase,
  },
  {
    title: "Green Campus",
    desc: "We work hard to reduce waste and keep our environment clean for the future.",
    icon: Globe,
  },
];

const ICON_MAP = {
  graduation: BookOpen,
  shield: ShieldCheck,
  users: Users,
  briefcase: Briefcase,
  globe: Globe,
};

const AboutGuidelines = ({ header, guides = [] }) => {
  const policies = guides.length > 0 
    ? guides.filter(g => g).map(g => ({
        title: g.title,
        desc: g.desc,
        icon: ICON_MAP[g.icon] || BookOpen
      }))
    : POLICIES;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-40" aria-labelledby="guidelines-heading">
      <ScrollReveal className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 id="guidelines-heading" className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            {header?.guides_title || "Campus Guidelines"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed">
            {header?.guides_subtitle || "A structured, safe, and professional environment designed to help you focus entirely on your technical growth."}
          </p>
        </div>
        {/* <Button variant="outline" className="h-14 px-8 rounded-2xl font-semibold  gap-3 border-2">
          Download Handbook <Download size={20} />
        </Button> */}
      </ScrollReveal>

      <div className="policies-grid grid md:grid-cols-2 gap-8">
        {policies.map((policy, i) => (
          <ScrollReveal key={i}>
            <div className="group relative bg-slate-50 dark:bg-[#0d0d0d] p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-500 hover:bg-white dark:hover:bg-[#111] hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#002147]/5 dark:bg-blue-500/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700 ease-out" />
              <div className="w-16 h-16 bg-white dark:bg-[#1a1a1a] rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-white/5 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <policy.icon size={32} className="text-[#002147] dark:text-blue-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-900 dark:text-white tracking-tight">{policy.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">{policy.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default AboutGuidelines;
