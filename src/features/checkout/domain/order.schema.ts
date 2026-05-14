import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  shippingAddress: z.string().min(5, { message: 'Please enter a complete shipping address.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  postalCode: z.string().min(3, { message: 'Postal code is required.' }),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export interface OrderItemDTO {
  productId: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
}
