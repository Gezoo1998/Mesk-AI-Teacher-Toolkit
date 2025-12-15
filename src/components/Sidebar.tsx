
'use client';

import { SidebarContent } from './SidebarContent';

export function Sidebar() {
    return (
        <aside className="flex w-full flex-col gap-6 rounded-3xl bg-white/60 px-6 py-8 shadow-xl shadow-amber-900/5 backdrop-blur-xl ring-1 ring-white/50 sm:px-7 sm:py-8 md:w-80 lg:w-80 border border-white/40 sticky top-4 h-fit transition-all hover:bg-white/70">
            <SidebarContent />
        </aside>
    );
}

