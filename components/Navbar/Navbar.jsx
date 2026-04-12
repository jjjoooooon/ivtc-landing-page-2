"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Academics", href: "#", hasMega: true },
  { name: "Certification", href: "/verify" },
  { name: "Registration", href: "/#registration" },
  { name: "Meerza Foundation", href: "/meerza-foundation", hasMega: true },
  { name: "Contact", href: "/contact" },
];

const menuData = {
  Academics: [
    {
      title: "Software Engineering",
      desc: "Full-stack development & modern architecture.",
    },
    {
      title: "Data Science",
      desc: "AI, Machine Learning, and Big Data analytics.",
    },
    {
      title: "Cyber Security",
      desc: "Network protection and ethical hacking protocols.",
    },
    {
      title: "Cloud Computing",
      desc: "AWS, Azure, and high-scale DevOps workflows.",
    },
  ],
  "Meerza Foundation": [
    {
      title: "Our Initiatives",
      desc: "Student aid, Quran academy, and digital library.",
      href: "/meerza-foundation"
    },
    {
      title: "Board of Directors",
      desc: "Meet the leadership behind our mission.",
      href: "/meerza-foundation/board-of-directors"
    },
  ],
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    setMobileSubMenu(null);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setMobileSubMenu(null);
  }, []);

  const toggleMobileSubMenu = (name) => {
    setMobileSubMenu(mobileSubMenu === name ? null : name);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-10002 p-3 md:p-6 flex justify-center transition-transform duration-500 will-change-transform ${isScrolled && !isMenuOpen
          ? "-translate-y-2 md:translate-y-0"
          : "translate-y-0"
          }`}
      >
        <nav
          className={`w-full max-w-[1400px] rounded-[1.5rem] lg:rounded-full px-5 md:px-8 py-2 md:py-4 flex justify-between items-center relative transition-colors duration-500 border ${isScrolled || pathname !== "/"
            ? "bg-white dark:bg-[#0a0a0a] md:bg-white/95 md:dark:bg-black/95 shadow-md md:shadow-lg md:backdrop-blur-sm border-slate-200 dark:border-white/10"
            : "bg-transparent border-transparent"
            }`}
        >
          <Link href="/" className="flex items-center gap-3 z-[110]" onClick={closeMenu}>
            <div
              className={`relative flex items-center justify-center transition-all duration-500 ease-in-out rounded-full bg-white shadow-xl ${isScrolled && !isMenuOpen
                ? "w-10 h-10 md:w-14 md:h-14"
                : "w-14 h-14 md:w-20 md:h-20"
                }`}
            >
              <Image
                src="/ivtc_campus_logo.png"
                alt="IVTC Campus Logo"
                fill
                className="object-contain p-2 transition-all duration-500"
                priority
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div
                key={link.name}
                onMouseEnter={() => link.hasMega && setActiveMenu(link.name)}
                onMouseLeave={() => setActiveMenu(null)}
                className="relative py-2"
              >
                <Link
                  href={link.href}
                  className={`group relative text-[14px] font-medium transition-colors flex items-center gap-1.5 py-1 ${pathname === link.href ? "font-bold text-slate-900 dark:text-white" : ""
                    } ${isScrolled || pathname !== "/"
                      ? "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      : "text-white/90 hover:text-white"
                    }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      } ${isScrolled || pathname !== "/" ? "bg-[#002147] dark:bg-white" : "bg-white"}`}
                  />
                  {link.hasMega && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${activeMenu === link.name ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </Link>

                {link.hasMega && activeMenu === link.name && !isMenuOpen && (
                  <div className={`absolute top-full pt-6 cursor-default ${link.name === "Meerza Foundation" ? "-left-4" : "-left-20"}`}>
                    <div className={`${link.name === "Meerza Foundation" ? "w-[400px]" : "w-[600px]"} bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 dark:border-white/10 text-left`}>
                      <div className={`grid ${link.name === "Meerza Foundation" ? "grid-cols-1 gap-2" : "grid-cols-2 gap-4"}`}>
                        {menuData[link.name]?.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href || "#"}
                            onClick={closeMenu}
                            className={`group/item cursor-pointer rounded-3xl bg-slate-50 dark:bg-white/5 hover:bg-[#002147] dark:hover:bg-[#002147] transition-colors duration-200 ${link.name === "Meerza Foundation" ? "p-4" : "p-5"}`}
                          >
                            <h4 className="text-slate-900 dark:text-white font-bold text-[14px] mb-1 flex items-center justify-between group-hover/item:text-white dark:group-hover/item:text-white transition-colors">
                              {item.title}
                              <ArrowRight
                                size={15}
                                className="opacity-0 -translate-x-3 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300"
                              />
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed group-hover/item:text-white dark:group-hover/item:text-white/90 transition-colors">
                              {item.desc}
                            </p>
                          </Link>
                        ))}
                      </div>

                      {link.name !== "Meerza Foundation" && (
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                          <div>
                            <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider">
                              Next Intake
                            </p>
                            <p className="text-[12px] text-slate-600 dark:text-slate-400 font-medium">
                              Spring Semester • March 2026
                            </p>
                          </div>
                          <button className="h-10 px-8 bg-[#002147] hover:bg-[#003366] text-white text-sm font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center">
                            View All Courses
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 z-[110]">
            <Link
              href="/al-ict"
              className={`hidden lg:flex px-6 py-3 text-sm font-bold rounded-3xl transition-all items-center justify-center border border-[#002147] dark:border-blue-400 text-[#002147] dark:text-blue-400 hover:bg-[#002147] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white`}
            >
              A/L ICT
            </Link>

            <Link
              href="https://lms.ivtccampus.lk"
              className={`hidden lg:flex px-6 py-3 text-sm font-bold rounded-3xl transition-all items-center justify-center bg-[#002147] hover:bg-[#003366] text-white shadow-lg`}
            >
              Login to LMS
            </Link>

            <button
              onClick={toggleMenu}
              className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full relative transition-colors ${isMenuOpen ? "bg-white text-black" : (isScrolled || pathname !== "/"
                ? "bg-slate-100 dark:bg-[#002147]/20 text-slate-900 dark:text-blue-400"
                : "bg-[#002147]/20 text-blue-400 backdrop-blur-sm")
                }`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-10001 bg-white dark:bg-[#080808] transition-all duration-300 ease-in-out lg:hidden flex flex-col ${isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-5"
          }`}
      >
        <div className="flex-1 overflow-y-auto pt-32 pb-10 px-8">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-slate-100 dark:border-white/5 last:border-0">
                {link.hasMega ? (
                  <button
                    onClick={() => toggleMobileSubMenu(link.name)}
                    className={`w-full py-5 text-xl font-bold flex items-center justify-between text-left transition-colors group ${mobileSubMenu === link.name ? "text-[#002147] dark:text-blue-400" : "text-slate-900 dark:text-white hover:text-[#002147] dark:hover:text-blue-400"
                      }`}
                  >
                    {link.name}
                    <ChevronDown
                      size={20}
                      className={`transition-all duration-300 ${mobileSubMenu === link.name ? "rotate-180 text-[#002147] dark:text-blue-400 scale-110" : "text-slate-400 dark:text-slate-600 group-hover:text-[#002147] dark:group-hover:text-blue-400 group-hover:scale-110"
                        }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`block py-5 text-xl font-bold transition-colors group ${pathname === link.href ? "text-[#002147] dark:text-blue-400" : "text-slate-900 dark:text-white hover:text-[#002147] dark:hover:text-blue-400"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      {link.name}
                      <ArrowRight size={18} className={`transition-all duration-300 transform ${pathname === link.href ? "text-current translate-x-0" : "text-slate-300 dark:text-slate-700 group-hover:translate-x-1 group-hover:text-[#002147] dark:group-hover:text-blue-400"}`} />
                    </div>
                  </Link>
                )}

                {link.hasMega && mobileSubMenu === link.name && (
                  <div className="pb-6 flex flex-col gap-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    {menuData[link.name]?.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href || "#"}
                        onClick={closeMenu}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-between group active:scale-95 transition-all"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                          <span className="text-[10px] text-slate-500 line-clamp-1">{item.desc}</span>
                        </div>
                        <ArrowRight size={14} className="text-slate-400 group-hover:text-[#002147] dark:group-hover:text-blue-400 transition-colors" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-md grid grid-cols-2 gap-4">
          <Link
            href="/al-ict"
            className="h-14 bg-slate-100 dark:bg-white/5 text-[#002147] dark:text-white font-bold rounded-2xl flex items-center justify-center text-base transition-all active:scale-[0.98]"
            onClick={closeMenu}
          >
            A/L ICT
          </Link>
          <Link
            href="https://lms.ivtccampus.lk"
            className="h-14 bg-[#002147] dark:bg-blue-600 hover:bg-[#003366] text-white font-bold rounded-2xl shadow-xl flex items-center justify-center text-base transition-all active:scale-[0.98]"
            onClick={closeMenu}
          >
            LMS Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
