import express from 'express';
import { PrismaClient } from '@prisma/client';
import { calculateITBIS } from '@erp/shared-core';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/invoices', async (_req, res) => {
  const invoices = await prisma.invoice.findMany({
    include: { company: true, lines: true },
  });
  res.json(invoices);
});

router.post('/invoices', async (req, res) => {
  const { companyId, customerId, lines } = req.body;

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: { ncfSequences: true },
  });

  if (!company) {
    res.status(404).json({ error: 'Company not found' });
    return;
  }

  const itbisCalcs = lines.map((line: any) =>
    calculateITBIS(line.quantity * line.price, line.taxRate, false),
  );
  const subtotal = itbisCalcs.reduce((sum: number, calc: any) => sum + calc.subtotal, 0);
  const taxTotal = itbisCalcs.reduce((sum: number, calc: any) => sum + calc.itbisAmount, 0);
  const total = itbisCalcs.reduce((sum: number, calc: any) => sum + calc.total, 0);

  const ncfSequence = company.ncfSequences[0];
  const ncf = `${ncfSequence.prefix}-${String(Number(ncfSequence.currentSequence)).padStart(8, '0')}`;

  const invoice = await prisma.invoice.create({
    data: {
      companyId,
      customerId,
      ncf,
      subtotal,
      itbisAmount: taxTotal,
      total,
      status: 'pending',
      invoiceDate: new Date(),
      ncfType: '01',
      invoiceNumber: `INV-${Date.now()}`,
      idempotencyKey: `${Date.now()}-${companyId}`,
      createdBy: 'system',
      lines: {
        create: lines.map((line: any, index: number) => ({
          productId: line.productId,
          lineNumber: index + 1,
          description: `Line ${index + 1}`,
          quantity: line.quantity,
          unitPrice: line.price,
          itbisRate: line.taxRate,
          taxAmount: line.quantity * line.price * line.taxRate,
          lineTotal: line.quantity * line.price * (1 + line.taxRate),
        })),
      },
    },
    include: { lines: true, company: true },
  } as any);

  await prisma.ncfSequence.update({
    where: { id: ncfSequence.id },
    data: { currentSequence: Number(ncfSequence.currentSequence) + 1 },
  });

  res.json(invoice);
});

router.put('/invoices/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const invoice = await prisma.invoice.update({
    where: { id },
    data: { status },
    include: { lines: true },
  });
  res.json(invoice);
});

export default router;
