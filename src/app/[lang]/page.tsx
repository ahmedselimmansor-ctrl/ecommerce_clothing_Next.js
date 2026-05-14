import { getDictionary, Locale } from '@/core/i18n/get-dictionary';
import { getProducts, getCategories } from '@/features/catalog/application/catalog.service';
import { ProductGrid } from '@/features/catalog/presentation/ProductGrid';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600;

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);
  const products = await getProducts();
  const categories = await getCategories();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950 py-24 sm:py-32 border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
              {dict.home.collectionTag}
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black text-zinc-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-none">
            {dict.hero.title}
          </h1>

          <p className="text-lg sm:text-2xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {dict.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={`/${lang}/shop`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-lg shadow-xl shadow-indigo-500/25 transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{dict.hero.cta}</span>
              {lang === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </Link>

            <Link
              href={`/${lang}/category/women`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-extrabold text-lg border border-zinc-200 dark:border-zinc-700 transition"
            >
              {dict.hero.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Category Highlights Section */}
      <section className="w-full px-4 sm:px-6 lg:px-12 space-y-8">
        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white text-center">
          {dict.home.exploreCat}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href={`/${lang}/category/men`}
            className="group relative h-96 rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 block bg-zinc-100 dark:bg-zinc-800"
          >
            <img
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop"
              alt={dict.navigation.men}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <div>
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider">{dict.home.catPremium}</span>
                <h3 className="text-3xl font-black text-white mt-1">{dict.navigation.men}</h3>
              </div>
            </div>
          </Link>

          <Link
            href={`/${lang}/category/women`}
            className="group relative h-96 rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 block bg-zinc-100 dark:bg-zinc-800"
          >
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
              alt={dict.navigation.women}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <div>
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider">{dict.home.catElegance}</span>
                <h3 className="text-3xl font-black text-white mt-1">{dict.navigation.women}</h3>
              </div>
            </div>
          </Link>

          <Link
            href={`/${lang}/category/kids`}
            className="group relative h-96 rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 block bg-zinc-100 dark:bg-zinc-800"
          >
            <img
              src="https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1000&auto=format&fit=crop"
              alt={dict.navigation.kids}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <div>
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider">{dict.home.catPlayful}</span>
                <h3 className="text-3xl font-black text-white mt-1">{dict.navigation.kids}</h3>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full px-4 sm:px-6 lg:px-12 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            {dict.home.featuredTitle}
          </h2>
          <Link
            href={`/${lang}/shop`}
            className="text-indigo-600 hover:text-indigo-700 font-extrabold flex items-center gap-1 transition"
          >
            <span>{dict.home.viewAll}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <ProductGrid products={featuredProducts} dict={dict} locale={lang} />
      </section>
    </div>
  );
}
