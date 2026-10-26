import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

declare global {
  var currentTenantId: string | undefined;
}

export const setCurrentTenantId = (tenantId: string) => {
  global.currentTenantId = tenantId;
};

router.get('/movements', async (_req, res) => {
  const movements = await prisma.inventoryMovement.findMany({
    include: { product: true, company: true },
  });
  res.json(movements);
});

router.post('/movements', async (req, res) => {
  const { companyId, productId, quantity, type } = req.body;
  // @ts-ignore
  // @ts-ignore
const tenantId = global.currentTenantId || 'default';

  const movement = await prisma.inventoryMovement.create({
    data: {
      companyId,
      productId,
      quantity,
      movementType: type,
      referenceId: null,
      unitCost: 0,
      totalCost: 0,
      createdBy: 'system',
      tenantId,
    },
    include: { product: true },
  } as any);

  const sign = type === 'out' ? -1 : 1;
  const existingBalance = await prisma.inventoryBalance.findFirst({
    where: { productId },
  });

  if (existingBalance) {
    await prisma.inventoryBalance.update({
      where: { id: existingBalance.id },
      data: { quantityOnHand: { increment: sign * quantity } },
    });
  } else {
    await prisma.inventoryBalance.create({
      data: {
        productId,
        companyId,
        quantityOnHand: sign * quantity,
        totalCost: 0,
      },
    } as any);
  }

  res.json(movement);
});

router.get('/balances', async (_req, res) => {
  const balances = await prisma.inventoryBalance.findMany();
  res.json(balances);
});

export default router;
