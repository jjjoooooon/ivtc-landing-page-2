import React from "react";
import { BookOpen, GraduationCap, Zap, Globe } from "lucide-react";
import ShineBadge from "@/components/ui/ShineBadge";
import CourseGrid from "../../components/CourseCategories/CourseGrid";

const CATEGORY_META = {
  "after-al": {
    icon: <Zap size={28} />,
    color: "bg-[#003366]",
    desc: "Start your journey right after school with experts.",
  },
  "al-ict-classes": {
    icon: <BookOpen size={28} />,
    color: "bg-blue-900",
    desc: "Master the syllabus with highest-ranked instructors.",
  },
  "certifications": {
    icon: <Globe size={28} />,
    color: "bg-[#002147]",
    desc: "Accelerated industry programs for immediate impact.",
  },
  "diplomas": {
    icon: <GraduationCap size={28} />,
    color: "bg-blue-800",
    desc: "Structured academic excellence bridging the gap.",
  },
};

const CoursePathways = async () => {
  let categories = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/categories`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    categories = data?.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  const pathways = categories?.map((cat) => ({
    title: cat?.name,
    // Using optional chaining for description and a temporary fallback
    desc: cat?.description || CATEGORY_META[cat?.slug]?.desc || "Explore our high-quality educational pathways tailored for your career growth.",
    icon: CATEGORY_META[cat?.slug]?.icon || <Globe size={28} />,
    color: CATEGORY_META[cat?.slug]?.color || "bg-[#002147]",
  })) || [];

  return (
    <section className="py-18 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <header className="">
          <ShineBadge className="mb-4">Upcoming Intakes — 2026</ShineBadge>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-4 tracking-tight">
            Find the Right{" "}
            <span className="text-[#002147] dark:text-blue-400">IT Course</span>{" "}
            for Your Future
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
            From school leavers to working professionals — IVTC offers IT
            diplomas, certifications, and degree programs to help you build a
            successful career in Sri Lanka and beyond.
          </p>
        </header>

        <CourseGrid pathways={pathways} />
      </div>
    </section>
  );
};

export default CoursePathways;
