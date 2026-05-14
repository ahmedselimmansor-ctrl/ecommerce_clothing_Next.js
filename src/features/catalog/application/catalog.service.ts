import { prisma } from '@/core/lib/prisma';
import { getCache, setCache } from '@/core/lib/redis';
import { ProductEntity, ProductFilters, CategoryEntity } from '../domain/product.entity';

export async function getCategories(): Promise<CategoryEntity[]> {
  const cacheKey = 'categories:all';
  const cached = await getCache<CategoryEntity[]>(cacheKey);
  if (cached) return cached;

  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    if (categories.length > 0) await setCache(cacheKey, categories, 3600);
    return categories;
  } catch (error) {
    return [];
  }
}

export async function getProducts(filters?: ProductFilters): Promise<ProductEntity[]> {
  const { categorySlug, search, maxPrice } = filters || {};
  const cacheKey = `products:${categorySlug || 'all'}:${search || 'none'}:${maxPrice || 'all'}`;

  const cached = await getCache<ProductEntity[]>(cacheKey);
  if (cached) return cached;

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(categorySlug && categorySlug !== 'all' && {
          category: { slug: categorySlug },
        }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
        ...(maxPrice && {
          price: { lte: maxPrice },
        }),
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (products.length > 0) await setCache(cacheKey, products, 1800);
    return products;
  } catch (error) {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductEntity | null> {
  const cacheKey = `product:${slug}`;
  const cached = await getCache<ProductEntity>(cacheKey);
  if (cached) return cached;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (product) await setCache(cacheKey, product, 3600);
    return product;
  } catch (error) {
    return null;
  }
}
