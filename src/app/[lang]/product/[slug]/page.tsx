import { getDictionary, Locale } from '@/core/i18n/get-dictionary';
import { getProductBySlug } from '@/features/catalog/application/catalog.service';
import { ProductDetail } from '@/features/catalog/presentation/ProductDetail';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const slug = resolvedParams.slug;

  const dict = getDictionary(lang);
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} dict={dict} locale={lang} />;
}
