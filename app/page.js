import CampusStats from "./sections/CampusOverview";
import CoursePathways from "./sections/CourseCategories";
import LMSLogin from "./sections/LMSLogin";
import StudentRegistration from "./sections/StudentRegistration";
import UpcomingCourses from "./sections/UpcomingCourses";
import HeroWithMegaMenu from "./sections/Hero";

export const metadata = {
  title: "IVTC Campus | Empower Your Digital Future in Sri Lanka",
  description: "Sri Lanka's premier campus for A/L ICT, HND, and Global Degree Pathways. Master Software Engineering, Data Science, and Cyber Security with expert-led courses.",
};

export default function Home() {
  return (
    <>
      <HeroWithMegaMenu />
      {/* <CampusStats /> */}
      <UpcomingCourses />
      <CoursePathways />
      {/* <LMSLogin /> */}
      <StudentRegistration />
    </>
  );
}
