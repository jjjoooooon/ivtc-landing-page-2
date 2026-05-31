"use client";

import React, { useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import ScrollReveal from "@/components/Animations/ScrollReveal";

const CourseFilters = ({ categories: rawCategories = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Prepend the "All Categories" entry to whatever the server passed down
  const categories = [
    { id: "all", name: "All Categories", slug: "all" },
    ...rawCategories,
  ];

  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "popular";
  const currentSearch = searchParams.get("search") || "";
  const [, startTransition] = useTransition();

  const handleFilterChange = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all" || value === "popular") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`/courses?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
        router.push(`/courses?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, router]
  );

  return (
    <ScrollReveal className="flex flex-col gap-4 mb-12 relative z-20">
      {/* Row 1: Category Pills (scrollable) + Sort Dropdown */}
      <div className="flex items-center gap-3">

        {/* Scrollable pill track with fade edges */}
        <div className="relative flex-1 min-w-0">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 rounded-l-2xl" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 rounded-r-2xl" />

          <div
            className="flex gap-2 overflow-x-auto scrollbar-hide p-1 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id || cat.slug}
                onClick={() => handleFilterChange("category", cat.slug || cat.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                  currentCategory === (cat.slug || cat.id)
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex-shrink-0 min-w-[190px]">
          <select
            value={currentSort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="w-full appearance-none bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-5 py-3.5 rounded-2xl text-sm font-bold tracking-wide text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="newest" className="bg-white dark:bg-[#111]">Newest First</option>
            <option value="duration-desc" className="bg-white dark:bg-[#111]">Longest Duration</option>
            <option value="duration-asc" className="bg-white dark:bg-[#111]">Shortest Duration</option>
            <option value="alphabetical" className="bg-white dark:bg-[#111]">Name: A to Z</option>
          </select>
          <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Row 2: Search Bar */}
      <div className="relative w-full">
        <Search
          size={16}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          defaultValue={currentSearch}
          onChange={handleSearch}
          placeholder="Search courses by name, tag or keyword…"
          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 pl-12 pr-6 py-3.5 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 transition-all"
        />
      </div>
    </ScrollReveal>
  );
};

export default CourseFilters;
