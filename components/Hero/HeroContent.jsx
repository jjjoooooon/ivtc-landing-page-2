import Link from "next/link";
import ScrollReveal from "../Animations/ScrollReveal";
import DOMPurify from "isomorphic-dompurify";

const decodeHtml = (html) => {
    if (!html) return "";
    return html
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&nbsp;/g, " ")
        .replace(/&ldquo;/g, "“")
        .replace(/&rdquo;/g, "”")
        .replace(/&rsquo;/g, "’")
        .replace(/&lsquo;/g, "‘")
        .replace(/&ndash;/g, "–")
        .replace(/&mdash;/g, "—")
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/\r\n/g, "<br />")
        .replace(/\n/g, "<br />");
};

const HeroContent = ({ data }) => {
    const rawDecoded = data?.description ? decodeHtml(data.description) : "";
    const decodedDescription = DOMPurify.sanitize(rawDecoded);

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
                            {data?.tagline || "IVTC Campus Sri Lanka"}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight md:leading-tight max-w-4xl tracking-tight opacity-0 animate-hero-fade-up [animation-delay:400ms]">
                        {data?.title || "Empower Your Digital Future."}
                    </h1>
                    <div 
                        className="mt-6 text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed opacity-0 animate-hero-fade-up [animation-delay:600ms]
                            [&_p]:mb-3 [&_p:last-child]:mb-0
                            [&_strong]:font-bold [&_strong]:text-white
                            [&_em]:italic
                            [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:mb-2
                            [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:mb-2
                            [&_li]:mb-1
                            [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
                            [&_blockquote_p]:block [&_blockquote_p]:mb-2
                            [&_blockquote_footer]:block [&_blockquote_footer]:mt-3 [&_blockquote_footer]:text-sm [&_blockquote_footer]:text-slate-400
                            [&_br]:block [&_br]:content-[''] [&_br]:mt-1"
                        dangerouslySetInnerHTML={{ __html: decodedDescription || "Master the digital landscape with Sri Lanka's leading campus for A/L ICT, Higher National Diplomas, and Global Degree Pathways. Your journey to technical excellence starts here." }}
                    />
                    <div className="mt-8 md:mt-12 opacity-0 animate-hero-fade-up [animation-delay:800ms]">
                        <Link
                            href={data?.cta_link || "/#registration"}
                            className="group relative h-12 px-12 bg-[#002147] text-white text-lg font-semibold rounded-3xl hover:bg-[#003366] transition-all shadow-lg flex items-center justify-center w-fit"
                        >
                            {data?.cta_text || "Start Learning"}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroContent;
