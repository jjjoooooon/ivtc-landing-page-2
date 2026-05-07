import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "sonner";

import SocialSidebar from "./Components/SocialSidebar";
import WhatsAppButton from "./Components/WhatsAppButton";
import Navbar from "../components/Navbar/Navbar";
import Footer from "./sections/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});



export const metadata = {
  title: "IVTC Campus | Sri Lanka's Premier ICT & Technology Education Provider",
  description: "Join IVTC Campus Sri Lanka for A/L ICT, Higher National Diplomas (HND), and Global Degree Pathways. Empower your digital future with expert-led courses in Software Engineering, Data Science, Cyber Security, and more.",
  keywords: ["IVTC Campus", "ICT Education Sri Lanka", "A/L ICT", "Higher National Diploma", "HND Sri Lanka", "Software Engineering Courses", "Data Science Sri Lanka", "Cyber Security Education"],
  icons: {
    icon: "/ivtc_favicon_white.png",
    shortcut: "/ivtc_favicon_white.png",
    apple: "/ivtc_favicon_white.png",
  },
  openGraph: {
    title: "IVTC Campus | Empower Your Digital Future",
    description: "Sri Lanka's leading campus for ICT, HND, and Global Degree Pathways.",
    url: "https://ivtccampus.lk",
    siteName: "IVTC Campus",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

async function getFooterData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) return null;
    
    const res = await fetch(`${baseUrl}/public/cms/footer`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.error("Error fetching footer CMS data:", error);
    return null;
  }
}

export default async function RootLayout({ children }) {
  const footerData = await getFooterData();

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Navbar />
          <SocialSidebar cmsData={footerData?.socials} />
          <Toaster position="top-center" richColors />
          {/* <WhatsAppButton /> */}
          <main className="min-h-screen">
            {children}
          </main>
          <Footer cmsData={footerData} />

        </ThemeProvider>
      </body>
    </html>
  );
}
