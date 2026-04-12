"use client";

import React, { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { User, Mail, Phone, GraduationCap, FileText, Globe, ArrowRight, Calendar as CalendarIcon, Users, BookOpen } from "lucide-react";
import InputField from "./InputField";
import CustomSelect from "./CustomSelect";
import PhoneInput from "./PhoneInput";
import { SRI_LANKA_DISTRICTS } from "./RegistrationData";
import { COUNTRIES } from "./CountriesData";

const RegistrationForm = ({ isVisible }) => {
  const [pathways, setPathways] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [isLoadingPathways, setIsLoadingPathways] = useState(true);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [programType, setProgramType] = useState("program");

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: COUNTRIES[0].code + " ", nic: "",
    dob: new Date().toISOString().split('T')[0], gender: "", address: "", city: "", district: "",
    postalCode: "", program: "", pathwayId: "", programId: "", school: "",
    registrationType: "",
  });

  useEffect(() => {
    const fetchPathways = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!baseUrl) {
          throw new Error("API Base URL not configured");
        }

        const response = await fetch(`${baseUrl}/public/pathways`);
        
        if (!response.ok) {
           throw new Error(`Server returned ${response.status}`);
        }

        const result = await response.json();
        if (result.status === "success") {
          setPathways(result.data);
          // Auto-select first pathway if available
          if (result.data.length > 0) {
            handlePathwayChange(result.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching pathways:", error);
        // We can keep pathways as [] which will show the "No pathways" or custom error UI
      } finally {
        setIsLoadingPathways(false);
      }
    };

    fetchPathways();
  }, []);

  const fetchPrograms = async (pathwayId) => {
    setIsLoadingPrograms(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/registration/programs/${pathwayId}`);
      const result = await response.json();
      if (result.status === "success") {
        setPrograms(result.data.programs);
        setProgramType(result.data.type || "program");
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setIsLoadingPrograms(false);
    }
  };

  const handlePathwayChange = (pathway) => {
    setActiveForm(pathway.id);
    setFormData((prev) => ({
      ...prev,
      registrationType: pathway.name,
      pathwayId: pathway.id,
      program: "",
      programId: ""
    }));
    fetchPrograms(pathway.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const activeTypeData = useMemo(() =>
    pathways.find((p) => p.id === activeForm) || { name: "Pathway", description: "" },
    [activeForm, pathways]
  );

  const getPathwayIcon = (slug = "") => {
    if (slug.includes('al')) return BookOpen;
    if (slug.includes('degree')) return GraduationCap;
    if (slug.includes('membership')) return Users;
    return Globe;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const payload = {
      pathway_id: formData.pathwayId,
      program_type: programType,
      program_id: formData.programId,
      full_name: formData.fullName,
      nic: formData.nic,
      dob: formData.dob,
      gender: formData.gender,
      phone: formData.phone.trim(),
      email: formData.email,
      district: formData.district,
      city: formData.city,
      school_name: activeTypeData.slug === 'al' ? formData.school : null,
      occupation: activeTypeData.slug !== 'al' ? formData.school : "Student"
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/registration/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Optional: Reset form after delay
        setTimeout(() => {
          setFormData({
            fullName: "", email: "", phone: COUNTRIES[0].code + " ", nic: "",
            dob: new Date().toISOString().split('T')[0], gender: "", address: "", city: "", district: "",
            postalCode: "", program: "", pathwayId: formData.pathwayId, programId: "", school: "",
            registrationType: formData.registrationType,
          });
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`lg:col-span-7 opacity-0 ${isVisible ? 'animate-hero-fade-up [animation-delay:500ms]' : ''} bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden group/form`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#002147] to-transparent opacity-30" />

      <form
        onSubmit={handleSubmit}
        className="space-y-6 md:space-y-8"
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#002147] dark:text-blue-400 border-b-2 border-[#002147]/20 dark:border-blue-400/20 pb-1 w-fit uppercase tracking-wider">
              Step 01. Select Pathway
            </label>
            <span className="text-xs font-bold text-slate-400 italic text-right">Target: {activeTypeData.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 min-h-[120px]">
            {isLoadingPathways ? (
              <div className="col-span-2 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-white/5 rounded-xl border border-dashed border-slate-200 dark:border-white/10">
                <div className="w-8 h-8 border-2 border-[#002147] border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-xs text-slate-500 font-medium">Fetching pathways...</p>
              </div>
            ) : (
              pathways.map((pathway) => {
                const PathwayIcon = getPathwayIcon(pathway.slug);
                return (
                  <button
                    key={pathway.id}
                    type="button"
                    onClick={() => handlePathwayChange(pathway)}
                    className={cn(
                      "group/btn relative p-4 rounded-xl border transition-all duration-300 text-left",
                      activeForm === pathway.id
                        ? "bg-[#002147] border-[#002147] shadow-lg shadow-[#002147]/20"
                        : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-[#002147]/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300",
                        activeForm === pathway.id ? "bg-white text-[#002147]" : "bg-white dark:bg-white/10 text-slate-400"
                      )}>
                        <PathwayIcon size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className={cn(
                          "text-sm font-semibold leading-tight truncate",
                          activeForm === pathway.id ? "text-white" : "text-slate-900 dark:text-white"
                        )}>
                          {pathway.name}
                        </h4>
                        <span className={cn(
                          "text-xs font-medium truncate block mt-1",
                          activeForm === pathway.id ? "text-white/50" : "text-slate-400"
                        )}>
                          {pathway.description ? (pathway.description.length > 20 ? pathway.description.substring(0, 20) + "..." : pathway.description) : "Learn more"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="space-y-8 pt-6 border-t border-slate-100 dark:border-white/5">
          <label className="text-base font-bold text-[#002147] dark:text-blue-400 border-b-2 border-[#002147]/20 dark:border-blue-400/20 pb-1 w-fit uppercase tracking-wider">
            Step 02. Personal & Academic Details
          </label>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <InputField
              label="Full Name"
              name="fullName"
              placeholder="Your official name"
              icon={User}
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="NIC / Passport"
              name="nic"
              placeholder="ID number"
              icon={FileText}
              value={formData.nic}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Date of Birth"
              name="dob"
              type="date"
              icon={CalendarIcon}
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
            <CustomSelect
              label="Gender"
              icon={Users}
              value={formData.gender}
              onChange={(val) => setFormData((prev) => ({ ...prev, gender: val }))}
              options={["Male", "Female", "Prefer not to say"]}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <PhoneInput
              label="WhatsApp / Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="student@example.com"
              icon={Mail}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <CustomSelect
              label="District"
              icon={Globe}
              value={formData.district}
              onChange={(val) => setFormData((prev) => ({ ...prev, district: val }))}
              options={SRI_LANKA_DISTRICTS}
              required
            />
            <InputField
              label="City"
              name="city"
              placeholder="Your city"
              icon={Globe}
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <CustomSelect
              label={`${activeTypeData.name} Program`}
              icon={GraduationCap}
              value={formData.program}
              onChange={(val) => {
                const selectedProg = programs.find(p => p.name === val);
                setFormData((prev) => ({
                  ...prev,
                  program: val,
                  programId: selectedProg?.id || ""
                }));
              }}
              options={isLoadingPrograms ? ["Loading Programs..."] : programs.map(p => p.name)}
              placeholder={isLoadingPrograms ? "Loading..." : "Select Program"}
              required
            />
            <InputField
              label={activeTypeData.slug === "al" ? "School Name" : "Current Occupation"}
              name="school"
              placeholder="Enter details"
              icon={GraduationCap}
              value={formData.school}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="pt-6">
          <div className="flex flex-col items-center gap-4">
            {submitStatus === "success" && (
              <div className="w-full p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium text-center animate-in fade-in zoom-in duration-300">
                Registration successful! We will contact you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium text-center animate-in fade-in zoom-in duration-300">
                Something went wrong. Please try again or contact support.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLoadingPathways || isLoadingPrograms}
              className={cn(
                "group relative w-full sm:w-auto min-w-[280px] bg-linear-to-r from-[#002147] to-[#003366] text-white font-medium py-4 px-10 rounded-full hover:shadow-[0_20px_40px_rgba(0,33,71,0.3)] transition-all duration-500 flex items-center justify-center gap-3 text-xs xl:text-sm active:scale-[0.98] overflow-hidden",
                (isSubmitting || isLoadingPathways || isLoadingPrograms) && "opacity-70 cursor-not-allowed"
              )}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 font-medium">
                {isSubmitting ? "Processing Application..." : "Submit Application"}
              </span>
              {!isSubmitting && <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-500" />}
              {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
