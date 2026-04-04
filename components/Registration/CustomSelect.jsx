import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const CustomSelect = React.memo(({ label, icon: Icon, options, value, onChange, placeholder = "Select Option", className }) => (
  <div className={cn("space-y-2.5", className)}>
    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
      {label}
    </label>
    <div className="relative group/select">
      <Icon
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/select:text-[#002147] dark:group-focus-within/select:text-blue-400 transition-colors pointer-events-none"
        size={16}
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl pl-11 pr-10 text-sm focus:border-[#002147] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#002147]/30 dark:focus:ring-blue-500/30 outline-none transition-all font-medium appearance-none cursor-pointer"
        required
      >
        <option value="" disabled className="dark:bg-[#0a0a0a] text-slate-400">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="dark:bg-[#0a0a0a] text-slate-900 dark:text-white">
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within/select:text-[#002147] dark:group-focus-within/select:text-blue-400 transition-colors">
        <ChevronDown size={16} />
      </div>
    </div>
  </div>
));

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
