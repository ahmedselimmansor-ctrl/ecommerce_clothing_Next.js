import { getDictionary, Locale } from '@/core/i18n/get-dictionary';
import { getProducts, getCategories } from '@/features/catalog/application/catalog.service';
import { ProductGrid } from '@/features/catalog/presentation/ProductGrid';
import { CategoryFilter } from '@/features/catalog/presentation/CategoryFilter';

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = ['men', 'women', 'kids'];
  const langs = ['en', 'ar'];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of langs) {
    for (const slug of categories) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const slug = resolvedParams.slug;

  const dict = getDictionary(lang);
  const categories = await getCategories();
  const products = await getProducts({ categorySlug: slug });

  const categoryName = (dict.navigation as any)[slug] || slug;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white capitalize">
          {categoryName}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
          {dict.common.browseDesc}
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        currentCategory={slug}
        dict={dict}
        locale={lang}
      />

      <ProductGrid products={products} dict={dict} locale={lang} />
    </div>
  );
}
