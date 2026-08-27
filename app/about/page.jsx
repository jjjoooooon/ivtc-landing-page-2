import React from "react";
import AboutHero from "@/components/About/AboutHero";
import AboutStats from "@/components/About/AboutStats";
import AboutMission from "@/components/About/AboutMission";
import AboutPartners from "@/components/About/AboutPartners";
import AboutGuidelines from "@/components/About/AboutGuidelines";
import AboutCTA from "@/components/About/AboutCTA";
import AboutLecturers from "@/components/About/AboutLecturers";
import AboutStaff from "@/components/About/AboutStaff";
import CompanyStructure from "../Components/CompanyStructure";
import ScrollReveal from "@/components/Animations/ScrollReveal";

export const metadata = {
  title: "About Us | IVTC Campus Sri Lanka",
  description:
    "Learn more about IVTC Campus, Sri Lanka's leading tech campus. Our mission is to provide practical IT training that helps you move from A/Ls to high-paying tech careers.",
  openGraph: {
    title: "About Us | IVTC Campus Sri Lanka",
    description: "Discover the mission, vision, and partners of IVTC Campus.",
  },
};

async function getLecturers() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) return [];

    const res = await fetch(`${baseUrl}/public/lecturers`, {
      cache: 'no-store',
    });

    if (!res.ok) return [];
    const json = await res.json();
    return json?.data?.data || [];
  } catch (error) {
    console.error("Error fetching lecturers:", error);
    return [];
  }
}

async function getStaffs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) return [];

    const res = await fetch(`${baseUrl}/public/staffs`, {
      cache: 'no-store',
    });

    if (!res.ok) return [];
    const json = await res.json();
    return json?.data?.data || [];
  } catch (error) {
    console.error("Error fetching staffs:", error);
    return [];
  }
}

async function getAboutCMSData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) return null;

    const res = await fetch(`${baseUrl}/public/cms/about`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.error("Error fetching about CMS data:", error);
    return null;
  }
}

const AboutPage = async () => {
  const lecturers = await getLecturers();
  const staffs = await getStaffs();
  const cmsData = await getAboutCMSData();

  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-slate-50 selection:bg-[#002147] selection:text-white font-sans overflow-x-clip">
      {/* 1. HERO SECTION (Client Component) */}
      <AboutHero cmsData={cmsData?.hero} />

      {/* 2. FLOATING STATS PILL (Client Component) */}
      <AboutStats cmsData={cmsData?.stats} />

      {/* 3. MISSION & VISION (Client Component) */}
      <AboutMission cmsData={cmsData?.purpose} />

      {/* 4. LEADERSHIP (Server/Mixed) */}
      {/* <section className="py-32 bg-slate-50/50 dark:bg-white/2 backdrop-blur-3xl border-y border-slate-200 dark:border-white/5" aria-labelledby="leadership-heading">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
            <h2 id="leadership-heading" className="text-4xl md:text-6xl font-semibold mb-8">Our Support Team & Faculty</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
              Our campus is guided by experienced IT professionals and educators who understand the local and global job market.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <CompanyStructure />
          </ScrollReveal>
        </div>
      </section> */}

      {/* 5. LECTURERS SECTION (New) */}
      <AboutLecturers lecturers={lecturers} />

      {/* 5.1 STAFF SECTION (New) */}
      <AboutStaff staffs={staffs} />

      {/* 6. PARTNERS (Client Component) */}
      <AboutPartners
        header={cmsData?.partners_header}
        partners={Object.keys(cmsData || {})
          .filter((key) => key.startsWith("partner_"))
          .map((key) => cmsData[key])
          .filter((p) => p && p.logo)}
      />

      {/* 7. GUIDELINES (Client Component) */}
      <AboutGuidelines
        header={cmsData?.guides_header}
        guides={[
          cmsData?.guide_1,
          cmsData?.guide_2,
          cmsData?.guide_3,
          cmsData?.guide_4,
        ]}
      />

      {/* 8. CTA (Client Component) */}
      <AboutCTA cmsData={cmsData?.cta} />
    </main>
  );
};

export default AboutPage;
