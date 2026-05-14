'use client';

import { useState, useTransition } from 'react';
import { Dictionary } from '@/core/i18n/get-dictionary';
import { Plus, Folder } from 'lucide-react';
import { toast } from 'sonner';
import { createCategoryAction } from '../application/admin.service';

export function CategoryManager({
  categories,
  dict,
}: {
  categories: any[];
  dict: Dictionary;
}) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createCategoryAction(formData);
      if (res.error) toast.error(res.error);
      else {
        toast.success('Category created successfully!');
        setFormData({ name: '', slug: '', description: '' });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Shadcn UI Style Form Card */}
      <div className="lg:col-span-1 bg-white dark:bg-zinc-950 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 self-start">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{dict.admin.addCategory}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Create a new product grouping</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{dict.admin.name}</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
            />
          </div>
          <div>
            <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{dict.admin.slug}</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
            />
          </div>
          <div>
            <label className="block font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{dict.admin.description}</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="flex w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center w-full rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 shadow cursor-pointer gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{isPending ? 'Saving...' : dict.admin.addCategory}</span>
          </button>
        </form>
      </div>

      {/* Shadcn UI Style List Card */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{dict.admin.categories}</h3>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {categories.map((category) => (
            <div key={category.id} className="p-6 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 flex items-center justify-center">
                  <Folder className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">{category.name}</h4>
                  <p className="text-xs text-zinc-500 font-mono">/{category.slug}</p>
                  {category.description && <p className="text-xs text-zinc-600 dark:text-zinc-400">{category.description}</p>}
                </div>
              </div>
              <span className="px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium text-xs border border-zinc-200 dark:border-zinc-800">
                {category._count?.products || 0} {dict.admin.products}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
