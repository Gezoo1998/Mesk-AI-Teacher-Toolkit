
'use client';

import { SidebarContent } from './SidebarContent';

export function Sidebar() {
    return (
        <aside className="flex w-full flex-col gap-6 rounded-[2rem] bg-white/95 backdrop-blur-xl px-6 py-8 shadow-[0_20px_45px_rgba(30,37,94,0.06)] border border-zinc-200/80 sticky top-4 h-fit transition-all sm:px-7 sm:py-8 md:w-80 lg:w-80 ring-1 ring-black/[0.03]">
            <SidebarContent />
        </aside>
    );
}

