"use client";

import { 
  FileText, Youtube, Download, Video, BookOpen, ArrowRight, ChevronDown,
  Presentation, Headphones, Book, Radio, ExternalLink, Loader2, Play
} from "lucide-react";
import ScrollReveal from "@/components/Animations/ScrollReveal";
import { useEffect, useMemo, useState } from "react";

const ALICTResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${baseUrl}/public/learning-materials`);
        if (!res.ok) throw new Error("Failed to fetch resources");
        const result = await res.json();
        
        // Map API data to our component format
        const mappedData = (result?.data?.data || []).map(item => {
          const externalUrl = item.external_url;
          const youtubeId = externalUrl?.includes("youtube.com") || externalUrl?.includes("youtu.be") 
            ? externalUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1]
            : null;

          return {
            id: item.id,
            title: item.subject_name,
            description: item.description,
            category: item.material_type,
            year: item.batch?.name ? item.batch.name.match(/\d+/)?.[0] : "Other",
            batchFull: item.batch?.name || "Other",
            file_url: item.file_path ? `https://api.ivtccampus.lk/${item.file_path}` : null,
            external_url: externalUrl,
            youtubeId: youtubeId,
            uploaded_date: item.uploaded_date
          };
        });
        
        setResources(mappedData);
      } catch (error) {
        console.error("Error fetching learning materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const batches = useMemo(() => {
    const years = [...new Set(resources.map(res => res.year))].sort((a, b) => b - a);
    return ["all", ...years];
  }, [resources]);

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      let categoryMatch = activeTab === "all";
      if (!categoryMatch) {
        if (activeTab === "notes") {
          categoryMatch = ["notes", "handout", "ebook", "slides"].includes(res.category);
        } else if (activeTab === "videos") {
          categoryMatch = ["video", "youtube", "live_class"].includes(res.category);
        } else {
          categoryMatch = res.category === activeTab;
        }
      }
      
      const batchMatch = selectedBatch === "all" || res.year === selectedBatch;
      return categoryMatch && batchMatch;
    });
  }, [activeTab, selectedBatch, resources]);

  const getIcon = (type) => {
    switch (type) {
      case 'notes': return <FileText size={20} />;
      case 'video': return <Video size={20} />;
      case 'youtube': return <Youtube size={20} />;
      case 'slides': return <Presentation size={20} />;
      case 'handout': return <FileText size={20} />;
      case 'podcast': return <Headphones size={20} />;
      case 'ebook': return <Book size={20} />;
      case 'live_class': return <Radio size={20} />;
      case 'link': return <ExternalLink size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const getCardTheme = (category) => {
    switch (category) {
      case 'video':
      case 'youtube':
      case 'live_class':
        return 'from-blue-600/20 to-indigo-600/20 text-blue-600 dark:text-blue-400';
      case 'notes':
      case 'handout':
      case 'ebook':
        return 'from-emerald-600/20 to-teal-600/20 text-emerald-600 dark:text-emerald-400';
      case 'slides':
        return 'from-orange-600/20 to-amber-600/20 text-orange-600 dark:text-orange-400';
      case 'podcast':
        return 'from-purple-600/20 to-pink-600/20 text-purple-600 dark:text-purple-400';
      default:
        return 'from-slate-600/20 to-slate-800/20 text-slate-600 dark:text-slate-400';
    }
  };

  const handleWatch = (res) => {
    const url = res.external_url || res.file_url;
    if (res.category === 'youtube') {
      window.open(url, '_blank');
    } else {
      setSelectedVideo(url);
    }
  };

  const getActionButton = (res) => {
    const isVideo = ["video", "youtube", "live_class"].includes(res.category);
    const url = res.external_url || res.file_url;
    
    if (isVideo) {
      return (
        <button 
          onClick={() => handleWatch(res)}
          className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-all group-hover:scale-[1.02] active:scale-95 shadow-lg"
        >
          <Play size={18} fill="currentColor" /> {res.category === 'youtube' ? 'Watch on YouTube' : 'Watch Session'}
        </button>
      );
    }

    return (
      <a 
        href={url} 
        download
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full py-4 rounded-xl bg-[#002147] dark:bg-blue-600 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/10 group-hover:scale-[1.02] active:scale-95"
      >
        <Download size={18} /> Download {res.category.charAt(0).toUpperCase() + res.category.slice(1)}
      </a>
    );
  };

  return (
    <section id="resources" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#002147]/10 dark:bg-blue-500/10 flex items-center justify-center text-[#002147] dark:text-blue-400">
              <BookOpen size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Learning Materials</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 w-full sm:w-auto overflow-x-auto no-scrollbar">
              {["all", "notes", "videos"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-6 md:px-8 py-2.5 rounded-xl text-xs md:text-[13px] font-bold tracking-wide transition-all ${
                    activeTab === tab 
                      ? "bg-[#002147] dark:bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-auto min-w-[140px]">
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full appearance-none bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-6 py-3 rounded-2xl text-xs md:text-[13px] font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002147]/20 dark:focus:ring-blue-500/20 transition-all cursor-pointer"
              >
                {batches.map((batch) => (
                  <option key={batch} value={batch} className="bg-white dark:bg-[#111]">
                    {batch === "all" ? "All Batches" : `AL ${batch} Batch`}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400">
            <Loader2 size={40} className="animate-spin mb-4 text-[#002147] dark:text-blue-500" />
            <p className="font-medium">Loading materials...</p>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredResources.map((res, i) => (
              <ScrollReveal key={res.id || i} animationClass="animate-fade-in" options={{ delay: (i % 4) * 0.1 }}>
                <div className="group bg-white dark:bg-[#0c0c0c] rounded-[2rem] border border-slate-200 dark:border-white/5 hover:border-[#002147]/30 dark:hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col overflow-hidden shadow-sm hover:shadow-2xl">
                  {/* Visual Header Section (Top Half) - 16:9 Ratio */}
                  <div className="relative aspect-video overflow-hidden">
                    {/* Background Content */}
                    {res.category === 'video' && res.file_url ? (
                      <video 
                        src={res.file_url} 
                        muted 
                        loop 
                        autoPlay 
                        playsInline
                        controlsList="nodownload"
                        disablePictureInPicture
                        onContextMenu={(e) => e.preventDefault()}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                      />
                    ) : res.category === 'youtube' && res.youtubeId ? (
                      <img 
                        src={`https://img.youtube.com/vi/${res.youtubeId}/maxresdefault.jpg`}
                        alt={res.title}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${res.youtubeId}/0.jpg`;
                        }}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getCardTheme(res.category)} flex items-center justify-center`}>
                        <div className="relative">
                          <div className="absolute inset-0 blur-3xl opacity-20 bg-current scale-150" />
                          <div className="relative opacity-40 scale-[2.5]">
                            {getIcon(res.category)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Video Indicator */}
                    {["video", "youtube", "live_class"].includes(res.category) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={() => handleWatch(res)}
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#002147] transition-all duration-500 shadow-2xl"
                        >
                          <Play size={16} fill="currentColor" className="ml-0.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content Section (Bottom Half) */}
                  <div className="p-5 md:p-6 flex flex-col flex-grow relative">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {/* Icon & Type Tag */}
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                        {getIcon(res.category)}
                        {res.category.replace('_', ' ')}
                      </div>
                      
                      {/* Batch Tag */}
                      <div className="px-2 py-0.5 rounded-md bg-[#002147]/5 dark:bg-blue-500/5 text-[9px] font-bold text-[#002147] dark:text-blue-400 tracking-wide border border-[#002147]/10 dark:border-blue-500/10">
                        {res.batchFull}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white group-hover:text-[#002147] dark:group-hover:text-blue-400 transition-all leading-tight">
                      {res.title}
                    </h3>
                    
                    <p className="text-slate-500 dark:text-slate-400 text-[12px] leading-relaxed line-clamp-2 mb-5 font-medium">
                      {res.description || "Access high-quality learning materials for this topic."}
                    </p>
                    
                    <div className="mt-auto">
                      {getActionButton(res)}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal className="py-24 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-50 dark:bg-white/5 text-slate-300 dark:text-slate-600 mb-6">
              <BookOpen size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Resources Found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              We couldn't find any materials matching your current filters. Try selecting a different batch or category.
            </p>
          </ScrollReveal>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10">
          <button 
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
          >
            <BookOpen className="rotate-45" size={32} />
          </button>
          
          <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative">
            <video 
              src={selectedVideo} 
              controls 
              autoPlay
              controlsList="nodownload"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full"
            />
          </div>
          
          {/* Overlay to further discourage right-click on the video itself */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            onContextMenu={(e) => e.preventDefault()} 
          />
        </div>
      )}
    </section>
  );
};

export default ALICTResources;


