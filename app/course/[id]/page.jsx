import React from "react";
import {
  Clock,
  ShieldCheck,
  Users,
  Award,
  ArrowRight,
  Globe,
  ChevronRight,
  Home,
  UserCircle
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/Animations/ScrollReveal";
import CourseMediaGallery from "@/components/Courses/CourseMediaGallery";
import DOMPurify from "isomorphic-dompurify";

// API Data Fetching
async function getCourse(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/courses/${id}`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    return result?.data || null;
  } catch (error) {
    console.error("Error fetching course details:", error);
    return null;
  }
}

// Next.js 15 requires awaiting params
export default async function CourseDetailsPage({ params }) {
  const { id } = await params;
  const data = await getCourse(id);

  if (!data) {
    notFound();
  }

  // Transform API data to UI format
  const course = {
    id: data.id,
    title: data.name,
    categoryName: data.category?.name,
    categoryId: data.category?.slug,
    desc: data.short_description,
    fullDesc: data.full_description,
    duration: `${data.duration} ${data.duration_unit}${data.duration !== 1 ? 's' : ''}`,
    enrolled: 0, // Fallback placeholder
    tags: data.tags?.map(t => t.name) || [],
    media: [
      // Primary image first
      ...(data.primary_image ? [{ 
        type: 'image', 
        url: `https://api.ivtccampus.lk/${data.primary_image.replace(/\/+/g, '/')}` 
      }] : []),
      // Then gallery images
      ...(data.images?.map(img => ({ 
        type: 'image', 
        url: `https://api.ivtccampus.lk/${img.image_path.replace(/\/+/g, '/')}` 
      })) || []),
      // Then videos if any
      ...(data.videos?.map(vid => ({ 
        type: 'video', 
        url: vid.video_url || vid.video_path // Handling potential video path/url
      })) || [])
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-[#0a0a0a] lg:pt-46 pt-36 pb-24 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          {/* --- 1. BREADCRUMBS --- */}
          <nav className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-6 text-[10px] md:text-xs font-bold tracking-wide text-slate-400">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors shrink-0">
              <Home size={12} className="md:w-3.5 md:h-3.5" /> Home
            </Link>
            <ChevronRight size={10} className="shrink-0 md:w-3 md:h-3" />
            <Link href="/courses" className="hover:text-blue-600 transition-colors shrink-0">
              Courses
            </Link>
            <ChevronRight size={10} className="shrink-0 md:w-3 md:h-3" />
            <Link href={`/courses?category=${course.categoryId}`} className="hover:text-blue-600 transition-colors shrink-0">
              {course.categoryName}
            </Link>
            <ChevronRight size={10} className="shrink-0 md:w-3 md:h-3" />
            <span className="text-slate-900 dark:text-white truncate max-w-[120px] sm:max-w-[200px] md:max-w-xs">{course.title}</span>
          </nav>

          {/* --- 2. HERO & MEDIA SECTION --- */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-20 items-center">
            <div className="lg:col-span-6 space-y-5 lg:space-y-6 w-full">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 md:px-4 py-1.5 rounded-lg md:rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] md:text-[11px] font-bold tracking-wide border border-blue-500/20">
                  {course.categoryName}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.15] md:leading-[1.1] mb-4 md:mb-6 tracking-tight">
                {course.title}
              </h1>
              
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
                {course.desc}
              </p>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-4 md:pt-6 border-t border-slate-200 dark:border-white/10">
                {/* Lecturer hidden as per user request */}
                {/* <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-xs md:text-sm">
                  <UserCircle className="text-blue-500 shrink-0" size={18} />
                  <span>Lecturer: {course.lecturer}</span>
                </div> */}
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-xs md:text-sm">
                  <Users className="text-blue-500 shrink-0" size={16} />
                  <span>{course.enrolled.toLocaleString()}+ Enrolled</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 w-full">
              <CourseMediaGallery media={course.media} />
            </div>
          </div>
        </ScrollReveal>

        {/* --- 3. MAIN CONTENT & SIDEBAR --- */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24 lg:mb-32">
          <div className="lg:col-span-8 space-y-10 w-full">
            <ScrollReveal>
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">Course Description</h3>
                <div 
                  className="text-slate-600 dark:text-slate-400 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.fullDesc || course.desc) }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: "Instructor-Led", desc: "Live expert support", icon: Users },
                  { title: "Practical Labs", desc: "Hands-on projects", icon: Globe },
                  { title: "Certification", desc: "Industry recognized", icon: Award },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="p-5 md:p-6 bg-white dark:bg-[#111] rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-200 dark:border-white/5 transition-all hover:border-blue-500/20 hover:shadow-xl group"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-blue-600 mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                      <f.icon size={20} className="md:w-6 md:h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1 md:mb-2 text-sm md:text-base">
                      {f.title}
                    </h4>
                    <p className="text-[11px] md:text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tags area */}
            <ScrollReveal>
              <div className="pt-6 md:pt-10">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Skills & Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {course.tags?.map((tag, idx) => (
                    <span key={idx} className="px-3 md:px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs md:text-sm font-bold tracking-wide hover:border-blue-500/30 hover:bg-white dark:hover:bg-[#111] transition-all cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <aside className="lg:col-span-4 sticky top-24 lg:top-28 w-full z-10">
            <ScrollReveal>
              <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none border border-slate-200 dark:border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
                
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-5 md:mb-6 relative z-10">
                  Ready to start?
                </h3>

                <div className="space-y-3 mb-6 md:mb-8 relative z-10">
                  <Button className="w-full h-12 md:h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs md:text-[14px] shadow-lg shadow-blue-500/25 group transition-all">
                    Confirm Enrollment
                    <ArrowRight
                      size={18}
                      className="ml-2 w-4 md:w-5 group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </div>

                <div className="space-y-3 md:space-y-4 pt-5 md:pt-6 border-t border-slate-100 dark:border-white/5 relative z-10">
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-400">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Clock size={16} className="md:w-[18px]" />
                    </div>
                    {course.duration} Duration
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-400">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <ShieldCheck size={16} className="md:w-[18px]" />
                    </div>
                    Lifetime Access
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-400">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Award size={16} className="md:w-[18px]" />
                    </div>
                    Certificate Included
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </main>
  );
}

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    return { title: 'Course Not Found | IVTC Campus' };
  }

  return {
    title: `${course.name} | IVTC Campus`,
    description: course.short_description,
  };
}
