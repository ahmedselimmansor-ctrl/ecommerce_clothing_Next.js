'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { checkoutSchema, CheckoutInput } from '../domain/order.schema';
import { createOrderAction } from '../application/checkout.service';
import { useCartStore } from '@/features/cart/application/useCartStore';
import { Dictionary } from '@/core/i18n/get-dictionary';
import { CheckCircle2, ShieldCheck, CreditCard, Lock } from 'lucide-react';

export function CheckoutForm({ dict, locale }: { dict: Dictionary; locale: string }) {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isPending, startTransition] = useTransition();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
  });

  const totalPrice = getTotalPrice();

  const onSubmit = (data: CheckoutInput) => {
    if (items.length === 0) {
      toast.error(dict.cart.empty);
      return;
    }

    startTransition(async () => {
      toast.info(dict.checkout.simulation);
      const orderItems = items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
        size: i.size,
        color: i.color,
      }));

      const res = await createOrderAction(data, orderItems, totalPrice);

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(dict.checkout.success);
        clearCart();
        setOrderPlaced(true);
      }
    });
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto" />
        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">{dict.checkout.confirmed}</h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {dict.checkout.success}
        </p>
        <button
          onClick={() => router.push(`/${locale}/shop`)}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-lg transition cursor-pointer"
        >
          {dict.checkout.continueShopping}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-12">
      <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-12 text-center">
        {dict.checkout.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <span>{dict.checkout.shipping}</span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                {dict.checkout.fullName}
              </label>
              <input
                {...register('fullName')}
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-transparent focus:border-indigo-500 outline-none transition"
                placeholder={dict.checkout.phName}
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                {dict.checkout.address}
              </label>
              <input
                {...register('shippingAddress')}
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-transparent focus:border-indigo-500 outline-none transition"
                placeholder={dict.checkout.phAddress}
              />
              {errors.shippingAddress && (
                <p className="mt-1 text-sm text-red-500">{errors.shippingAddress.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  {dict.checkout.city}
                </label>
                <input
                  {...register('city')}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-transparent focus:border-indigo-500 outline-none transition"
                  placeholder={dict.checkout.phCity}
                />
                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  {dict.checkout.postalCode}
                </label>
                <input
                  {...register('postalCode')}
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-transparent focus:border-indigo-500 outline-none transition"
                  placeholder={dict.checkout.phPostal}
                />
                {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode.message}</p>}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 flex items-center gap-4">
              <CreditCard className="w-8 h-8 text-indigo-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200">{dict.checkout.simTitle}</h4>
                <p className="text-xs text-indigo-700 dark:text-indigo-300">{dict.checkout.simDesc}</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending || items.length === 0}
              className="w-full py-4 text-white font-extrabold text-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl transition transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-5 h-5" />
              <span>{isPending ? dict.checkout.processing : dict.checkout.placeOrder}</span>
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-xl">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{dict.checkout.summary}</h2>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-xl shadow" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-zinc-900 dark:text-white truncate">{item.name}</h4>
                  <p className="text-xs text-zinc-500 capitalize">Size: {item.size} | Color: {item.color}</p>
                  <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mt-1">Qty: {item.quantity}</p>
                </div>
                <span className="font-black text-indigo-600">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400 text-sm">
              <span>{dict.cart.total}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400 text-sm">
              <span>{dict.checkout.shippingCost}</span>
              <span className="text-emerald-500 font-bold">{dict.checkout.free}</span>
            </div>
            <div className="flex justify-between text-zinc-900 dark:text-white font-extrabold text-xl pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <span>{dict.checkout.totalFinal}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
