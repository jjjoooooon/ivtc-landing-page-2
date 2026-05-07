"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const AboutCTA = ({ cmsData }) => {
  return (
    <section className="relative mx-6 mb-24 max-w-7xl xl:mx-auto bg-[#002147] dark:bg-black rounded-[3rem] px-6 py-24 text-center overflow-hidden border border-transparent dark:border-white/10" aria-labelledby="cta-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_60%)] pointer-events-none" />
      
      <ScrollReveal className="relative z-10">
        <h2 id="cta-heading" className="text-3xl md:text-6xl font-bold text-white mb-8 tracking-tight">
          {cmsData?.cta_title || "Start Your Journey Today."}
        </h2>
        <Button 
          onClick={() => window.location.href = cmsData?.cta_link || "/#registration"}
          className="h-12 px-12! rounded-3xl bg-white text-[#002147] hover:bg-slate-100 font-bold text-lg shadow-2xl transition-all hover:scale-105 group active:scale-95"
        >
          {cmsData?.cta_button || "Start Your Journey"} 
          <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
        </Button>
      </ScrollReveal>
    </section>
  );
};

export default AboutCTA;
