"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Download,
  Share2,
  Award,
  Calendar,
  User,
  BookOpen,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const VerifyForm = () => {
  const inputRef = useRef(null);
  const resultRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleValidate = useCallback(async (e) => {
    e.preventDefault();
    const code = inputRef.current?.value?.trim().toUpperCase();
    if (!code) return;

    setStatus("loading");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/certifications/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verification_code: code }),
      });

      const result = await response.json();

      if (result.status === "success") {
        resultRef.current = result.data;
        setStatus("success");
      } else {
        resultRef.current = null;
        setStatus("error");
      }
    } catch (error) {
      console.error("Verification error:", error);
      resultRef.current = null;
      setStatus("error");
    }
  }, []);

  const handleReset = useCallback(() => {
    setStatus("idle");
    resultRef.current = null;
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleCopyId = useCallback(() => {
    if (resultRef.current?.verification_code) {
      navigator.clipboard.writeText(resultRef.current.verification_code);
    }
  }, []);

  const maskNIC = (nic) => {
    if (!nic) return "";
    if (nic.length < 5) return nic;
    return `${nic.slice(0, 4)}xxxx${nic.slice(-2)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const detailsGrid = useMemo(() => {
    if (!resultRef.current) return [];
    return [
      {
        label: "Enrollment Number",
        value: resultRef.current.entrol_number,
        Icon: User,
      },
      {
        label: "Course Code",
        value: resultRef.current.course_code,
        Icon: BookOpen,
      },
      {
        label: "Issue Period",
        value: `${formatDate(resultRef.current.starting_date)} - ${formatDate(resultRef.current.ending_date)}`,
        Icon: Calendar,
      },
      {
        label: "Certificate Number",
        value: resultRef.current.certificate_number,
        Icon: Award,
      },
      {
        label: "NIC Number",
        value: maskNIC(resultRef.current.nic),
        Icon: ShieldCheck,
      },
      {
        label: "Verification Code",
        value: resultRef.current.verification_code,
        Icon: ShieldCheck,
      },
    ];
  }, [status]);

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0">
      {/* --- SEARCH FORM --- */}
      <form onSubmit={handleValidate} className="mb-12 relative flex flex-col md:block">
        <div className="relative group w-full">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#002147] transition-colors pointer-events-none">
            <Search size={22} />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter Certificate ID (e.g. IVTC-2026-X89)"
            className="w-full h-16 pl-14 pr-6 md:pr-[220px] bg-white dark:bg-[#111] rounded-2xl border-2 border-slate-100 dark:border-white/5 text-lg font-semibold text-slate-900 dark:text-white shadow-sm focus:ring-4 focus:ring-[#002147]/10 focus:border-[#002147] dark:focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-300 placeholder:font-normal"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-4 md:mt-0 w-full md:w-[200px] h-16 md:h-12 bg-[#002147] hover:bg-[#003366] text-white rounded-2xl md:rounded-xl font-bold text-lg md:text-sm md:absolute md:right-2 md:top-2 transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#002147]/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group shrink-0"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-3">
              <Loader2 className="animate-spin" size={20} />
              Validating...
            </span>
          ) : (
            <>
              <ShieldCheck className="group-hover:scale-110 transition-transform" size={20} />
              Validate Certificate
            </>
          )}
        </button>
      </form>

      {/* --- SUCCESS RESULT --- */}
      {status === "success" && resultRef.current && (
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Top Banner with Animated Pulse */}
          <div className="bg-linear-to-r from-[#002147] to-[#004080] py-4 px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 blur-md opacity-50 animate-pulse rounded-full" />
                <CheckCircle2 size={18} className="text-green-400 relative z-10" />
              </div>
              <span className="text-white text-sm font-bold tracking-wide uppercase">
                Authenticity Verified
              </span>
            </div>
            <button 
              onClick={handleCopyId}
              className="text-white/70 hover:text-white text-xs font-mono transition-colors flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
            >
              {resultRef.current.verification_code}
              <Share2 size={12} />
            </button>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            {/* Student identity section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                  Official Record
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {resultRef.current.full_name}
                </h2>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <User size={18} className="shrink-0 opacity-60" />
                  <span className="text-sm font-medium">Verified Certificate Holder</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="rounded-2xl h-12 px-6 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 font-bold flex items-center gap-2 transition-all hover:shadow-lg"
                >
                  <Download size={18} className="text-[#002147] dark:text-blue-400" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Structured Details with Glass Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-100 dark:border-white/5">
              {detailsGrid.map(({ label, value, Icon }) => (
                <div 
                  key={label} 
                  className="p-5 rounded-2xl bg-slate-50/50 dark:bg-white/2 border border-slate-100 dark:border-white/5 group hover:bg-white dark:hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white dark:bg-white/5 shadow-sm text-[#002147] dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
                      <Icon size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        {label}
                      </p>
                      <p className="text-slate-900 dark:text-white font-bold leading-tight">
                        {value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Footer */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <p className="text-xs font-semibold text-slate-400">
                  Verified by IVTC Academic Council
                </p>
              </div>
              <div className="h-px grow bg-slate-100 dark:bg-white/5 hidden sm:block mx-4" />
              <div className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest pointer-events-none select-none">
                Official Validation Portal
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ERROR STATE --- */}
      {status === "error" && (
        <div className="bg-red-50/50 dark:bg-red-500/5 backdrop-blur-md border border-red-100 dark:border-red-500/20 p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
            <XCircle size={48} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h3 className="text-red-900 dark:text-red-400 font-black text-2xl tracking-tight">
              Certificate Not Found
            </h3>
            <p className="text-red-700/70 dark:text-red-400/60 text-base leading-relaxed max-w-sm mx-auto">
              The credentials you provided do not match our database records. 
              Please verify the Certificate ID and try again.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="h-14 px-10 rounded-2xl bg-white dark:bg-white/5 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 font-bold text-sm transition-all hover:bg-red-50 dark:hover:bg-red-500/10 hover:shadow-lg active:scale-95"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyForm;
