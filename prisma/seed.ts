import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up existing data...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding demo users...');
  const passwordHash = await bcrypt.hash('password123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@luxewear.com',
      name: 'Admin User',
      passwordHash,
      role: 'ADMIN',
    },
  });

  await prisma.user.create({
    data: {
      email: 'customer@luxewear.com',
      name: 'Customer Demo',
      passwordHash,
      role: 'CUSTOMER',
    },
  });

  console.log('Seeding categories...');
  const menCategory = await prisma.category.create({
    data: {
      name: 'Men',
      slug: 'men',
      description: 'Elegant and sophisticated clothing for the modern man.',
    },
  });

  const womenCategory = await prisma.category.create({
    data: {
      name: 'Women',
      slug: 'women',
      description: 'Luxurious fashion pieces designed for timeless grace.',
    },
  });

  const kidsCategory = await prisma.category.create({
    data: {
      name: 'Kids',
      slug: 'kids',
      description: 'Playful and comfortable clothing for children.',
    },
  });

  console.log('Seeding products...');
  await prisma.product.createMany({
    data: [
      {
        name: 'Classic Tailored Blazer',
        slug: 'classic-tailored-blazer',
        description: 'Premium wool blend tailored blazer perfect for business or elegant evening wear.',
        price: 249.99,
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Navy', 'Charcoal', 'Black'],
        stock: 25,
        featured: true,
        categoryId: menCategory.id,
      },
      {
        name: 'Merino Wool Turtleneck',
        slug: 'merino-wool-turtleneck',
        description: 'Extra fine merino wool turtleneck sweater offering warmth and a sleek silhouette.',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?q=80&w=1000&auto=format&fit=crop',
        sizes: ['M', 'L', 'XL'],
        colors: ['Black', 'Grey', 'Off-White'],
        stock: 40,
        featured: false,
        categoryId: menCategory.id,
      },
      {
        name: 'Silk Evening Dress',
        slug: 'silk-evening-dress',
        description: 'Exquisite 100% pure silk evening gown with a flowing silhouette and delicate draping.',
        price: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Emerald', 'Ruby Red', 'Midnight Blue'],
        stock: 15,
        featured: true,
        categoryId: womenCategory.id,
      },
      {
        name: 'Cashmere Wrap Coat',
        slug: 'cashmere-wrap-coat',
        description: 'Ultra-soft cashmere wool wrap coat featuring a belted waist and oversized collar.',
        price: 489.99,
        imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
        sizes: ['S', 'M', 'L'],
        colors: ['Camel', 'Cream', 'Black'],
        stock: 10,
        featured: true,
        categoryId: womenCategory.id,
      },
      {
        name: 'Cotton Linen Summer Shirt',
        slug: 'cotton-linen-summer-shirt',
        description: 'Breathable organic cotton and linen blend shirt perfect for warm weather excursions.',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Sky Blue', 'Beige'],
        stock: 50,
        featured: false,
        categoryId: menCategory.id,
      },
      {
        name: 'Pleated A-Line Skirt',
        slug: 'pleated-a-line-skirt',
        description: 'High-waisted pleated skirt made from lightweight chiffon with fluid movement.',
        price: 145.00,
        imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1000&auto=format&fit=crop',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Dusty Pink', 'Ivory', 'Black'],
        stock: 30,
        featured: false,
        categoryId: womenCategory.id,
      },
      {
        name: 'Kids Hooded Puffer Jacket',
        slug: 'kids-hooded-puffer-jacket',
        description: 'Warm and durable puffer jacket with water-resistant exterior and fleece-lined hood.',
        price: 95.00,
        imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1000&auto=format&fit=crop',
        sizes: ['4Y', '6Y', '8Y', '10Y'],
        colors: ['Yellow', 'Royal Blue', 'Red'],
        stock: 35,
        featured: false,
        categoryId: kidsCategory.id,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
