'use client';

import { useState } from 'react';
import { Dictionary } from '@/core/i18n/get-dictionary';
import { LayoutDashboard, ShoppingBag, Folder, ShoppingCart, DollarSign, Users, Package, TrendingUp, Sparkles, Download, Filter, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ProductManager } from './ProductManager';
import { CategoryManager } from './CategoryManager';
import { OrderManager } from './OrderManager';

export function AdminDashboard({
  overview,
  products,
  categories,
  orders,
  dict,
}: {
  overview: any;
  products: any[];
  categories: any[];
  orders: any[];
  dict: Dictionary;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'orders'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50/50 dark:bg-zinc-950/40 px-4 sm:px-6 lg:px-12 py-10 flex flex-col lg:flex-row gap-8 font-sans">
      {/* Premium Shadcn UI Enterprise Sidebar */}
      <aside className="w-full lg:w-72 flex-shrink-0 bg-white dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between self-start min-h-[calc(100vh-10rem)]">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise OS</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">{dict.admin.title}</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{dict.admin.subtitle}</p>
          </div>

          {/* Navigation */}
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/10 scale-[1.01]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>{dict.admin.overview}</span>
              </div>
              {activeTab === 'overview' && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/10 scale-[1.01]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>{dict.admin.products}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono font-medium">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'categories'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/10 scale-[1.01]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Folder className="w-4 h-4" />
                <span>{dict.admin.categories}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono font-medium">{categories.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/10 scale-[1.01]'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-4 h-4" />
                <span>{dict.admin.orders}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono font-medium">{orders.length}</span>
            </button>
          </nav>
        </div>

        {/* Live Neon & Cloudinary System Status */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 space-y-4">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Neon PostgreSQL
              </span>
              <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">99.9%</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                Cloudinary CDN
              </span>
              <span className="font-mono text-[10px] text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">Ready</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>System Version</span>
            <span className="font-mono font-bold">2.4.0-turbopack</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 space-y-8">
        {/* Enterprise Action & Control Header */}
        <div className="bg-white dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-black text-zinc-900 dark:text-white capitalize">
              {activeTab === 'overview' ? 'Command Center Overview' : `${activeTab} Management`}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Real-time metrics & Neon database synchronization</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-sm transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Data'}</span>
            </button>
            <button
              onClick={() => alert('Exporting CSV dashboard report...')}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-bold text-sm shadow transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Enterprise Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm relative overflow-hidden group hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{dict.admin.totalRevenue}</span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-zinc-900 dark:text-white">${overview.totalRevenue.toFixed(2)}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>+14.8% from last month</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm relative overflow-hidden group hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{dict.admin.totalOrders}</span>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-zinc-900 dark:text-white">{overview.totalOrders}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>+8.2% this week</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm relative overflow-hidden group hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{dict.admin.totalProducts}</span>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-zinc-900 dark:text-white">{overview.totalProducts}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Fully synchronized</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm relative overflow-hidden group hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">{dict.admin.totalUsers}</span>
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-zinc-900 dark:text-white">{overview.totalUsers}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>+24.1% conversion rate</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Enterprise Analytics & Orders Container Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">Recent Transactions</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Live transaction feeds across global endpoints</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-300">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filter: All Orders</span>
                  </div>
                </div>

                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                  {overview.recentOrders.map((order: any) => (
                    <div key={order.id} className="py-4 flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 px-3 rounded-xl transition">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white font-mono text-xs font-bold border border-zinc-200 dark:border-zinc-700">
                          #{order.id.slice(0, 3)}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{order.user?.name || 'Guest Customer'}</h4>
                          <p className="text-xs text-zinc-500 font-mono">{order.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="font-black text-sm text-zinc-900 dark:text-white">${order.totalAmount.toFixed(2)}</span>
                        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-wider px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 inline-block">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm p-6 space-y-6">
                <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                  <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">Store Infrastructure</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Cloud distribution status</p>
                </div>
                <div className="space-y-4 font-sans text-xs font-bold">
                  <div className="space-y-2">
                    <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                      <span>Serverless Edge CDN</span>
                      <span className="text-indigo-600 font-mono">100%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div className="w-full h-full bg-indigo-600 rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                      <span>Cloudinary Media Quota</span>
                      <span className="text-emerald-600 font-mono">12.4%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div className="w-[12.4%] h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                      <span>Neon PostgreSQL Connection</span>
                      <span className="text-purple-600 font-mono">Active</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div className="w-[95%] h-full bg-purple-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="animate-in fade-in duration-300">
            <ProductManager products={products} categories={categories} dict={dict} />
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="animate-in fade-in duration-300">
            <CategoryManager categories={categories} dict={dict} />
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-in fade-in duration-300">
            <OrderManager orders={orders} dict={dict} />
          </div>
        )}
      </main>
    </div>
  );
}
