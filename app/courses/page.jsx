import React from "react";
import CourseFilters from "@/components/Courses/CourseFilters";
import CourseCard from "@/components/Courses/CourseCard";
import ScrollReveal from "@/components/Animations/ScrollReveal";
import { LayoutGrid, BookOpen, GraduationCap, Zap, Globe } from "lucide-react";

export const metadata = {
  title: "All Courses | IVTC Campus",
  description: "Explore our comprehensive list of IT courses, certifications, and A/L ICT mastery programs designed for absolute success.",
  keywords: ["IVTC Courses", "IT Certifications", "A/L ICT", "Tech Classes Sri Lanka"],
};

const CATEGORY_META = {
  "after-al": { icon: <Zap size={28} /> },
  "al-ict-classes": { icon: <BookOpen size={28} /> },
  "certifications": { icon: <Globe size={28} /> },
  "diplomas": { icon: <GraduationCap size={28} /> },
};

const CoursesPage = async ({ searchParams }) => {
  // Await searchParams as required in Next.js 15+
  const params = await searchParams;
  const currentCategory = params.category || "all";
  const currentSort = params.sort || "popular";

  let fetchedCourses = [];
  let categoryMap = {};

  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/public/courses`;
    const catUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/public/categories`;
    
    // Parallel fetch for better performance
    const [coursesRes, catsRes] = await Promise.all([
      fetch(baseUrl, { next: { revalidate: 3600 } }),
      fetch(catUrl, { next: { revalidate: 3600 } })
    ]);

    const coursesData = await coursesRes.json();
    const catsData = await catsRes.json();
    
    fetchedCourses = coursesData?.data?.data || [];
    
    // Create a robust ID -> Slug map from official categories
    catsData?.data?.forEach(cat => {
      categoryMap[cat.id] = cat.slug;
    });

  } catch (error) {
    console.error("Error fetching courses data:", error);
  }

  // Transform API data to Component Format
  let displayCourses = fetchedCourses.map((course) => ({
    id: course?.id,
    slug: course?.slug,
    title: course?.name,
    categoryName: course?.category?.name || "General",
    categoryId: categoryMap[course?.category?.id] || "all",
    duration: `${course?.duration} ${course?.duration_unit}${course?.duration !== 1 ? "s" : ""}`,
    // Cache numeric duration for sorting (converted to months)
    durationValue: (course?.duration || 0) * (course?.duration_unit?.toLowerCase().includes('year') ? 12 : 1),
    enrolled: course?.enrolled_count || 0, // Fallback placeholder
    tags: course?.tags?.map((t) => t.name) || [],
    desc: course?.short_description,
    image: course?.primary_image 
      ? `https://api.ivtccampus.lk/${course.primary_image.replace(/\/+/g, '/')}` 
      : null,
    icon: CATEGORY_META[course?.category?.slug]?.icon || <Globe size={28} />,
  }));

  // Manual Category Filtering (since API doesn't support server-side filter by slug)
  if (currentCategory !== "all") {
    displayCourses = displayCourses.filter(course => 
      course.categoryId === currentCategory
    );
  }

  // Pro Sort Logic
  if (currentSort === "duration-desc") {
    displayCourses.sort((a, b) => b.durationValue - a.durationValue);
  } else if (currentSort === "duration-asc") {
    displayCourses.sort((a, b) => a.durationValue - b.durationValue);
  } else if (currentSort === "alphabetical") {
    displayCourses.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Default: Newest First (popular/newest)
    displayCourses.sort((a, b) => b.id - a.id);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 pb-20 relative z-10">
        <ScrollReveal className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-blue-400 text-xs font-bold tracking-wide mb-8 shadow-sm">
            <LayoutGrid size={14} className="text-[#002147] dark:text-blue-400" /> Complete Course Catalog
          </div>
          <h1 className="text-[2.8rem] sm:text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
            Explore All <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-600">Courses.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Discover the perfect program to advance your career. From industry-recognized certifications to A/L ICT mastery, we have carefully designed everything you need for absolute success.
          </p>
        </ScrollReveal>

        <CourseFilters />

        {/* Dynamic Server-Rendered Grid - Increased Density */}
        {displayCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
            {displayCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <ScrollReveal className="py-24 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-50 dark:bg-white/5 text-slate-300 dark:text-slate-600 mb-6">
              <LayoutGrid size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Courses Found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">
              We couldn't find any courses matching your selected filters. Try adjusting your search criteria.
            </p>
          </ScrollReveal>
        )}
      </div>
    </main>
  );
};

export default CoursesPage;
