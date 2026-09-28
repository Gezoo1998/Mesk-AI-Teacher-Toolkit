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
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#2B508F]/12 blur-[120px] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-[10%] -right-[5%] w-[35%] h-[35%] bg-[#4378A0]/10 blur-[100px] rounded-full animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-[#72A2B8]/15 blur-[130px] rounded-full animate-pulse opacity-50" style={{ animationDelay: '4s' }}></div>
        
        {/* Subtle Paper Texture / Noise if needed, but keeping it clean for now */}
      </div>

      <header className="relative z-10 mb-20 flex flex-col items-center justify-center pt-8 pb-12 text-center animate-fade-in-soft">
        <div className="space-y-6 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#2B508F]/30 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-blue-950/15 ring-1 ring-white/10 animate-slide-up hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2B508F] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2B508F] shadow-[0_0_8px_rgba(43,80,143,0.9)]"></span>
            </span>
            {t('dashboard.readyToTeach')}
          </div>
          
          <div className="py-2">
            <HeroText text={t('dashboard.heroTitle')} />
          </div>
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

      <section className="mt-20 grid gap-6 border-t border-zinc-200/80 pt-12 text-sm text-zinc-600 sm:grid-cols-3 pb-12 relative z-10">
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
