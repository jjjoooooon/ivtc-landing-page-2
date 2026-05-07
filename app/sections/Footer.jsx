import React from "react";
import Image from "next/image";
import FooterSocial from "../../components/Footer/FooterSocial";
import FooterLinks from "../../components/Footer/FooterLinks";
import ThemeToggle from "../../components/Footer/ThemeToggle";
import ScrollToTop from "../../components/Footer/ScrollToTop";

const Footer = ({ cmsData }) => {
  const brandData = cmsData?.brand;
  const bottomData = cmsData?.bottom;

  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-24 pb-8 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* PERFORMANCE FIX: Added 'hidden md:block' to disable the heavy CSS blur on mobile */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 border-t border-white/5 pt-12 mb-20">
          <div className="lg:col-span-5 lg:pr-12 lg:border-r border-white/5">
            <div className="mb-8 w-24 h-24 bg-white rounded-2xl p-4 flex items-center justify-center">
              <Image
                src={brandData?.logo ? `https://api.ivtccampus.lk/${brandData.logo.replace(/\/+/g, '/')}` : "/ivtc_campus_logo.png"}
                alt="IVTC Campus Logo"
                width={180}
                height={70}
                className="object-contain"
                priority
              />
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mb-10">
              {brandData?.description || "IVTC Campus is committed to providing high-quality education through technology-driven learning experiences. Join us and unlock new opportunities."}
            </p>
            <FooterSocial cmsData={cmsData?.socials} />
          </div>

          <FooterLinks cmsData={cmsData} />
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] uppercase flex items-center gap-2 tracking-widest">
            {bottomData?.copyright_text || `© ${new Date().getFullYear()} IVTC CAMPUS. POWERED BY INZEEDO`}
          </p>

          <div className="flex items-center gap-6 md:gap-8">
            <ThemeToggle />
            <div className="w-[1px] h-4 bg-white/10 hidden sm:block" />
            <ScrollToTop />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;