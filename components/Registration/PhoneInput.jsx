"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Phone, ChevronDown } from "lucide-react";
import { COUNTRIES } from "./RegistrationData";

const PhoneInput = React.memo(({ label, name, value, onChange, placeholder = "123 456 789", required }) => {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  const handleCountryChange = (e) => {
    const country = COUNTRIES.find(c => c.code === e.target.value);
    if (country) {
      setSelectedCountry(country);
      // Auto-populate the country code if the current value is empty or only starts with a code
      if (!value || value.trim() === "" || COUNTRIES.some(c => value.startsWith(c.code))) {
        // Find existing number minus the old code
        const hasOldCode = COUNTRIES.find(c => value.startsWith(c.code));
        const numberWithoutCode = hasOldCode ? value.slice(hasOldCode.code.length).trim() : value;
        onChange({ target: { name, value: `${country.code} ${numberWithoutCode}`.trim() } });
      }
    }
  };

  return (
    <div className="space-y-2.5">
      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <div className="flex gap-3">
        {/* Country Selector */}
        <div className="relative w-[100px] shrink-0">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-base">
            {selectedCountry.flag}
          </div>
          <select
            value={selectedCountry.code}
            onChange={handleCountryChange}
            className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl pl-9 pr-6 text-sm focus:border-[#002147] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#002147]/30 dark:focus:ring-blue-500/30 outline-none transition-all font-medium appearance-none cursor-pointer"
          >
            {COUNTRIES.map((c) => (
              <option key={c.name} value={c.code} className="dark:bg-[#0a0a0a] text-slate-900 dark:text-white">
                {c.code}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown size={14} />
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="relative grow group/input">
           <Phone 
             className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002147] dark:group-focus-within/input:text-blue-400 transition-colors" 
             size={16} 
           />
           <input
             type="tel"
             name={name}
             value={value}
             onChange={onChange}
             placeholder={placeholder}
             className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl pl-11 pr-3 text-sm focus:border-[#002147] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#002147]/30 dark:focus:ring-blue-500/30 outline-none transition-all font-medium"
             required={required}
           />
        </div>
      </div>
    </div>
  );
});

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
