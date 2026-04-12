import React from "react";
import ShineBadge from "@/components/ui/ShineBadge";
import CourseCarousel from "../../components/UpcomingCourses/CourseCarousel";
import ScrollReveal from "../../components/Animations/ScrollReveal";

const UPCOMING_COURSES = [
  {
    title: "Full Stack Web Development",
    date: "April 15, 2026",
    duration: "6 Months",
    desc: "Master modern web technologies from frontend to backend with hands-on projects.",
    image: "/courses/web-dev.png",
    category: "Software Engineering",
  },
  {
    title: "Data Science & AI",
    date: "May 01, 2026",
    duration: "8 Months",
    desc: "Unlock the power of data. Learn Python, Machine Learning, and Neural Networks.",
    image: "/courses/data-science.png",
    category: "Data Science",
  },
  {
    title: "Cyber Security Professional",
    date: "May 20, 2026",
    duration: "5 Months",
    desc: "Protect digital assets. Become an expert in network security and ethical hacking.",
    image: "/courses/cyber-security.png",
    category: "Cyber Security",
  },
  {
    title: "Cloud Solutions Architect",
    date: "June 10, 2026",
    duration: "4 Months",
    desc: "Design scalable cloud infrastructures using AWS, Azure, and Google Cloud.",
    image: "/courses/cloud-computing.png",
    category: "Cloud Computing",
  },
];


const UpcomingCourses = async () => {
  let courses = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      console.warn("NEXT_PUBLIC_API_BASE_URL is missing in UpcomingCourses");
      return null;
    }

    const res = await fetch(`${baseUrl}/public/courses`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }

    const result = await res.json();
    const fetchedCourses = result?.data?.data || [];

    // Map API data to Carousel format
    courses = fetchedCourses.map(course => ({
      title: course.name,
      date: new Date(course.created_at).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }),
      duration: `${course.duration} ${course.duration_unit}${course.duration !== 1 ? 's' : ''}`,
      desc: course.short_description,
      image: course.primary_image 
        ? `https://api.ivtccampus.lk/${course.primary_image.replace(/\/+/g, '/')}` 
        : "/courses/web-dev.png",
      category: course.category?.name || "General",
    }));

  } catch (error) {
    console.error("Error fetching upcoming courses:", error);
  }

  return (
    <section className="py-24 bg-transparent overflow-hidden">
      <ScrollReveal className="max-w-7xl mx-auto px-6">
        <header className="course-header mb-16 text-left">
          <ShineBadge className="mb-2 md:mb-0">
            Starting Soon
          </ShineBadge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.15] md:leading-[1.1] mb-4 tracking-tight">
            Upcoming <span className="text-[#002147] dark:text-blue-400">Intakes</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed lg:mx-0 mx-auto font-medium">
            Reserve your spot for our most anticipated technical programs. Limited seats available for the 2026 academic year.
          </p>
        </header>

        {courses.length > 0 ? (
          <CourseCarousel courses={courses} />
        ) : (
          <div className="py-20 text-center opacity-50 italic">
            No upcoming intakes scheduled at this moment.
          </div>
        )}
      </ScrollReveal>
    </section>
  );
};

export default UpcomingCourses;
