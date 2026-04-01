import React, { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import VerifyForm from "../../components/Verify/VerifyForm";

/**
 * Server-side function to fetch certificate data
 */
async function getCertificateData(code) {
  if (!code) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/public/certifications/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verification_code: code }),
      // Use cache: 'no-store' for real-time verification status
      cache: 'no-store'
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    return { status: "error", message: "Network error occurred." };
  }
}

const CertificateValidatorPage = async ({ searchParams }) => {
  const { code } = await searchParams;
  const initialResult = await getCertificateData(code);

  const headerContent = (
    <header className="text-center mt-10 mb-10 md:mb-14 space-y-4">
      <div className="flex justify-center mb-6">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#002147] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#002147]/20">
          <ShieldCheck size={28} />
        </div>
      </div>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
        Verify Your{" "}
        <span className="text-[#002147] dark:text-blue-400">
          Certificate
        </span>
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
        Enter your unique Certificate ID to instantly confirm the
        authenticity of your IVTC qualification.
      </p>
    </header>
  );

  const footerContent = (
    <p className="mt-10 text-center text-[10px] sm:text-xs text-slate-400 leading-relaxed px-4">
      The IVTC Online Validation System provides secure confirmation of
      academic credentials.
      <br className="hidden sm:block" />
      Unauthorized use of this portal is strictly prohibited.
    </p>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 md:pt-40 pb-20">
        {headerContent}
        <VerifyForm initialCode={code} initialResult={initialResult} />
        {footerContent}
      </div>
    </div>
  );
};

export default CertificateValidatorPage;
