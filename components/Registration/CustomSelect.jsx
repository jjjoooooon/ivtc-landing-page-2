import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomSelect = React.memo(({ label, icon: Icon, options, value, onChange, placeholder = "Select Option", className }) => (
  <div className={cn("space-y-2.5", className)}>
    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
      {label}
    </label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-12! bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl pr-3 text-sm focus:border-[#002147] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#002147]/30 dark:focus:ring-blue-500/30 outline-none transition-all font-medium relative text-left">
        <Icon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors"
          size={16}
        />
        <div className="pl-8">
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-[#0a0a0a] border-slate-200 dark:border-white/10 z-100">
        {options.map((opt) => (
          <SelectItem key={opt} value={opt} className="text-sm font-medium focus:bg-slate-100 dark:focus:bg-white/5">
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
));

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
