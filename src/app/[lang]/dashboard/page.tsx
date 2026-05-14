import { getDictionary } from '@/core/i18n/get-dictionary';
import { getAdminOverview, getAdminProducts, getAdminCategories, getAdminOrders } from '@/features/admin/application/admin.service';
import { AdminDashboard } from '@/features/admin/presentation/AdminDashboard';

export default async function DashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang as any);
  const [overview, products, categories, orders] = await Promise.all([
    getAdminOverview(),
    getAdminProducts(),
    getAdminCategories(),
    getAdminOrders(),
  ]);

  return (
    <AdminDashboard
      overview={overview}
      products={products}
      categories={categories}
      orders={orders}
      dict={dict}
    />
  );
}
