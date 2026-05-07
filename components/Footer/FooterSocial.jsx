import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const FooterSocial = ({ cmsData }) => {
  const socialLinks = [
    { Icon: Facebook, href: cmsData?.fb_url || "https://facebook.com/ivtc.campus", active: cmsData?.fb_active === "true" },
    { Icon: Twitter, href: cmsData?.tw_url || "https://twitter.com/ivtc", active: cmsData?.tw_active === "true" },
    { Icon: Instagram, href: cmsData?.ig_url || "https://instagram.com/ivtc.campus", active: cmsData?.ig_active === "true" },
    { Icon: Linkedin, href: cmsData?.li_url || "https://linkedin.com/school/ivtc", active: cmsData?.li_active === "true" },
    { Icon: Youtube, href: cmsData?.yt_url || "https://youtube.com/@ivtc", active: cmsData?.yt_active === "true" },
  ].filter(link => link.active);

  if (socialLinks.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.map(({ Icon, href }, i) => (
        <a
          key={i}
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white text-slate-400 hover:text-[#0a0a0a] transition-colors duration-300 group"
          aria-label={Icon.name}
        >
          <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
        </a>
      ))}
    </div>
  );
};

export default FooterSocial;
