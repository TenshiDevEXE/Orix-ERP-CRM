import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validateDoubleEntry } from '@erp/shared-core';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/accounts', async (_req, res) => {
  const accounts = await prisma.account.findMany();
  res.json(accounts);
});

router.post('/accounts', async (_req, res) => {
  const account = await prisma.account.create({ data: _req.body });
  return res.json(account);
});

router.get('/journal-entries', async (_req, res) => {
  const entries = await prisma.journalEntry.findMany({
    include: { lines: true, company: true },
  });
  return res.json(entries);
});

router.post('/journal-entries', async (req, res) => {
  const { companyId, date, description, lines } = req.body;

  const validation = validateDoubleEntry(lines);
  if (!validation.valid) {
    res.status(400).json({ error: validation.error });
    return;
  }

  const entry = await prisma.journalEntry.create({
    data: {
      companyId,
      date,
      description,
      status: 'posted',
      lines: {
        create: lines.map((line: any, index: number) => ({
          accountId: line.accountId,
          lineNumber: index + 1,
          debit: line.debit,
          credit: line.credit,
        })),
      },
    },
    include: { lines: true },
  } as any);

  return res.json(entry);
});

router.get('/periods', async (_req, res) => {
  const periods = await prisma.accountingPeriod.findMany();
  res.json(periods);
});

router.post('/periods', async (_req, res) => {
  const period = await prisma.accountingPeriod.create({ data: _req.body });
  return res.json(period);
});

router.put('/periods/:id/close', async (req, res) => {
  const { id } = req.params;
  const period = await prisma.accountingPeriod.update({
    where: { id },
    data: { status: 'closed' },
  });
  res.json(period);
});

export default router;
