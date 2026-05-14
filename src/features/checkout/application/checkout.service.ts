'use server';

import { prisma } from '@/core/lib/prisma';
import { checkoutSchema, CheckoutInput, OrderItemDTO } from '../domain/order.schema';
import { auth } from '@/features/auth/infrastructure/auth';

export async function createOrderAction(
  input: CheckoutInput,
  items: OrderItemDTO[],
  totalAmount: number
) {
  const validated = checkoutSchema.safeParse(input);
  if (!validated.success) {
    return { error: 'Invalid checkout details.', details: validated.error.flatten().fieldErrors };
  }

  const { fullName, shippingAddress, city, postalCode } = validated.data;

  try {
    const session = await auth();
    let userId = session?.user?.id;

    if (!userId) {
      // Fallback to demo customer if checking out as guest
      const demoUser = await prisma.user.findFirst({
        where: { email: 'customer@luxewear.com' },
      });
      if (demoUser) {
        userId = demoUser.id;
      } else {
        return { error: 'Authentication required or demo customer missing.' };
      }
    }

    // Simulate secure payment gateway delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const order = await prisma.order.create({
      data: {
        userId,
        status: 'PROCESSING',
        totalAmount,
        shippingAddress,
        city,
        postalCode,
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
            size: item.size,
            color: item.color,
          })),
        },
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    return { error: 'An error occurred while placing your order. Please try again.' };
  }
}
