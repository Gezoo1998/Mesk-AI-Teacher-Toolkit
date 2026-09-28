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
  ArrowLeft
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

  return (
    <>
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#2B508F]/12 blur-[120px] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-[10%] -right-[5%] w-[35%] h-[35%] bg-[#4378A0]/10 blur-[100px] rounded-full animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-[#72A2B8]/15 blur-[130px] rounded-full animate-pulse opacity-50" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <header className="relative z-10 mb-10 md:mb-14 flex flex-col items-center justify-center pt-4 md:pt-8 text-center animate-fade-in-soft">
        <div className="space-y-5 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#2B508F]/30 bg-gradient-to-r from-[#1E255E] via-[#2B508F] to-[#1E255E] px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-blue-950/20 ring-1 ring-white/20 animate-slide-up hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(114,162,184,0.9)]"></span>
            </span>
            {t('dashboard.readyToTeach')}
          </div>
          
          <div className="py-1">
            <HeroText text={t('dashboard.heroTitle')} />
          </div>

          <p className="text-xs md:text-sm text-zinc-500 font-semibold max-w-xl mx-auto leading-relaxed">
            {t('dashboard.heroDesc')}
          </p>

          {/* Interactive Feature Badges Ribbon */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 md:gap-3 text-[11px] font-bold text-zinc-600">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-zinc-200/80 shadow-xs backdrop-blur-xs hover:border-[#2B508F]/40 hover:text-[#1E255E] transition-all">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>{t('dashboard.statsTools')}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-zinc-200/80 shadow-xs backdrop-blur-xs hover:border-[#2B508F]/40 hover:text-[#1E255E] transition-all">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('dashboard.statsInstant')}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-zinc-200/80 shadow-xs backdrop-blur-xs hover:border-[#2B508F]/40 hover:text-[#1E255E] transition-all">
              <Globe className="w-3.5 h-3.5 text-cyan-600" />
              <span>{t('dashboard.statsBilingual')}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-zinc-200/80 shadow-xs backdrop-blur-xs hover:border-[#2B508F]/40 hover:text-[#1E255E] transition-all">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('dashboard.statsExport')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Command & Filter Bar */}
      <section className="relative z-20 mb-10 max-w-5xl mx-auto px-2 sm:px-4">
        <div className="p-3 md:p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-[0_16px_40px_rgba(30,37,94,0.06)] space-y-3.5">
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
                  "w-full h-11 md:h-12 rounded-2xl bg-zinc-50/80 hover:bg-zinc-50 focus:bg-white border border-zinc-200/80 focus:border-[#2B508F] text-xs md:text-sm font-bold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#2B508F]/10 transition-all",
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
              className="flex items-center justify-center gap-2 h-11 md:h-12 px-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/80 text-[#1E255E] text-xs md:text-sm font-black transition-all shadow-xs hover:shadow-md active:scale-95 shrink-0"
              title={isRTL ? "فتح أداة عشوائية لتنشيط الإلهام" : "Open a random tool for quick inspiration"}
            >
              <Dices className="w-4 h-4 text-[#2B508F]" />
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
          <div className="mt-4 flex items-center justify-between px-2 text-xs font-bold text-zinc-500">
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
      <div className="space-y-12 pb-20 relative z-10">
        {/* VIEW 1: Filtered / Search Results Grid */}
        {isFilteringActive ? (
          <section className="animate-fade-in-soft">
            {filteredTools.length > 0 ? (
              <motion.div 
                layout
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <AnimatePresence>
                  {filteredTools.map((tool) => (
                    <motion.div
                      key={tool.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
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
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white/80 rounded-3xl border border-zinc-200/80 shadow-sm max-w-lg mx-auto space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                  <Search className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-zinc-900">
                    {t('dashboard.noToolsFound')} &ldquo;{searchQuery}&rdquo;
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium">
                    {isRTL
                      ? 'جرّب البحث بكلمات عامة مثل: خطة، اختبار، تقييم، أو إلغاء تصفية الفئات.'
                      : 'Try general terms like lesson, quiz, rubric, or clear the category filters.'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#2B508F] text-white text-xs font-black shadow-md hover:bg-[#1E255E] transition-all"
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
              <section className="animate-slide-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 border border-amber-200/70 shadow-sm transition-transform hover:scale-105">
                    <Star className="w-6 h-6 fill-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">
                      {isRTL ? 'أدواتك المفضلة' : 'Your Pinned Favorites'}
                    </h2>
                    <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">
                      {isRTL ? 'وصول سريع إلى أدواتك الأكثر استخداماً' : 'Quick access to your most frequently used tools'}
                    </p>
                  </div>
                  <div className="ml-auto h-[1px] flex-grow bg-gradient-to-r from-amber-200 to-transparent max-w-[200px] hidden md:block"></div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {favoriteTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      isFavorite={true}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Section 1: Planning & Ideas */}
            <section className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm transition-transform hover:rotate-3 group-hover:scale-105">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">{t('dashboard.planningIdeas')}</h2>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">{t('dashboard.planningDesc')}</p>
                </div>
                <div className="ml-auto h-[1px] flex-grow bg-gradient-to-r from-emerald-100 to-transparent max-w-[200px] hidden md:block"></div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {planningTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </section>

            {/* Section 2: Engagement */}
            <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2B508F] border border-blue-100 shadow-sm transition-transform hover:-rotate-3 group-hover:scale-105">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">{t('dashboard.focusEngagement')}</h2>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">{t('dashboard.engagementDesc')}</p>
                </div>
                <div className="ml-auto h-[1px] flex-grow bg-gradient-to-r from-blue-100 to-transparent max-w-[200px] hidden md:block"></div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {engagementTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </section>

            {/* Section 3: Content Creation */}
            <section className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 shadow-sm transition-transform hover:rotate-3 group-hover:scale-105">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">{t('dashboard.contentCreation')}</h2>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">{t('dashboard.contentDesc')}</p>
                </div>
                <div className="ml-auto h-[1px] flex-grow bg-gradient-to-r from-purple-100 to-transparent max-w-[200px] hidden md:block"></div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {contentTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </section>

            {/* Section 4: Assessment & Feedback */}
            <section className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 shadow-sm transition-transform hover:-rotate-3 group-hover:scale-105">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">{t('dashboard.assessmentFeedback')}</h2>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">{t('dashboard.assessmentSubDesc')}</p>
                </div>
                <div className="ml-auto h-[1px] flex-grow bg-gradient-to-r from-rose-100 to-transparent max-w-[200px] hidden md:block"></div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {assessmentTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* 3-Step Guided Workflow Banner */}
      <section className="mt-10 grid gap-6 border-t border-zinc-200/80 pt-12 text-sm text-zinc-600 sm:grid-cols-3 pb-12 relative z-10">
        <div className="group relative rounded-[28px] bg-white p-7 border border-zinc-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/5 hover:border-blue-200">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/70 text-[#2B508F] font-black text-sm shadow-sm ring-1 ring-[#2B508F]/20 group-hover:scale-110 transition-transform">
            <span>01</span>
          </div>
          <p className="font-black uppercase tracking-wide text-zinc-900 text-sm">{t('dashboard.step1')}</p>
          <p className="mt-1.5 leading-relaxed text-zinc-500 font-medium">
            {t('dashboard.step1Desc')}
          </p>
        </div>
        <div className="group relative rounded-[28px] bg-white p-7 border border-zinc-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/5 hover:border-blue-200">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/70 text-[#2B508F] font-black text-sm shadow-sm ring-1 ring-[#2B508F]/20 group-hover:scale-110 transition-transform">
            <span>02</span>
          </div>
          <p className="font-black uppercase tracking-wide text-zinc-900 text-sm">{t('dashboard.step2')}</p>
          <p className="mt-1.5 leading-relaxed text-zinc-500 font-medium">
            {t('dashboard.step2Desc')}
          </p>
        </div>
        <div className="group relative rounded-[28px] bg-white p-7 border border-zinc-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/5 hover:border-blue-200">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/70 text-[#2B508F] font-black text-sm shadow-sm ring-1 ring-[#2B508F]/20 group-hover:scale-110 transition-transform">
            <span>03</span>
          </div>
          <p className="font-black uppercase tracking-wide text-zinc-900 text-sm">{t('dashboard.step3')}</p>
          <p className="mt-1.5 leading-relaxed text-zinc-500 font-medium">
            {t('dashboard.step3Desc')}
          </p>
        </div>
      </section>
    </>
  );
}
