import React from "react";
import { BookOpen, GraduationCap, Zap, Globe } from "lucide-react";
import ShineBadge from "@/components/ui/ShineBadge";
import CourseGrid from "../../components/CourseCategories/CourseGrid";

const pathways = [
  {
    title: "Certifications",
    tags: ["CCNA", "CompTIA"],
    desc: "Accelerated industry programs for immediate impact.",
    icon: <Globe size={28} />,
    color: "bg-[#002147]",
  },
  {
    title: "Diplomas",
    tags: ["HNDIT", "BIT"],
    desc: "Structured academic excellence bridging the gap.",
    icon: <GraduationCap size={28} />,
    color: "bg-blue-800",
  },
  {
    title: "After A/L",
    tags: ["Foundation", "CS"],
    desc: "Start your journey right after school with experts.",
    icon: <Zap size={28} />,
    color: "bg-[#003366]",
  },
  {
    title: "AL ICT Classes",
    tags: ["Local", "Cambridge"],
    desc: "Master the syllabus with highest-ranked instructors.",
    icon: <BookOpen size={28} />,
    color: "bg-blue-900",
  },
];

const CoursePathways = () => {
  return (
    <section className="py-18 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <header className="">
          <ShineBadge className="mb-4">
            Upcoming Intakes — 2026
          </ShineBadge>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-4 tracking-tight">
            Find the Right{" "}
            <span className="text-[#002147] dark:text-blue-400">
              IT Course
            </span>{" "}
            for Your Future
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
            From school leavers to working professionals — IVTC offers IT diplomas, certifications, and degree programs to help you build a successful career in Sri Lanka and beyond.
          </p>
        </header>

        <CourseGrid pathways={pathways} />
      </div>
    </section>
  );
};

export default CoursePathways;
