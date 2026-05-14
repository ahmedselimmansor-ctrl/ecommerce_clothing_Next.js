'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { registerSchema, RegisterInput } from '../domain/user.schema';
import { registerUserAction } from '../application/auth.service';
import { Dictionary } from '@/core/i18n/get-dictionary';

export function RegisterForm({ dict, locale }: { dict: Dictionary; locale: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    startTransition(async () => {
      const res = await registerUserAction(data);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(dict.auth.successRegister);
        router.push(`/${locale}/login`);
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-2xl border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-6 text-center">{dict.auth.register}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Full Name
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 outline-none transition"
            placeholder="Jane Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            {dict.auth.email}
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 outline-none transition"
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            {dict.auth.password}
          </label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 outline-none transition"
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 px-6 text-white font-bold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500/50 transition transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-lg cursor-pointer"
        >
          {isPending ? '...' : dict.auth.register}
        </button>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-4">
          <a href={`/${locale}/login`} className="hover:text-indigo-500 dark:hover:text-indigo-400 font-semibold underline">
            {dict.auth.hasAccount}
          </a>
        </p>
      </form>
    </div>
  );
}
