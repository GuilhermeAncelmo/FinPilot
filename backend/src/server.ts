import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Dashboard Data
app.get('/api/dashboard', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      include: { category: true }
    });

    const goals = await prisma.goal.findMany();

    // Summary calculations
    const totalIncome = transactions
      .filter(t => t.type === 'INCOME')
      .reduce((acc, t) => acc + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + t.amount, 0);

    const fixedIncome = transactions
      .filter(t => t.type === 'INCOME' && t.fixed)
      .reduce((acc, t) => acc + t.amount, 0);
    
    const variableIncome = totalIncome - fixedIncome;

    const fixedExpenses = transactions
      .filter(t => t.type === 'EXPENSE' && t.fixed)
      .reduce((acc, t) => acc + t.amount, 0);
    
    const variableExpenses = totalExpenses - fixedExpenses;

    // Monthly data for chart (last 12 months)
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentYear = new Date().getFullYear();
    
    const chartData = months.map((month, index) => {
      const monthTransactions = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === index && d.getFullYear() === currentYear;
      });
      
      return {
        name: month,
        rendas: monthTransactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0),
        gastos: monthTransactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0),
      };
    });

    const result = {
      summary: {
        totalIncome,
        totalExpenses,
        netWorth: totalIncome - totalExpenses,
        fixedIncome,
        variableIncome,
        fixedExpenses,
        variableExpenses
      },
      recentTransactions: transactions.slice(0, 10),
      goals,
      chartData
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Create Transaction
app.post('/api/transactions', async (req, res) => {
  try {
    const { description, amount, type, date, fixed } = req.body;
    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        type,
        fixed: fixed || false,
        date: date ? new Date(date) : new Date(),
      }
    });
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
