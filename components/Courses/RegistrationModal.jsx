"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegistrationForm from "@/components/Registration/RegistrationForm";

// --- Trigger Buttons (exported so page.jsx can use them) ---

export function RegisterButtonDesktop() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-base shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all cursor-pointer"
      >
        Complete Registration
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform sm:w-5" />
      </Button>
      {open && <RegistrationModal onClose={() => setOpen(false)} />}
    </>
  );
}

export function RegisterButtonMobile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
      >
        Register <ArrowRight size={16} />
      </Button>
      {open && <RegistrationModal onClose={() => setOpen(false)} />}
    </>
  );
}

// --- The Modal itself ---

function RegistrationModal({ onClose }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-transparent rounded-[2rem] shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 flex items-center justify-center text-slate-600 dark:text-white transition-colors cursor-pointer"
          aria-label="Close registration"
        >
          <X size={18} />
        </button>

        {/* The form — isVisible=true so it animates in */}
        <RegistrationForm isVisible={true} />
      </div>
    </div>
  );
}

export default RegistrationModal;
