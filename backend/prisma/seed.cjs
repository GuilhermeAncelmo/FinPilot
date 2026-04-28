const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});

async function main() {
  console.log('Starting seed...');
  
  // Clear existing data
  await prisma.transaction.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const catAlimentacao = await prisma.category.create({
    data: { name: 'Alimentação', color: '#3B82F6', icon: 'ShoppingCart' }
  });
  const catTransporte = await prisma.category.create({
    data: { name: 'Transporte', color: '#10B981', icon: 'Car' }
  });

  // Create Transactions
  await prisma.transaction.createMany({
    data: [
      { description: 'Salário', amount: 8400, type: 'INCOME' },
      { description: 'Supermercado', amount: 1200, type: 'EXPENSE', categoryId: catAlimentacao.id },
      { description: 'Combustível', amount: 450, type: 'EXPENSE', categoryId: catTransporte.id },
      { description: 'Freelance', amount: 1500, type: 'INCOME' },
    ]
  });

  // Create Goals
  await prisma.goal.createMany({
    data: [
      { name: 'Reserva de Emergência', targetAmount: 20000, currentAmount: 15000 },
      { name: 'Carro Novo', targetAmount: 80000, currentAmount: 45000 },
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
