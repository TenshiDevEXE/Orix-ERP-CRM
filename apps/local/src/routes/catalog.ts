import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/categories', async (_req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

router.post('/categories', async (_req, res) => {
  const category = await prisma.category.create({ data: _req.body });
  res.json(category);
});

router.get('/products', async (_req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true, company: true },
  });
  res.json(products);
});

router.post('/products', async (_req, res) => {
  const product = await prisma.product.create({
    data: _req.body,
    include: { category: true, company: true },
  });
  return res.json(product);
});

router.get('/taxes', async (_req, res) => {
  const taxes = await prisma.tax.findMany();
  res.json(taxes);
});

router.post('/taxes', async (_req, res) => {
  const tax = await prisma.tax.create({ data: _req.body });
  res.json(tax);
});

export default router;
