import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  // {
  //   title: "Programs",
  //   links: [
  //     { name: "Software Engineering", path: "#" },
  //     { name: "Data Science", path: "#" },
  //     { name: "Cyber Security", path: "#" },
  //     { name: "Cloud Computing", path: "#" },
  //   ],
  // },
  {
    title: "Campus Life",
    links: [
      { name: "Student Portal", path: "https://lms.ivtccampus.lk" },
      { name: "Events & Clubs", path: "#" },
    ],
  },
  {
    title: "Institute",
    links: [
      { name: "About IVTC", path: "/about" },
      { name: "Meerza Initiatives", path: "/meerza-foundation" },
      { name: "Board of Directors", path: "/meerza-foundation/board-of-directors" },
      { name: "Our Staff", path: "/about/our-staff" },
      { name: "Campus Policy", path: "/about/campus-policy" },
      { name: "Contact Us", path: "/contact" },
      { name: "Privacy Policy", path: "#" },
    ],
  },
];

const FooterLinks = ({ cmsData }) => {
  const buildLinks = () => {
    if (!cmsData) return footerLinks;

    const columns = [];

    // Process Column 1
    if (cmsData.col_1?.col_1_title) {
      const col1Links = Object.keys(cmsData)
        .filter(key => key.startsWith('col_1_link_'))
        .map(key => ({
          name: cmsData[key]?.label,
          path: cmsData[key]?.href
        }))
        .filter(l => l.name && l.path);
      
      if (col1Links.length > 0) {
        columns.push({ title: cmsData.col_1.col_1_title, links: col1Links });
      }
    }

    // Process Column 2
    if (cmsData.col_2?.col_2_title) {
      const col2Links = Object.keys(cmsData)
        .filter(key => key.startsWith('col_2_link_'))
        .map(key => ({
          name: cmsData[key]?.label,
          path: cmsData[key]?.href
        }))
        .filter(l => l.name && l.path);

      if (col2Links.length > 0) {
        columns.push({ title: cmsData.col_2.col_2_title, links: col2Links });
      }
    }

    return columns.length > 0 ? columns : footerLinks;
  };

  const displayLinks = buildLinks();
  return (
    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 lg:pl-12">
      {displayLinks.map((col, i) => (
        <div key={i}>
          <h4 className="text-[10px] font-bold uppercase text-white/80 mb-8 tracking-widest">
            {col.title}
          </h4>
          <ul className="space-y-5">
            {col.links.map((link, j) => (
              <li key={j}>
                <Link
                  href={link.path}
                  className="group flex items-center text-slate-400 hover:text-white text-sm transition-colors duration-300 w-fit"
                >
                  <span className="relative overflow-hidden pb-1">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-full h-px bg-white transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="ml-2 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-[opacity,transform] duration-300"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;
