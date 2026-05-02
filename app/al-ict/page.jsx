import ALICTHero from "@/components/ALICT/ALICTHero";
import ALICTResources from "@/components/ALICT/ALICTResources";
import ALICTArchives from "@/components/ALICT/ALICTArchives";

export const metadata = {
  title: "A/L ICT Resources - IVTC Campus",
  description: "Access high-quality A/L ICT notes, video sessions, and past paper archives. Empowering Sri Lankan students with comprehensive digital learning materials.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-transparent">
      <ALICTHero />
      <ALICTResources />
      {/* <ALICTArchives /> */}
    </main>
  );
}
