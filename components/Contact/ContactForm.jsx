"use client";

import React, { useRef } from "react";
import { MessageSquare, Send, Shields, Clock, Lock, ShieldCheck } from "lucide-react";

const ContactForm = ({ cmsData }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };
    console.log("Form Submitted:", data);
    alert("Message Sent! We will get back to you soon.");
    
    // Reset form
    if (nameRef.current) nameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (messageRef.current) messageRef.current.value = "";
  };

  return (
    <div className="lg:col-span-7 animate-hero-fade-up [animation-delay:400ms]">
      <div className="bg-white dark:bg-[#111] p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-white/5 relative overflow-hidden group/form">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#002147] to-transparent opacity-20" />
        
        <div className="mb-8 flex items-start gap-4">
          <div className="shrink-0 p-3 bg-[#002147] rounded-xl text-white shadow-lg shadow-[#002147]/20 transition-transform group-hover/form:scale-110 duration-500 mt-1">
            <MessageSquare size={24} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {cmsData?.form_title || "Drop a Message"}
            </h3>
            <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {cmsData?.form_subtitle || "We usually respond within 24 business hours."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 ml-1">
                Full Name
              </label>
              <input
                ref={nameRef}
                required
                className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] dark:focus:border-blue-500 outline-none transition-all font-medium dark:text-white text-sm"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 ml-1">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                required
                className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] dark:focus:border-blue-500 outline-none transition-all font-medium dark:text-white text-sm"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 ml-1">
              Your Message
            </label>
            <textarea
              ref={messageRef}
              rows={5}
              required
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-4 px-4 focus:ring-2 focus:ring-[#002147]/20 focus:border-[#002147] dark:focus:border-blue-500 outline-none transition-all font-medium dark:text-white resize-none text-sm leading-relaxed"
              placeholder="How can we help you today?"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full h-14 px-12 rounded-full bg-[#002147] hover:bg-[#003366] text-white font-bold text-base transition-all flex items-center justify-center gap-3 group active:scale-[0.98] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">{cmsData?.form_btn_text || "Send Message"}</span>
              <Send
                size={18}
                className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
              />
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 opacity-20 group-hover/form:opacity-40 transition-opacity duration-700">
            <ShieldCheck size={20} />
            <Clock size={20} />
            <Lock size={20} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
