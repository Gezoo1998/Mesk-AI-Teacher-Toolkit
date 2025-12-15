'use client';

import { ToolCard } from "@/components/ToolCard";
import { TOOLS } from "@/lib/data/tools";
import { useLanguage } from "@/contexts/LanguageContext";
import { HeroText } from "@/components/ui/HeroText";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br from-amber-100/40 to-yellow-50/0 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-amber-50/50 to-white/0 rounded-full blur-[100px]" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-amber-200/10 rounded-full blur-[80px] animate-float"></div>
      </div>

      <header className="relative z-10 mb-12 flex flex-col items-center justify-center gap-6 border-b border-amber-100/50 pb-10 text-center animate-fade-in-soft">
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

      <section className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {TOOLS.map((tool, index) => (
            <div key={tool.id} className="animate-slide-up" style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'both' }}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 border-t border-amber-100/50 pt-10 text-sm text-zinc-600 sm:grid-cols-3">
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
