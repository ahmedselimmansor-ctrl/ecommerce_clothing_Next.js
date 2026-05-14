'use client';

import { CategoryEntity } from '../domain/product.entity';
import { Dictionary } from '@/core/i18n/get-dictionary';
import Link from 'next/link';

export function CategoryFilter({
  categories,
  currentCategory,
  dict,
  locale,
}: {
  categories: CategoryEntity[];
  currentCategory?: string;
  dict: Dictionary;
  locale: string;
}) {
  const activeCat = currentCategory || 'all';

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
      <span className="text-sm font-bold text-zinc-500 whitespace-nowrap hidden sm:block">
        {dict.catalog.filters}:
      </span>
      <Link
        href={`/${locale}/shop`}
        className={`px-5 py-2.5 rounded-full text-sm font-extrabold whitespace-nowrap transition shadow-sm ${
          activeCat === 'all'
            ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
            : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
        }`}
      >
        {dict.navigation.all}
      </Link>
      {categories.map((category) => {
        const isSelected = activeCat === category.slug;
        const displayName = (dict.navigation as any)[category.slug] || category.name;

        return (
          <Link
            key={category.id}
            href={`/${locale}/category/${category.slug}`}
            className={`px-5 py-2.5 rounded-full text-sm font-extrabold whitespace-nowrap transition shadow-sm ${
              isSelected
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md'
                : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {displayName}
          </Link>
        );
      })}
    </div>
  );
}
