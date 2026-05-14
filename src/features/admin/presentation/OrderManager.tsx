'use client';

import { useTransition } from 'react';
import { Dictionary } from '@/core/i18n/get-dictionary';
import { toast } from 'sonner';
import { updateOrderStatusAction } from '../application/admin.service';

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-200 dark:border-amber-800',
  PROCESSING: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-800',
  SHIPPED: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 border-indigo-200 dark:border-indigo-800',
  DELIVERED: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-200 dark:border-emerald-800',
  CANCELLED: 'bg-red-50 dark:bg-red-950/40 text-red-600 border-red-200 dark:border-red-800',
};

export function OrderManager({
  orders,
  dict,
}: {
  orders: any[];
  dict: Dictionary;
}) {
  const [isPending, startTransition] = useTransition();

  const handleUpdateStatus = (orderId: string, status: string) => {
    startTransition(async () => {
      const res = await updateOrderStatusAction({ orderId, status: status as any });
      if (res.error) toast.error(res.error);
      else toast.success('Order status updated successfully!');
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{dict.admin.orders}</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">View and manage customer fulfillment status</p>
      </div>

      <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-100/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="p-4">Order ID</th>
                <th className="p-4">{dict.admin.customer}</th>
                <th className="p-4">{dict.admin.items}</th>
                <th className="p-4">Total</th>
                <th className="p-4">{dict.admin.status}</th>
                <th className="p-4 text-right">{dict.admin.updateStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:border-zinc-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="p-4 font-mono text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                    {order.id.slice(0, 8)}...
                  </td>
                  <td className="p-4">
                    <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-50">{order.user?.name || 'Guest Customer'}</h4>
                    <span className="text-xs text-zinc-500">{order.user?.email || 'guest@example.com'}</span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      {order.orderItems?.map((item: any) => (
                        <div key={item.id} className="text-xs text-zinc-600 dark:text-zinc-400">
                           {item.quantity}x {item.product?.name || 'Item'} ({item.size || 'M'}, {item.color || 'Default'})
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-zinc-900 dark:text-zinc-50">${order.totalAmount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      disabled={isPending}
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-medium text-xs outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 transition cursor-pointer"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
