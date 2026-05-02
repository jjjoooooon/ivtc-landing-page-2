"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Phone, ChevronDown, Search, Check } from "lucide-react";
import { COUNTRIES } from "./CountriesData";

const PhoneInput = React.memo(({ label, name, value, onChange, placeholder = "123 456 789", required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  
  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch(""); // Reset search on close
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Memoize the selected country based on the current value matching prefix
  const selectedCountry = useMemo(() => {
    const sortedCountries = [...COUNTRIES].sort((a, b) => b.code.length - a.code.length);
    return sortedCountries.find(c => value?.startsWith(c.code)) || COUNTRIES.find(c => c.code === "+94");
  }, [value]);

  // Filter countries based on search input
  const filteredCountries = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return COUNTRIES;
    return COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.code.includes(term)
    );
  }, [search]);

  const handleSelect = (country) => {
    // Detect existing code to replace it
    const sortedCountries = [...COUNTRIES].sort((a, b) => b.code.length - a.code.length);
    const hasOldCode = sortedCountries.find(c => value?.startsWith(c.code));
    const numberWithoutCode = hasOldCode ? value.slice(hasOldCode.code.length).trim() : value;
    
    onChange({ target: { name, value: `${country.code} ${numberWithoutCode}`.trim() } });
    setIsOpen(false);
    setSearch("");
  };

  const displayNumber = useMemo(() => {
    if (!value || !selectedCountry) return value || "";
    if (value.startsWith(selectedCountry.code)) {
      return value.slice(selectedCountry.code.length).trim();
    }
    return value;
  }, [value, selectedCountry]);

  const handleInputChange = (e) => {
    let val = e.target.value.trim();
    // Automatically remove leading '0' if user types or pastes a local number starting with 0
    if (val.startsWith("0")) {
      val = val.replace(/^0+/, "");
    }
    
    // Optionally remove spaces to just get the digits (if you want only the raw 9 digits, but letting user keep spaces might be okay. We'll just trim the leading zero.)
    const newValue = val ? `${selectedCountry.code} ${val}` : `${selectedCountry.code} `;
    onChange({ target: { name, value: newValue } });
  };

  return (
    <div className="space-y-2.5 relative">
      <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <div className="flex gap-3">
        {/* Simple Legacy Searchable Country Selector */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-[100px] h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-medium cursor-pointer focus:border-[#002147] dark:focus:border-blue-500"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-base shrink-0">{selectedCountry.flag}</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold truncate">{selectedCountry.code}</span>
            </div>
            <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-200", isOpen && "rotate-180")} />
          </button>

          {/* Simple Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-14 left-0 w-[280px] bg-white dark:bg-[#0d0d0d] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Search Box */}
              <div className="p-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={14} />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search country or code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-10 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-3 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                  />
                </div>
              </div>

              {/* Countries List */}
              <div className="max-h-[300px] overflow-y-auto p-1 py-2 custom-scrollbar">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.name}
                      type="button"
                      onClick={() => handleSelect(country)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors group hover:bg-slate-50 dark:hover:bg-white/5",
                        selectedCountry.name === country.name && "bg-slate-50/80 dark:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg group-hover:scale-110 transition-transform">{country.flag}</span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">
                            {country.name}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-xs">{country.code}</span>
                        </div>
                      </div>
                      {selectedCountry.name === country.name && (
                        <Check className="size-4 text-blue-500 stroke-[3px]" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center text-sm text-slate-400">No country found.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Same Phone Number Input */}
        <div className="relative grow group/input">
           <Phone 
             className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002147] dark:group-focus-within/input:text-blue-400 transition-colors" 
             size={16} 
           />
           <input
             type="tel"
             name={name}
             value={displayNumber}
             onChange={handleInputChange}
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
