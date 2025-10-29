import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

// Load environment variables explicitly
config({ path: '.env.local' })

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create categories
  const electronicsCategory = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic devices and gadgets',
    },
  })

  const clothingCategory = await prisma.category.upsert({
    where: { slug: 'clothing' },
    update: {},
    create: {
      name: 'Clothing',
      slug: 'clothing',
      description: 'Fashion and apparel',
    },
  })

  const booksCategory = await prisma.category.upsert({
    where: { slug: 'books' },
    update: {},
    create: {
      name: 'Books',
      slug: 'books',
      description: 'Books and literature',
    },
  })

  console.log('✅ Categories created')

  // Create products
  await prisma.product.upsert({
    where: { slug: 'wireless-headphones' },
    update: {},
    create: {
      name: 'Wireless Headphones',
      slug: 'wireless-headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      stock: 50,
      imageUrl: 'https://example.com/headphones.jpg',
      categoryId: electronicsCategory.id,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'smartphone' },
    update: {},
    create: {
      name: 'Smartphone',
      slug: 'smartphone',
      description: 'Latest smartphone with advanced features',
      price: 899.99,
      stock: 30,
      imageUrl: 'https://example.com/smartphone.jpg',
      categoryId: electronicsCategory.id,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'tshirt' },
    update: {},
    create: {
      name: 'Cotton T-Shirt',
      slug: 'tshirt',
      description: 'Comfortable cotton t-shirt in various colors',
      price: 29.99,
      stock: 100,
      imageUrl: 'https://example.com/tshirt.jpg',
      categoryId: clothingCategory.id,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'programming-book' },
    update: {},
    create: {
      name: 'Advanced Programming',
      slug: 'programming-book',
      description: 'Learn advanced programming concepts',
      price: 49.99,
      stock: 25,
      imageUrl: 'https://example.com/book.jpg',
      categoryId: booksCategory.id,
    },
  })

  console.log('✅ Products created')

  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      image: 'https://example.com/avatar.jpg',
    },
  })

  console.log('✅ Test user created')

  // Create a sample order
  const sampleOrder = await prisma.order.create({
    data: {
      total: 229.98,
      status: 'PENDING',
      userId: testUser.id,
      items: {
        create: [
          {
            quantity: 1,
            price: 199.99,
            productId: (await prisma.product.findUnique({ where: { slug: 'wireless-headphones' } }))!.id,
          },
          {
            quantity: 1,
            price: 29.99,
            productId: (await prisma.product.findUnique({ where: { slug: 'tshirt' } }))!.id,
          },
        ],
      },
    },
  })

  console.log('✅ Sample order created')

  // Create sample reviews
  const wirelessHeadphones = await prisma.product.findUnique({ where: { slug: 'wireless-headphones' } })
  if (wirelessHeadphones) {
    await prisma.review.upsert({
      where: { userId_productId: { userId: testUser.id, productId: wirelessHeadphones.id } },
      update: {},
      create: {
        rating: 5,
        comment: 'Excellent sound quality and comfortable to wear!',
        userId: testUser.id,
        productId: wirelessHeadphones.id,
      },
    })
  }

  console.log('✅ Sample reviews created')
  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })