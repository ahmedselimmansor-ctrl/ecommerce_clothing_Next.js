'use client';

import { useState } from 'react';
import { ProductEntity } from '../domain/product.entity';
import { Dictionary } from '@/core/i18n/get-dictionary';
import { useCartStore } from '@/features/cart/application/useCartStore';
import { toast } from 'sonner';
import { ShoppingBag, ArrowLeft, Check, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import Link from 'next/link';
import { useWishlistStore } from '../application/useWishlistStore';

export function ProductDetail({
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
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Standard');

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
    toast.success(dict.cart.itemAdded);
    setIsOpen(true);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    toast.success(isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist');
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-12">
      <Link
        href={`/${locale}/shop`}
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-indigo-600 font-bold mb-8 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{dict.common.backToShop}</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800 relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1.5 rounded-full">
                {(dict.navigation as any)[product.category?.slug || ''] || product.category?.name || dict.catalog.title}
              </span>
              <button
                onClick={handleToggleWishlist}
                className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition flex items-center gap-2 font-bold text-sm shadow-sm cursor-pointer"
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500 stroke-red-500' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Save to Wishlist'}</span>
              </button>
            </div>
            <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mt-4">
              {product.name}
            </h1>
            <p className="text-3xl font-black text-indigo-600 mt-4">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="space-y-4">
            <label className="block font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider text-sm">
              {dict.catalog.size}: <span className="text-indigo-600">{selectedSize}</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-2xl font-bold flex items-center justify-center transition border shadow-sm cursor-pointer ${
                    selectedSize === size
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white ring-2 ring-indigo-500/50 shadow-md'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider text-sm">
              {dict.catalog.color}: <span className="text-indigo-600">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition border shadow-sm cursor-pointer ${
                    selectedColor === color
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white ring-2 ring-indigo-500/50 shadow-md'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'
                  }`}
                >
                  {selectedColor === color && <Check className="w-4 h-4 stroke-[3]" />}
                  {color}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-5 text-white font-extrabold text-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-indigo-500/25 transition transform active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
          >
            <ShoppingBag className="w-6 h-6" />
            <span>{dict.catalog.addToCart}</span>
          </button>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col items-center text-center space-y-2">
              <Truck className="w-8 h-8 text-indigo-600" />
              <span className="text-xs font-bold text-zinc-900 dark:text-white">{dict.common.expressShipping}</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <RefreshCw className="w-8 h-8 text-indigo-600" />
              <span className="text-xs font-bold text-zinc-900 dark:text-white">{dict.common.thirtyDayReturn}</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-indigo-600" />
              <span className="text-xs font-bold text-zinc-900 dark:text-white">{dict.common.secureCheckout}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
