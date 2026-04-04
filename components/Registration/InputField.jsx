import React from "react";
import { cn } from "@/lib/utils";

const InputField = React.memo(({ label, icon: Icon, className, ...props }) => (
  <div className={cn("space-y-2.5", className)}>
    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
      {label}
    </label>
    <div className="relative group/input">
      <Icon
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-[#002147] dark:group-focus-within/input:text-blue-400 transition-colors"
        size={16}
      />
      <input
        className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl pl-11 pr-3 text-sm focus:border-[#002147] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#002147]/30 dark:focus:ring-blue-500/30 outline-none transition-all font-medium"
        {...props}
      />
    </div>
  </div>
));

InputField.displayName = "InputField";

export default InputField;
