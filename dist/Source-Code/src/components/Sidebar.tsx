
'use client';

import { SidebarContent } from './SidebarContent';

export function Sidebar() {
    return (
        <aside className="flex w-full flex-col gap-6 rounded-3xl bg-white px-6 py-8 shadow-xl shadow-amber-900/5 ring-1 ring-zinc-100 sm:px-7 sm:py-8 md:w-80 lg:w-80 border border-zinc-200 sticky top-4 h-fit transition-all hover:bg-zinc-50">
            <SidebarContent />
        </aside>
    );
}

