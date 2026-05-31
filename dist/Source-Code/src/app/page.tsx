'use client';

import { ToolCard } from "@/components/ToolCard";
import { TOOLS } from "@/lib/data/tools";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeroText } from "@/components/ui/HeroText";
import { Rocket, Sparkles, BookOpen, ClipboardCheck } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  const planningTools = TOOLS.filter(t => t.category === 'planning');
  const engagementTools = TOOLS.filter(t => t.category === 'engagement');
  const contentTools = TOOLS.filter(t => t.category === 'content');
  const assessmentTools = TOOLS.filter(t => t.category === 'assessment');



  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
        {/* Premium Mesh Gradient / Ambient Glows */}
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-200/20 blur-[120px] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-[10%] -right-[5%] w-[35%] h-[35%] bg-emerald-200/15 blur-[100px] rounded-full animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-sky-200/15 blur-[130px] rounded-full animate-pulse opacity-50" style={{ animationDelay: '4s' }}></div>
        
        {/* Subtle Paper Texture / Noise if needed, but keeping it clean for now */}
      </div>

      <header className="relative z-10 mb-20 flex flex-col items-center justify-center pt-8 pb-16 text-center animate-fade-in-soft">
        <div className="space-y-6 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-zinc-200 ring-1 ring-white/10 animate-slide-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400"></span>
            </span>
            {t('dashboard.readyToTeach')}
          </div>
          
          <div className="py-2">
            <HeroText text={t('dashboard.heroTitle')} />
          </div>

{/* 
          <p className="mx-auto max-w-xl text-lg md:text-xl font-medium text-zinc-500 animate-slide-up delay-200 leading-relaxed">
            {t('dashboard.heroDesc')}
          </p> 
          */}

          {/* 
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-300">
            <div className="relative w-full max-w-md group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white border border-zinc-200 rounded-2xl px-5 py-3.5 shadow-sm transition-all duration-300 group-focus-within:border-amber-500 group-focus-within:ring-4 group-focus-within:ring-amber-500/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 mr-3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input 
                        type="text" 
                        placeholder={t('chat.placeholder')} 
                        className="bg-transparent border-none outline-none w-full text-sm font-semibold text-zinc-900 placeholder:text-zinc-400"
                    />
                    <div className="hidden sm:flex items-center self-center bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-0.5 ml-2">
                        <span className="text-[10px] font-bold text-zinc-400">⌘K</span>
                    </div>
                </div>
            </div>
          </div> 
          */}
        </div>
      </header>

      <div className="space-y-12 pb-20 relative z-10">
        {/* Planning & Ideas */}
        <section className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-4 mb-8">
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
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Engagement */}
        <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 shadow-sm transition-transform hover:-rotate-3 group-hover:scale-105">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-none mb-1">{t('dashboard.focusEngagement')}</h2>
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider opacity-80">{t('dashboard.engagementDesc')}</p>
            </div>
            <div className="ml-auto h-[1px] flex-grow bg-gradient-to-r from-amber-100 to-transparent max-w-[200px] hidden md:block"></div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {engagementTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Content Creation */}
        <section className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-4 mb-8">
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
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Assessment */}
        <section className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-4 mb-8">
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
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </div>

      <section className="mt-16 grid gap-6 border-t border-amber-100/50 pt-10 text-sm text-zinc-600 sm:grid-cols-3 pb-10">
        <div className="group rounded-3xl bg-white p-6 border border-zinc-100 transition-colors hover:bg-zinc-50 shadow-sm">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm">
            <span className="text-lg font-bold">1</span>
          </div>
          <p className="font-bold uppercase tracking-wide text-zinc-900">{t('dashboard.step1')}</p>
          <p className="mt-1 leading-relaxed">
            {t('dashboard.step1Desc')}
          </p>
        </div>
        <div className="group rounded-3xl bg-white p-6 border border-zinc-100 transition-colors hover:bg-zinc-50 shadow-sm">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm">
            <span className="text-lg font-bold">2</span>
          </div>
          <p className="font-bold uppercase tracking-wide text-zinc-900">{t('dashboard.step2')}</p>
          <p className="mt-1 leading-relaxed">
            {t('dashboard.step2Desc')}
          </p>
        </div>
        <div className="group rounded-3xl bg-white p-6 border border-zinc-100 transition-colors hover:bg-zinc-50 shadow-sm">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm">
            <span className="text-lg font-bold">3</span>
          </div>
          <p className="font-bold uppercase tracking-wide text-zinc-900">{t('dashboard.step3')}</p>
          <p className="mt-1 leading-relaxed">
            {t('dashboard.step3Desc')}
          </p>
        </div>
      </section>
    </>
  );
}
