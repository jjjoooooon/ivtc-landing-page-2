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
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/Animations/ScrollReveal";
import CourseMediaGallery from "@/components/Courses/CourseMediaGallery";
import DOMPurify from "isomorphic-dompurify";

// API Data Fetching - Robust Implementation
async function getCourse(identifier) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
      return null;
    }

    // Safely construct URL to handle trailing slashes
    const endpoint = `${baseUrl.replace(/\/+$/, '')}/public/courses/${identifier}`;
    
    const res = await fetch(endpoint, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`API returned ${res.status} for ${endpoint}`);
      return null;
    }

    const result = await res.json();
    return result?.status === "success" ? result.data : null;
  } catch (error) {
    console.error("Error fetching course details:", error);
    return null;
  }
}

// Next.js 15 requires awaiting params
export default async function CourseDetailsPage({ params }) {
  const { category, slug } = await params;
  
  // Guard against empty slugs
  if (!slug) {
    notFound();
  }

  const data = await getCourse(slug);

  if (!data) {
    notFound();
  }

  // Transform API data to UI format with safe fallbacks
  const course = {
    id: data.id,
    title: data.name || "Untitled Course",
    categoryName: data.category?.name || "Uncategorized",
    categoryId: data.category?.slug || "all",
    desc: data.short_description || "",
    fullDesc: data.full_description || data.short_description || "",
    fees: data.fees_structure ? parseInt(data.fees_structure).toLocaleString() : null,
    duration: data.duration ? `${data.duration} ${data.duration_unit || 'month'}${data.duration !== 1 ? 's' : ''}` : "TBA",
    enrolled: data.enrolled_count || 0,
    tags: data.tags?.map(t => t.name) || [],
    media: [
      ...(data.primary_image ? [{ 
        type: 'image', 
        url: `https://api.ivtccampus.lk/${data.primary_image.replace(/\/+/g, '/')}` 
      }] : []),
      ...(data.images?.map(img => ({ 
        type: 'image', 
        url: `https://api.ivtccampus.lk/${img.image_path.replace(/\/+/g, '/')}` 
      })) || []),
      ...(data.videos?.map(vid => ({ 
        type: 'video', 
        url: vid.video_url || vid.video_path 
      })) || [])
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-[#0a0a0a] lg:pt-46 pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          {/* --- 1. BREADCRUMBS --- */}
          <nav className="flex flex-wrap items-center gap-2 mb-8 text-xs font-medium text-slate-400">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors shrink-0">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <Link href="/courses" className="hover:text-blue-600 transition-colors shrink-0">
              Courses
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <Link href={`/courses/${category}`} className="hover:text-blue-600 transition-colors shrink-0">
              {course.categoryName}
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-slate-900 dark:text-white truncate max-w-[200px]">{course.title}</span>
          </nav>

          {/* --- 2. HERO & MEDIA SECTION --- */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 mb-20 items-center">
            <div className="lg:col-span-6 space-y-6 w-full">
              <div>
                <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-500/20">
                  {course.categoryName}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6">
                {course.title}
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {course.desc}
              </p>

              {/* Course Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-blue-600 shrink-0">
                    <Clock size={18} />
                  </div>
                  {course.duration}
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-blue-600 shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  Lifetime Access
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-blue-600 shrink-0">
                    <Award size={18} />
                  </div>
                  Certificate
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 w-full">
              <CourseMediaGallery media={course.media} />
            </div>
          </div>
        </ScrollReveal>

        {/* --- 3. MAIN CONTENT & SIDEBAR --- */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-start mb-32">
          <div className="lg:col-span-8 space-y-12 w-full">
            <ScrollReveal>
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About this course</h3>
                <div 
                  className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String(course.fullDesc || "")) }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="pt-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  What you will learn
                </h3>
                <div className="flex flex-wrap gap-3">
                  {course.tags?.map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-blue-500/30 transition-all cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-44 w-full z-10">
            <ScrollReveal>
              <div className="bg-white dark:bg-[#111] rounded-[2rem] sm:rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
                <div className="p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
                   <div>
                     <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Get started today
                     </h3>
                     <p className="text-xs sm:text-sm font-medium text-slate-500 max-w-[240px]">Secure your spot in this professional program.</p>
                   </div>

                   {/* Price Display - Simplified and integrated */}
                   {course.fees && (
                     <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                        <div className="text-[10px] sm:text-xs font-semibold text-slate-500 mb-1 uppercase tracking-tight">Total Course Fee</div>
                        <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Rs. {course.fees}</div>
                     </div>
                   )}

                   <div className="space-y-4">
                     <Button className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-base shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all">
                        Complete Registration
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform sm:w-5" />
                     </Button>
                     
                     <div className="space-y-3 pt-6">
                        <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-400">
                           <CheckCircle2 size={14} className="text-green-500 sm:w-4" /> Professional certification included
                        </div>
                        <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-400">
                           <HelpCircle size={14} className="text-blue-500 sm:w-4" /> 24/7 technical and expert support
                        </div>
                     </div>
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
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return { title: 'Course Not Found | IVTC Campus' };
  }

  return {
    title: `${course.name} | IVTC Campus`,
    description: course.short_description,
  };
}
