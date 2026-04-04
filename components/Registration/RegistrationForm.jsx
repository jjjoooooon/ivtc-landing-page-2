"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { User, Mail, Phone, GraduationCap, FileText, Globe, ArrowRight, Calendar as CalendarIcon, Users } from "lucide-react";
import InputField from "./InputField";
import CustomSelect from "./CustomSelect";
import PhoneInput from "./PhoneInput";
import { REGISTRATION_TYPES, SRI_LANKA_DISTRICTS, COURSES } from "./RegistrationData";
import { COUNTRIES } from "./CountriesData";

const RegistrationForm = ({ isVisible }) => {
  const [activeForm, setActiveForm] = useState("course");

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: COUNTRIES[0].code + " ", nic: "",
    dob: new Date().toISOString().split('T')[0], gender: "", address: "", city: "", district: "",
    postalCode: "", program: "", school: "",
    registrationType: "course",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (typeId) => {
    setActiveForm(typeId);
    setFormData((prev) => ({ ...prev, registrationType: typeId, program: "" }));
  };

  const activeTypeData = useMemo(() =>
    REGISTRATION_TYPES.find((t) => t.id === activeForm) || REGISTRATION_TYPES[0],
    [activeForm]
  );

  return (
    <div className={`lg:col-span-7 opacity-0 ${isVisible ? 'animate-hero-fade-up [animation-delay:500ms]' : ''} bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden group/form`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#002147] to-transparent opacity-30" />
      
      <form
        onSubmit={(e) => { e.preventDefault(); alert("Application Received!"); }}
        className="space-y-6 md:space-y-8"
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#002147] dark:text-blue-400 border-b-2 border-[#002147]/20 dark:border-blue-400/20 pb-1 w-fit uppercase tracking-wider">
              Step 01. Select Pathway
            </label>
            <span className="text-xs font-bold text-slate-400 italic text-right">Target: {activeTypeData.title}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {REGISTRATION_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleTypeChange(type.id)}
                className={cn(
                  "group/btn relative p-4 rounded-xl border transition-all duration-300 text-left",
                  activeForm === type.id
                    ? "bg-[#002147] border-[#002147] shadow-lg shadow-[#002147]/20"
                    : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-[#002147]/30"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300",
                    activeForm === type.id ? "bg-white text-[#002147]" : "bg-white dark:bg-white/10 text-slate-400"
                  )}>
                    <type.icon size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className={cn(
                      "text-sm font-semibold leading-tight truncate",
                      activeForm === type.id ? "text-white" : "text-slate-900 dark:text-white"
                    )}>
                      {type.title}
                    </h4>
                    <span className={cn(
                      "text-xs font-medium truncate block mt-1",
                      activeForm === type.id ? "text-white/50" : "text-slate-400"
                    )}>
                      {type.tags[0]}
                    </span>
                  </div>
                </div>
              </button>
            ))}
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
              label={`${activeTypeData.title} Program`}
              icon={GraduationCap}
              value={formData.program}
              onChange={(val) => setFormData((prev) => ({ ...prev, program: val }))}
              options={COURSES[activeForm]}
              placeholder="Select Program"
              required
            />
            <InputField
              label={activeForm === "al" ? "School Name" : "Current Occupation"}
              name="school"
              placeholder="Enter details"
              icon={GraduationCap}
              value={formData.school}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="pt-6">
          <div className="flex justify-center">
            <button
              type="submit"
              className="group relative w-full sm:w-auto min-w-[280px] bg-linear-to-r from-[#002147] to-[#003366] text-white font-medium py-4 px-10 rounded-full hover:shadow-[0_20px_40px_rgba(0,33,71,0.3)] transition-all duration-500 flex items-center justify-center gap-3 text-xs xl:text-sm active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 font-medium">Submit Application</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
