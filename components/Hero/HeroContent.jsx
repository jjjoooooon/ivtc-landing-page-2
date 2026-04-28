import Link from "next/link";
import ScrollReveal from "../Animations/ScrollReveal";

const HeroContent = () => {
    return (
        <section className="relative w-full flex justify-center bg-transparent p-0 md:p-6 md:min-h-screen">
            <div className="relative pt-21 md:pt-0 w-full max-w-[1600px] h-[700px] md:h-auto md:aspect-video lg:max-h-[850px] overflow-hidden rounded-none md:rounded-[4rem] shadow-2xl bg-black transform-gpu translate-z-0">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 animate-video-zoom-out"
                >
                    <source src="/ivtc_campus.webm" type="video/webm" />
                </video>

                {/* Overlays */}
                <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-24">
                    <div className="mb-6 flex items-center gap-4 opacity-0 animate-hero-fade-up [animation-delay:200ms]">
                        <span className="w-8 md:w-12 h-[3px] bg-linear-to-r from-[#002147] to-blue-900"></span>
                        <span className="text-[10px] md:text-[11px] font-medium text-slate-200 tracking-wider">
                            IVTC Campus Sri Lanka
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight md:leading-tight max-w-4xl tracking-tight opacity-0 animate-hero-fade-up [animation-delay:400ms]">
                        Empower Your <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-200 via-white to-slate-200">Digital</span> Future.
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed opacity-0 animate-hero-fade-up [animation-delay:600ms]">
                        Master the digital landscape with Sri Lanka's leading campus for A/L ICT, Higher National Diplomas, and Global Degree Pathways. Your journey to technical excellence starts here.
                    </p>
                    <div className="mt-8 md:mt-12 opacity-0 animate-hero-fade-up [animation-delay:800ms]">
                        <Link
                            href="/#registration"
                            className="group relative h-12 px-12 bg-[#002147] text-white text-lg font-semibold rounded-3xl hover:bg-[#003366] transition-all shadow-lg flex items-center justify-center w-fit"
                        >
                            Start Learning
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroContent;
