import React from "react";
import { Phone, CheckCircle, ArrowRight } from "lucide-react";
import ShineBadge from "@/components/ui/ShineBadge";
import RegistrationForm from "../../components/Registration/RegistrationForm";
import ScrollReveal from "../../components/Animations/ScrollReveal";

const StudentRegistration = async () => {
  // Since we want this to be a Server Component, we can't use useScrollReveal here directly for the whole section
  const isVisible = true; 
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  let pathways = [];
  try {
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/public/pathways`, {
        next: { revalidate: 60 }
      });
      if (res.ok) {
        const result = await res.json();
        pathways = result?.data || [];
      }
    }
  } catch (error) {
    console.error("Error fetching pathways on server:", error);
  }

  return (
    <section
      id="registration"
      className="py-12 md:py-20 bg-transparent relative overflow-hidden"
    >
      {/* Unified Background Highlights */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] mobile-optimize-blur" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] mobile-optimize-blur" />
      </div>

      <ScrollReveal className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Content & Information */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            <div className="space-y-4">
              <ShineBadge>
                Official Enrollment Portal
              </ShineBadge>
              <h2 className="text-4xl md:text-5xl font-bold lg:text-6xl text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Build Your <span className="text-transparent bg-clip-text bg-linear-to-r from-[#002147] to-[#0055aa] dark:from-blue-400 dark:to-blue-600">Future</span> Today.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-md leading-relaxed">
                Take the first step towards a successful career. Fill out the application form to register for your preferred pathway and gain access to world-class resources.
              </p>
            </div>

            <div className="space-y-5 pt-4">
              {[
                { title: "Expert Instructors", desc: "Learn from industry-leading professionals." },
                { title: "Recognized Certifications", desc: "Gain qualifications that stand out globally." },
                { title: "Flexible Pathways", desc: "Tailored programs matching your career goals." },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-[#002147] dark:text-blue-400">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-900 dark:text-white font-semibold">{feature.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl flex items-center gap-5 mt-8">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-[#002147] dark:text-white shadow-sm">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-widest uppercase">Need Assistance?</p>
                <p className="text-sm text-slate-900 dark:text-white mt-1 font-semibold">Call us at <a href="tel:+94771234567" className="text-[#002147] dark:text-blue-400 hover:underline">+94 77 123 4567</a></p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Application Form */}
          <RegistrationForm isVisible={isVisible} apiUrl={apiUrl} initialPathways={pathways} />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default StudentRegistration;
