import React from "react";

export const metadata = {
  title: "Contact Us | IVTC Campus Sri Lanka",
  description: "Get in touch with IVTC Campus for inquiries regarding A/L ICT, HND programs, and degree pathways. Our team is here to help you engineer your digital future.",
  openGraph: {
    title: "Contact Us | IVTC Campus Sri Lanka",
    description: "Contact Sri Lanka's leading tech campus for course details and support.",
  },
};
import ShineBadge from "@/components/ui/ShineBadge";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Sparkles,
  Clock,
  ChevronDown,
} from "lucide-react";
import ContactForm from "../../components/Contact/ContactForm";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors relative overflow-hidden">
      {/* Static subtle gradient blob — no animation, no GPU cost */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#002147]/5 dark:bg-[#002147]/10 blur-[120px] rounded-full"
      />

      {/* --- 1. HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 lg:pt-50 pt-36 pb-24">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">

          {/* Badge */}
          {/* <div className="animate-hero-fade-up mb-6">
            <ShineBadge>
              <Sparkles size={14} className="text-[#002147] dark:text-blue-400" />
              Available for Inquiries
            </ShineBadge>
          </div> */}

          {/* Hero Title — matches About page exactly */}
          <h1 className="text-[2.8rem] sm:text-6xl md:text-8xl lg:text-7xl font-bold leading-[1] tracking-tight mb-6 overflow-hidden">
            <div className="pb-1">
              Let's Engineer
            </div>
            <div className="text-transparent bg-clip-text bg-linear-to-r from-[#002147] to-blue-600 dark:from-white dark:to-blue-400 pb-1">
              Legendary Results.
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium leading-relaxed mb-10">
            Whether you're looking for course details, technical support, or
            corporate partnerships, our team is standing by to assist you.
          </p>

          {/* Social proof — static avatars, no external fetch */}
          <div className="flex items-center gap-4 opacity-0 animate-hero-fade-up [animation-delay:600ms]">
            <div className="flex -space-x-3">
              {[
                "bg-blue-400",
                "bg-indigo-500",
                "bg-sky-400",
                "bg-blue-600",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-4 border-white dark:border-[#0a0a0a] ${color} flex items-center justify-center text-white text-xs font-bold shadow-md`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Expert Support Team
              </p>
              <p className="text-[11px] font-bold text-[#002147] dark:text-blue-400 mt-0.5">
                Active Now
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 hidden md:block" aria-hidden="true">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* --- 2. CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">

          {/* --- LEFT SIDE: INFO HUB --- */}
          <div className="lg:col-span-5 space-y-4">
            {[
              { label: "Contact Numbers", val: "0773536566 / 0703636566", icon: Phone },
              { label: "Official Email", val: "ivtccampus@gmail.com", icon: Mail },
              { label: "Digital Presence", val: "www.ivtccampus.lk", icon: Globe },
            ].map((info, idx) => (
              <div
                key={idx}
                className="group p-7 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-[#002147]/30 dark:hover:border-blue-500/30 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-[#002147] dark:bg-[#002147] text-white flex items-center justify-center shadow-md">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-none mb-1.5">
                      {info.label}
                    </p>
                    <p className="font-medium text-slate-900 dark:text-white text-xl leading-tight">
                      {info.val}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* HQ Card */}
            <div className="p-8 md:p-10 bg-[#002147] rounded-[2rem] text-white shadow-2xl relative overflow-hidden group/hq">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-3xl rounded-full pointer-events-none" />
              <MapPin className="absolute -right-4 -bottom-4 w-36 h-36 opacity-[0.06] group-hover/hq:scale-110 transition-transform duration-700" />
              <div className="relative z-10 space-y-5">
                <h4 className="text-sm font-semibold text-blue-200">Main Office</h4>
                <p className="text-xl md:text-2xl font-bold leading-tight tracking-tight">
                  11B/1, Galle Road, Mount Lavinia,
                  <br />
                  Dehiwala - Mount Lavinia.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Clock size={14} className="text-blue-200" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">Open Mon – Sat</p>
                    <p className="text-xs text-white/50 mt-0.5">8:30 AM – 5:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: FORM --- */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
