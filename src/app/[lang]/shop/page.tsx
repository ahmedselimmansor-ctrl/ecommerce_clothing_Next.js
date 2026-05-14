import { getDictionary, Locale } from '@/core/i18n/get-dictionary';
import { getProducts, getCategories } from '@/features/catalog/application/catalog.service';
import { ProductGrid } from '@/features/catalog/presentation/ProductGrid';
import { CategoryFilter } from '@/features/catalog/presentation/CategoryFilter';

export const revalidate = 60;

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string; search?: string; maxPrice?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  const lang = resolvedParams.lang as Locale;
  const dict = getDictionary(lang);

  const category = resolvedSearch.category;
  const search = resolvedSearch.search;
  const maxPrice = resolvedSearch.maxPrice ? parseFloat(resolvedSearch.maxPrice) : undefined;

  const categories = await getCategories();
  const products = await getProducts({ categorySlug: category, search, maxPrice });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white">
          {dict.catalog.title}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
          {dict.common.browseDesc}
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        currentCategory={category}
        dict={dict}
        locale={lang}
      />

      <ProductGrid products={products} dict={dict} locale={lang} />
    </div>
  );
}
