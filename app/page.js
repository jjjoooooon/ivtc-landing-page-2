import CampusStats from "./sections/CampusOverview";
import CoursePathways from "./sections/CourseCategories";
import LMSLogin from "./sections/LMSLogin";
import StudentRegistration from "./sections/StudentRegistration";
import UpcomingCourses from "./sections/UpcomingCourses";
import HeroWithMegaMenu from "./sections/Hero";

export const revalidate = 60; // Regenerate the page every 60 seconds

export const metadata = {
  title: "IVTC Campus | Empower Your Digital Future in Sri Lanka",
  description: "Sri Lanka's premier campus for A/L ICT, HND, and Global Degree Pathways. Master Software Engineering, Data Science, and Cyber Security with expert-led courses.",
};


async function getCMSData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) return null;
    
    const res = await fetch(`${baseUrl}/public/cms/home`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching CMS data:", error);
    return null;
  }
}

export default async function Home() {
  const cmsData = await getCMSData();

  return (
    <>
      <HeroWithMegaMenu cmsData={cmsData?.hero} />
      {/* <CampusStats /> */}
      <UpcomingCourses cmsData={cmsData?.upcoming_intakes} />
      <CoursePathways cmsData={cmsData?.pathway_section} />
      {/* <LMSLogin /> */}
      <StudentRegistration cmsData={cmsData?.enrollment} />
    </>
  );
}

