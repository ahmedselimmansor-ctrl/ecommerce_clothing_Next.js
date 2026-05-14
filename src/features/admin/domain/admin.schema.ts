import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters.'),
  slug: z.string().min(2, 'Slug must be at least 2 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().positive('Price must be greater than zero.'),
  imageUrl: z.string().url('Must be a valid image URL.'),
  categoryId: z.string().min(1, 'Category selection is required.'),
  sizes: z.array(z.string()).min(1, 'At least one size is required.'),
  colors: z.array(z.string()).min(1, 'At least one color is required.'),
  stock: z.coerce.number().int().nonnegative('Stock cannot be negative.'),
  featured: z.boolean().default(false),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().min(1, 'Product ID is required.'),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const createCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters.'),
  slug: z.string().min(2, 'Slug must be at least 2 characters.'),
  description: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateOrderStatusSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required.'),
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
