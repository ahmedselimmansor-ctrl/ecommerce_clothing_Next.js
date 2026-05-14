'use client';

import { ProductEntity } from '../domain/product.entity';
import { motion } from 'framer-motion';
import { Dictionary } from '@/core/i18n/get-dictionary';
import { useCartStore } from '@/features/cart/application/useCartStore';
import { toast } from 'sonner';
import { Eye, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';
import { useWishlistStore } from '../application/useWishlistStore';

export function ProductCard({
  product,
  dict,
  locale,
}: {
  product: ProductEntity;
  dict: Dictionary;
  locale: string;
}) {
  const { addItem, setIsOpen } = useCartStore();
  const { toggleWishlist, hasItem } = useWishlistStore();
  const isWishlisted = hasItem(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: product.sizes[0] || 'M',
      color: product.colors[0] || 'Standard',
      quantity: 1,
    });
    toast.success(dict.cart.itemAdded);
    setIsOpen(true);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist');
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-2xl flex flex-col"
    >
      <Link href={`/${locale}/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow">
            Featured
          </span>
        )}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-900 shadow transition transform active:scale-95 cursor-pointer"
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500 stroke-red-500' : ''}`} />
        </button>
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-xl font-black text-zinc-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/product/${product.slug}`}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition cursor-pointer"
              title={dict.catalog.viewDetails}
            >
              <Eye className="w-5 h-5" />
            </Link>
            <button
              onClick={handleQuickAdd}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-500/25 transition transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
              title={dict.catalog.addToCart}
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
