import { ProductEntity } from '../domain/product.entity';
import { ProductCard } from './ProductCard';
import { Dictionary } from '@/core/i18n/get-dictionary';
import { ShoppingBag } from 'lucide-react';

export function ProductGrid({
  products,
  dict,
  locale,
}: {
  products: ProductEntity[];
  dict: Dictionary;
  locale: string;
}) {
  if (products.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center text-zinc-500 space-y-4">
        <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-700 stroke-1" />
        <p className="text-lg font-medium">{dict.catalog.noProducts}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} dict={dict} locale={locale} />
      ))}
    </div>
  );
}
