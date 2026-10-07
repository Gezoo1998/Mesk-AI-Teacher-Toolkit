'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ToolCard } from "@/components/ToolCard";
import { TOOLS, Tool } from "@/lib/data/tools";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeroText } from "@/components/ui/HeroText";
import {
  Rocket,
  Sparkles,
  BookOpen,
  ClipboardCheck,
  Search,
  X,
  Star,
  Dices,
  Zap,
  Globe,
  FileCheck2,
  Layers,
  ArrowRight,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryFilter = 'all' | 'favorites' | 'planning' | 'engagement' | 'content' | 'assessment';

export default function Home() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const isRTL = language === 'ar';
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem('almanhal-favorite-tools');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => {
      const next = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      try {
        localStorage.setItem('almanhal-favorite-tools', JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save favorites", e);
      }
      return next;
    });
  };

  // Keyboard shortcut listener (/ or Ctrl+K to search, Esc to clear)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Category tool subsets
  const planningTools = useMemo(() => TOOLS.filter(t => t.category === 'planning'), []);
  const engagementTools = useMemo(() => TOOLS.filter(t => t.category === 'engagement'), []);
  const contentTools = useMemo(() => TOOLS.filter(t => t.category === 'content'), []);
  const assessmentTools = useMemo(() => TOOLS.filter(t => t.category === 'assessment'), []);
  const favoriteTools = useMemo(() => TOOLS.filter(t => favorites.includes(t.id)), [favorites]);

  // Filtered tools based on search and category
  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      // Category match
      if (selectedCategory === 'favorites' && !favorites.includes(tool.id)) {
        return false;
      }
      if (selectedCategory !== 'all' && selectedCategory !== 'favorites' && tool.category !== selectedCategory) {
        return false;
      }

      // Search match (title, description, tags, id)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const localizedTitle = t(`tools.${tool.id}.title`).toLowerCase();
        const localizedDesc = t(`tools.${tool.id}.description`).toLowerCase();
        const tagMatch = tool.tags.some(tag => tag.toLowerCase().includes(q));
        const idMatch = tool.id.toLowerCase().includes(q);

        return localizedTitle.includes(q) || localizedDesc.includes(q) || tagMatch || idMatch;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, favorites, t]);

  // Random tool launcher
  const handleRandomTool = () => {
    const randomIndex = Math.floor(Math.random() * TOOLS.length);
    const chosen = TOOLS[randomIndex];
    if (chosen) {
      router.push(chosen.href);
    }
  };

  const categories: { id: CategoryFilter; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'all', label: t('dashboard.allTools'), icon: <Layers className="w-3.5 h-3.5" />, count: TOOLS.length },
    ...(favorites.length > 0 ? [{ id: 'favorites' as CategoryFilter, label: t('dashboard.favorites'), icon: <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />, count: favorites.length }] : []),
    { id: 'planning', label: t('dashboard.planningIdeas'), icon: <Rocket className="w-3.5 h-3.5 text-emerald-500" />, count: planningTools.length },
    { id: 'engagement', label: t('dashboard.focusEngagement'), icon: <Sparkles className="w-3.5 h-3.5 text-blue-500" />, count: engagementTools.length },
    { id: 'content', label: t('dashboard.contentCreation'), icon: <BookOpen className="w-3.5 h-3.5 text-purple-500" />, count: contentTools.length },
    { id: 'assessment', label: t('dashboard.assessmentFeedback'), icon: <ClipboardCheck className="w-3.5 h-3.5 text-rose-500" />, count: assessmentTools.length },
  ];

  const isFilteringActive = searchQuery.trim() !== '' || selectedCategory !== 'all';

  const quickSearchSuggestions = isRTL ? [
    'خطة درس',
    'اختبار قصير',
    'أنشطة تفاعلية',
    'جدول مواصفات'
  ] : [
    'Lesson Plan',
    'Quiz',
    'Interactive Hook',
    'Rubric'
  ];

  return (
    <>
      {/* Hero Section */}
      <header className="relative z-10 mb-8 sm:mb-12 flex flex-col items-center justify-center pt-2 sm:pt-6 md:pt-8 text-center animate-fade-in-soft">
        <div className="space-y-4 sm:space-y-5 max-w-3xl mx-auto px-4">
          
          {/* Institutional Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200/80 bg-gradient-to-r from-blue-50/90 via-white to-blue-50/90 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#1E255E] shadow-sm hover:shadow-md hover:border-[#2B508F]/40 transition-all duration-300 ring-1 ring-blue-900/5 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2B508F] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2B508F] shadow-[0_0_8px_rgba(43,80,143,0.9)]"></span>
            </span>
            {t('dashboard.readyToTeach')}
          </div>
          
          {/* Main Hero Title */}
          <div className="py-0.5 sm:py-1">
            <HeroText text={t('dashboard.heroTitle')} />
          </div>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
            {t('dashboard.heroDesc')}
          </p>

          {/* Interactive Feature Badges Ribbon */}
          <div className="pt-2 flex justify-center">
            <div className="p-1 sm:p-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-zinc-200/80 shadow-[0_4px_24px_rgba(30,37,94,0.04)] inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 ring-1 ring-black/[0.02]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-700 hover:text-[#1E255E] hover:bg-blue-50/50 transition-all cursor-default">
                <span className="h-2 w-2 rounded-full bg-blue-500 shadow-xs"></span>
                <span>{t('dashboard.statsTools')}</span>
              </div>
              <div className="h-3 w-px bg-zinc-200 hidden sm:block" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-700 hover:text-[#1E255E] hover:bg-amber-50/50 transition-all cursor-default">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('dashboard.statsInstant')}</span>
              </div>
              <div className="h-3 w-px bg-zinc-200 hidden sm:block" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-700 hover:text-[#1E255E] hover:bg-cyan-50/50 transition-all cursor-default">
                <Globe className="w-3.5 h-3.5 text-cyan-600" />
                <span>{t('dashboard.statsBilingual')}</span>
              </div>
              <div className="h-3 w-px bg-zinc-200 hidden sm:block" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-700 hover:text-[#1E255E] hover:bg-emerald-50/50 transition-all cursor-default">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('dashboard.statsExport')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Command & Filter Bar */}
      <section className="relative z-20 mb-10 md:mb-14 max-w-5xl mx-auto px-2 sm:px-4">
        <div className="p-3.5 sm:p-4 md:p-5 rounded-[28px] bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-[0_20px_50px_rgba(30,37,94,0.06)] ring-1 ring-black/[0.02] space-y-3.5">
          {/* Top Row: Search Input + Surprise Me Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1 group">
              <Search className={cn(
                "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#2B508F] transition-colors pointer-events-none",
                isRTL ? "right-4" : "left-4"
              )} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('dashboard.searchPlaceholder')}
                className={cn(
                  "w-full h-12 md:h-13 rounded-2xl bg-zinc-50/80 hover:bg-zinc-50 focus:bg-white border border-zinc-200/80 focus:border-[#2B508F] text-xs md:text-sm font-bold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#2B508F]/10 transition-all",
                  isRTL ? "pr-11 pl-20" : "pl-11 pr-20"
                )}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <div className={cn(
                "absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5",
                isRTL ? "left-3" : "right-3"
              )}>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/70 transition-colors"
                    title={t('dashboard.resetSearch')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-lg bg-zinc-200/60 border border-zinc-300/60 text-[10px] font-mono font-bold text-zinc-500 shadow-2xs">
                  /
                </kbd>
              </div>
            </div>

            {/* Surprise Me / Random Tool Button */}
            <button
              onClick={handleRandomTool}
              className="flex items-center justify-center gap-2.5 h-12 md:h-13 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/80 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/90 text-[#1E255E] text-xs sm:text-sm font-black transition-all shadow-xs hover:shadow-md active:scale-95 shrink-0 group"
              title={isRTL ? "فتح أداة عشوائية لتنشيط الإلهام" : "Open a random tool for quick inspiration"}
            >
              <Dices className="w-4 h-4 text-[#2B508F] transition-transform duration-500 group-hover:rotate-180" />
              <span>{t('dashboard.randomTool')}</span>
            </button>
          </div>

          {/* Bottom Row: Animated Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 active:scale-95",
                    isActive
                      ? "text-white shadow-md shadow-[#1E255E]/15"
                      : "text-zinc-600 hover:text-zinc-900 bg-zinc-100/70 hover:bg-zinc-100 border border-transparent"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1E255E] to-[#2B508F]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.icon}</span>
                  <span className="relative z-10">{cat.label}</span>
                  <span className={cn(
                    "relative z-10 px-1.5 py-0.2 rounded-md text-[10px] font-black",
                    isActive ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-600"
                  )}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter status header if active */}
        {isFilteringActive && (
          <div className="mt-3 flex items-center justify-between px-3 text-xs font-bold text-zinc-500">
            <span>
              {filteredTools.length} {t('dashboard.activeToolsCount')}
              {searchQuery && (
                <span> • &ldquo;{searchQuery}&rdquo;</span>
              )}
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-[#2B508F] hover:underline"
            >
              {t('dashboard.resetSearch')}
            </button>
          </div>
        )}
      </section>

      {/* Main Content Area */}
      <div className="space-y-14 md:space-y-18 pb-16 relative z-10">
        {/* VIEW 1: Filtered / Search Results Grid */}
        {isFilteringActive ? (
          <section className="animate-fade-in-soft">
            {filteredTools.length > 0 ? (
              <motion.div 
                layout
                className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
              >
                <AnimatePresence>
                  {filteredTools.map((tool, idx) => (
                    <motion.div
                      key={tool.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                    >
                      <ToolCard
                        tool={tool}
                        isFavorite={favorites.includes(tool.id)}
                        onToggleFavorite={toggleFavorite}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white/90 backdrop-blur-md rounded-3xl border border-zinc-200/90 shadow-sm max-w-lg mx-auto space-y-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#2B508F] border border-blue-100 shadow-sm">
                  <Search className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-zinc-900">
                    {t('dashboard.noToolsFound')} &ldquo;{searchQuery}&rdquo;
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed">
                    {isRTL
                      ? 'لم نعثر على أدوات تطابق هذا البحث. يمكنك تجربة أحد الكلمات المقترحة أدناه:'
                      : 'No tools match this search. Try one of the popular quick searches below:'}
                  </p>
                </div>

                {/* Quick suggestions */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {quickSearchSuggestions.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-blue-50 text-zinc-700 hover:text-[#2B508F] border border-zinc-200 text-xs font-bold transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1E255E] to-[#2B508F] text-white text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  {t('dashboard.resetSearch')}
                </button>
              </div>
            )}
          </section>
        ) : (
          /* VIEW 2: Default Categorized Sections with Optional Pinned Favorites */
          <>
            {/* Pinned Favorites Section (if teacher has starred any tools) */}
            {isMounted && favoriteTools.length > 0 && (
              <section className="scroll-mt-24 animate-slide-up">
                <div className="flex items-center gap-3.5 sm:gap-4 mb-6 md:mb-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 border border-amber-200/80 shadow-xs transition-transform hover:scale-105">
                    <Star className="w-6 h-6 fill-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">
                        {isRTL ? 'أدواتك المفضلة' : 'Your Pinned Favorites'}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-50 text-amber-700 border border-amber-200/70">
                        {favoriteTools.length} {isRTL ? 'أدوات' : 'tools'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">
                      {isRTL ? 'وصول سريع إلى أدواتك الأكثر استخداماً' : 'Quick access to your most frequently used tools'}
                    </p>
                  </div>
                  <div className="ml-auto h-[1.5px] flex-grow bg-gradient-to-r from-amber-200 via-amber-100/40 to-transparent hidden md:block rtl:bg-gradient-to-l"></div>
                </div>
                <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                  {favoriteTools.map((tool, idx) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                    >
                      <ToolCard
                        tool={tool}
                        isFavorite={true}
                        onToggleFavorite={toggleFavorite}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 1: Planning & Ideas */}
            <section className="scroll-mt-24">
              <div className="flex items-center gap-3.5 sm:gap-4 mb-6 md:mb-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-xs transition-transform hover:rotate-3">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">
                      {t('dashboard.planningIdeas')}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                      {planningTools.length} {isRTL ? 'أدوات' : 'tools'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">
                    {t('dashboard.planningDesc')}
                  </p>
                </div>
                <div className="ml-auto h-[1.5px] flex-grow bg-gradient-to-r from-emerald-200 via-emerald-100/40 to-transparent hidden md:block rtl:bg-gradient-to-l"></div>
              </div>
              <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {planningTools.map((tool, idx) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                  >
                    <ToolCard
                      tool={tool}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Section 2: Engagement */}
            <section className="scroll-mt-24">
              <div className="flex items-center gap-3.5 sm:gap-4 mb-6 md:mb-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2B508F] border border-blue-200/80 shadow-xs transition-transform hover:-rotate-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">
                      {t('dashboard.focusEngagement')}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-blue-50 text-[#1E255E] border border-blue-200/70">
                      {engagementTools.length} {isRTL ? 'أدوات' : 'tools'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">
                    {t('dashboard.engagementDesc')}
                  </p>
                </div>
                <div className="ml-auto h-[1.5px] flex-grow bg-gradient-to-r from-blue-200 via-blue-100/40 to-transparent hidden md:block rtl:bg-gradient-to-l"></div>
              </div>
              <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {engagementTools.map((tool, idx) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                  >
                    <ToolCard
                      tool={tool}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Section 3: Content Creation */}
            <section className="scroll-mt-24">
              <div className="flex items-center gap-3.5 sm:gap-4 mb-6 md:mb-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200/80 shadow-xs transition-transform hover:rotate-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">
                      {t('dashboard.contentCreation')}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-purple-50 text-purple-700 border border-purple-200/70">
                      {contentTools.length} {isRTL ? 'أدوات' : 'tools'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">
                    {t('dashboard.contentDesc')}
                  </p>
                </div>
                <div className="ml-auto h-[1.5px] flex-grow bg-gradient-to-r from-purple-200 via-purple-100/40 to-transparent hidden md:block rtl:bg-gradient-to-l"></div>
              </div>
              <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {contentTools.map((tool, idx) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                  >
                    <ToolCard
                      tool={tool}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Section 4: Assessment & Feedback */}
            <section className="scroll-mt-24">
              <div className="flex items-center gap-3.5 sm:gap-4 mb-6 md:mb-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/80 shadow-xs transition-transform hover:-rotate-3">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">
                      {t('dashboard.assessmentFeedback')}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-50 text-rose-700 border border-rose-200/70">
                      {assessmentTools.length} {isRTL ? 'أدوات' : 'tools'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">
                    {t('dashboard.assessmentSubDesc')}
                  </p>
                </div>
                <div className="ml-auto h-[1.5px] flex-grow bg-gradient-to-r from-rose-200 via-rose-100/40 to-transparent hidden md:block rtl:bg-gradient-to-l"></div>
              </div>
              <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {assessmentTools.map((tool, idx) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                  >
                    <ToolCard
                      tool={tool}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* 3-Step Guided Workflow Banner */}
      <section className="mt-6 md:mt-10 border-t border-zinc-200/80 pt-12 md:pt-16 pb-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-10 max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 text-[#2B508F] border border-blue-200/70 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xs">
            <Zap className="w-3 h-3 text-[#2B508F]" />
            <span>{isRTL ? 'سير العمل الأكاديمي السريع' : 'Streamlined Pedagogical Workflow'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
            {isRTL ? 'كيف تبدأ في 3 خطوات بسيطة' : 'How It Works in 3 Simple Steps'}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed">
            {isRTL ? 'صُممت أدوات المنهل لتوفير وقت المعلم ورفع كفاءة التخطيط الصفي والتفاعل اليومي' : 'Designed to save teachers preparation hours and elevate daily classroom engagement'}
          </p>
        </div>

        {/* 3 Connected Step Cards */}
        <div className="grid gap-6 sm:grid-cols-3 relative">
          {/* Step 1 */}
          <div className="group relative rounded-[28px] bg-white/95 backdrop-blur-sm p-7 border border-zinc-200/80 shadow-[0_8px_30px_rgba(30,37,94,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/8 hover:border-blue-300">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E255E] to-[#2B508F] text-white font-black text-sm shadow-md shadow-blue-900/25 ring-4 ring-blue-50 group-hover:scale-110 transition-transform">
              <span>01</span>
            </div>
            <p className="font-black uppercase tracking-wide text-zinc-900 text-sm">{t('dashboard.step1')}</p>
            <p className="mt-1.5 leading-relaxed text-zinc-500 text-xs sm:text-sm font-medium">
              {t('dashboard.step1Desc')}
            </p>
          </div>

          {/* Step 2 */}
          <div className="group relative rounded-[28px] bg-white/95 backdrop-blur-sm p-7 border border-zinc-200/80 shadow-[0_8px_30px_rgba(30,37,94,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/8 hover:border-blue-300">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E255E] to-[#2B508F] text-white font-black text-sm shadow-md shadow-blue-900/25 ring-4 ring-blue-50 group-hover:scale-110 transition-transform">
              <span>02</span>
            </div>
            <p className="font-black uppercase tracking-wide text-zinc-900 text-sm">{t('dashboard.step2')}</p>
            <p className="mt-1.5 leading-relaxed text-zinc-500 text-xs sm:text-sm font-medium">
              {t('dashboard.step2Desc')}
            </p>
          </div>

          {/* Step 3 */}
          <div className="group relative rounded-[28px] bg-white/95 backdrop-blur-sm p-7 border border-zinc-200/80 shadow-[0_8px_30px_rgba(30,37,94,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/8 hover:border-blue-300">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E255E] to-[#2B508F] text-white font-black text-sm shadow-md shadow-blue-900/25 ring-4 ring-blue-50 group-hover:scale-110 transition-transform">
              <span>03</span>
            </div>
            <p className="font-black uppercase tracking-wide text-zinc-900 text-sm">{t('dashboard.step3')}</p>
            <p className="mt-1.5 leading-relaxed text-zinc-500 text-xs sm:text-sm font-medium">
              {t('dashboard.step3Desc')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
