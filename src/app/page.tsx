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
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-amber-100/40 to-yellow-50/0 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-amber-50/50 to-white/0 rounded-full blur-[100px]" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-amber-200/10 rounded-full blur-[80px] animate-float"></div>
      </div>

      <header className="relative z-10 mb-16 flex flex-col items-center justify-center gap-6 border-b border-amber-100/50 pb-12 text-center animate-fade-in-soft">
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/50 px-4 py-1.5 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-500/20 animate-slide-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
            </span>
            {t('dashboard.readyToTeach')}
          </div>
          <div className="py-2">
            <HeroText text={t('dashboard.heroTitle')} />
          </div>
          <p className="mx-auto max-w-xl text-lg text-zinc-600 animate-slide-up delay-200">
            {t('dashboard.heroDesc')}
          </p>
        </div>
      </header>

      <div className="space-y-16 pb-20 relative z-10">
        {/* Planning & Ideas */}
        <section className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 shadow-sm">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight">{t('dashboard.planningIdeas')}</h2>
              <p className="text-sm text-zinc-500 font-medium">{t('dashboard.planningDesc')}</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {planningTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Engagement */}
        <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight">{t('dashboard.focusEngagement')}</h2>
              <p className="text-sm text-zinc-500 font-medium">{t('dashboard.engagementDesc')}</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {engagementTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Content Creation */}
        <section className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight">{t('dashboard.contentCreation')}</h2>
              <p className="text-sm text-zinc-500 font-medium">{t('dashboard.contentDesc')}</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {contentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Assessment */}
        <section className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 shadow-sm">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight">{t('dashboard.assessmentFeedback')}</h2>
              <p className="text-sm text-zinc-500 font-medium">{t('dashboard.assessmentSubDesc')}</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {assessmentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </div>

      <section className="mt-16 grid gap-6 border-t border-amber-100/50 pt-10 text-sm text-zinc-600 sm:grid-cols-3 pb-10">
        <div className="group rounded-3xl bg-white/40 p-6 backdrop-blur-sm transition-colors hover:bg-white/60">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm">
            <span className="text-lg font-bold">1</span>
          </div>
          <p className="font-bold uppercase tracking-wide text-zinc-900">{t('dashboard.step1')}</p>
          <p className="mt-1 leading-relaxed">
            {t('dashboard.step1Desc')}
          </p>
        </div>
        <div className="group rounded-3xl bg-white/40 p-6 backdrop-blur-sm transition-colors hover:bg-white/60">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm">
            <span className="text-lg font-bold">2</span>
          </div>
          <p className="font-bold uppercase tracking-wide text-zinc-900">{t('dashboard.step2')}</p>
          <p className="mt-1 leading-relaxed">
            {t('dashboard.step2Desc')}
          </p>
        </div>
        <div className="group rounded-3xl bg-white/40 p-6 backdrop-blur-sm transition-colors hover:bg-white/60">
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
