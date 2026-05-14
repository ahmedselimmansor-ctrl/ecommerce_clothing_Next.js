'use client';

import { Dictionary } from '@/core/i18n/get-dictionary';
import Link from 'next/link';
import { Send, Globe, Share2, MessageCircle, Mail, Sparkles } from 'lucide-react';

export function Footer({ dict, locale }: { dict: Dictionary; locale: string }) {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-12 transition">
      <div className="w-full px-4 sm:px-6 lg:px-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Link href={`/${locale}`} className="font-black text-3xl tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {dict.navigation.brand}
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium max-w-sm leading-relaxed">
              {dict.footer.slogan}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition transform hover:-translate-y-1 cursor-pointer">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition transform hover:-translate-y-1 cursor-pointer">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition transform hover:-translate-y-1 cursor-pointer">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition transform hover:-translate-y-1 cursor-pointer">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider text-sm">
              {dict.footer.explore}
            </h4>
            <ul className="space-y-3 font-semibold text-zinc-600 dark:text-zinc-400 text-sm">
              <li>
                <Link href={`/${locale}/shop?category=men`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {dict.navigation.men}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shop?category=women`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {dict.navigation.women}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shop?category=kids`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {dict.navigation.kids}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/shop`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {dict.navigation.all}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider text-sm">
              {dict.footer.company}
            </h4>
            <ul className="space-y-3 font-semibold text-zinc-600 dark:text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{dict.footer.about}</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{dict.footer.careers}</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{dict.footer.sustainability}</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider text-sm">
              {dict.footer.support}
            </h4>
            <ul className="space-y-3 font-semibold text-zinc-600 dark:text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{dict.footer.help}</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{dict.footer.returns}</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">{dict.footer.shipping}</a></li>
            </ul>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>{dict.footer.newsletter}</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-md leading-relaxed font-medium">
              {dict.footer.newsletterSub}
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-72 px-4 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm transition"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{dict.footer.subscribe}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-500 dark:text-zinc-500">
          <p>© 2026 {dict.navigation.brand}. {dict.footer.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
