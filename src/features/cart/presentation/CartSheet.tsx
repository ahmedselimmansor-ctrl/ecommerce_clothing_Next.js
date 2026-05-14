'use client';

import { useCartStore } from '../application/useCartStore';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Dictionary } from '@/core/i18n/get-dictionary';
import { useRouter } from 'next/navigation';

export function CartSheet({ dict, locale }: { dict: Dictionary; locale: string }) {
  const router = useRouter();
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsOpen(false);
    router.push(`/${locale}/checkout`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 h-full flex flex-col shadow-2xl border-l border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-extrabold text-xl">
            <ShoppingBag className="w-6 h-6 text-indigo-600" />
            <span>{dict.cart.title}</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-4">
              <ShoppingBag className="w-16 h-16 stroke-1 text-zinc-300 dark:text-zinc-700" />
              <p className="font-medium">{dict.cart.empty}</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-zinc-900 dark:text-white truncate">{item.name}</h4>
                  <p className="text-xs text-zinc-500 capitalize">
                    {dict.catalog.size}: {item.size} | {dict.catalog.color}: {item.color}
                  </p>
                  <p className="text-sm font-extrabold text-indigo-600 mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 transition cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold w-6 text-center text-zinc-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4 bg-zinc-50 dark:bg-zinc-900">
            <div className="flex justify-between items-center text-zinc-900 dark:text-white font-extrabold text-lg">
              <span>{dict.cart.total}:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-4 text-white font-extrabold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl transition transform active:scale-95 text-center block cursor-pointer"
            >
              {dict.cart.checkout}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
