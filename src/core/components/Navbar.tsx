'use client';

import { useTheme } from 'next-themes';
import { useCartStore } from '@/features/cart/application/useCartStore';
import { Dictionary } from '@/core/i18n/get-dictionary';
import { ShoppingBag, Sun, Moon, Globe, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/features/auth/application/auth.service';

export function Navbar({
  dict,
  locale,
  session,
}: {
  dict: Dictionary;
  locale: string;
  session: any;
}) {
  const { theme, setTheme } = useTheme();
  const { getTotalCount, setIsOpen } = useCartStore();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    window.location.href = newPath || `/${nextLocale}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="font-black text-2xl tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {dict.navigation.brand}
          </Link>

          <nav className="hidden md:flex items-center gap-6 font-extrabold text-sm text-zinc-700 dark:text-zinc-300">
            <Link href={`/${locale}`} className="hover:text-indigo-600 transition">
              {dict.navigation.homeLink}
            </Link>
            <Link href={`/${locale}/category/men`} className="hover:text-indigo-600 transition">
              {dict.navigation.men}
            </Link>
            <Link href={`/${locale}/category/women`} className="hover:text-indigo-600 transition">
              {dict.navigation.women}
            </Link>
            <Link href={`/${locale}/category/kids`} className="hover:text-indigo-600 transition">
              {dict.navigation.kids}
            </Link>
            <Link href={`/${locale}/shop`} className="hover:text-indigo-600 transition text-indigo-600">
              {dict.navigation.all}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-extrabold text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
            title="Toggle Language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{locale === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
            title="Toggle Theme"
          >
            <Sun className="w-5 h-5 dark:hidden" />
            <Moon className="w-5 h-5 hidden dark:block" />
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
              {getTotalCount()}
            </span>
          </button>

          {session?.user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <Link
                href={`/${locale}/dashboard`}
                className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition cursor-pointer"
                title="Management Dashboard"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
              <span className="text-xs font-extrabold text-zinc-900 dark:text-white hidden sm:block max-w-[100px] truncate">
                {session.user.name}
              </span>
              <button
                onClick={() => logoutAction()}
                className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <Link
                href={`/${locale}/dashboard`}
                className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition cursor-pointer"
                title="Management Dashboard"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/login`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-extrabold text-sm shadow hover:bg-zinc-800 dark:hover:bg-zinc-100 transition cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">{dict.navigation.login}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
