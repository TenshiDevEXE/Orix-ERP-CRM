import express from 'express';
import { PrismaClient } from '@prisma/client';
import catalogRoutes from './routes/catalog';
import invoicingRoutes from './routes/invoicing';
import inventoryRoutes, { setCurrentTenantId } from './routes/inventory';
import accountingRoutes from './routes/accounting';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

let currentTenantId: string | undefined;

app.use((req, _res, next) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  if (tenantId) {
    currentTenantId = tenantId;
    setCurrentTenantId(tenantId);
  }
  next();
});

prisma.$use(async (params, next) => {
  if (!currentTenantId) {
    return next(params);
  }

  const tenantTables = [
    'Company',
    'User',
    'Role',
    'UserRole',
    'Category',
    'Product',
    'Tax',
    'Account',
    'AccountingPeriod',
    'JournalEntry',
    'JournalEntryLine',
    'NcfSequence',
    'Invoice',
    'InvoiceLine',
    'InventoryMovement',
    'InventoryBalance',
    'SyncQueue',
    'AuditLog',
  ];

  if (params.model && tenantTables.includes(params.model)) {
    if (params.action === 'findMany' || params.action === 'findFirst' || params.action === 'findUnique') {
      if (!params.args) {
        params.args = {};
      }
      params.args.where = {
        ...(params.args.where || {}),
        tenantId: currentTenantId,
      };
    }

    if (params.action === 'create') {
      if (!params.args) {
        params.args = {};
      }
      params.args.data = {
        ...params.args.data,
        tenantId: currentTenantId,
      };
    }

    if (params.action === 'update' || params.action === 'delete') {
      if (!params.args) {
        params.args = {};
      }
      params.args.where = {
        ...(params.args.where || {}),
        tenantId: currentTenantId,
      };
    }
  }

  return next(params);
});

app.get('/health', async (_req, res) => {
  const tenantCount = await prisma.tenant.count();
  res.json({
    status: 'ok',
    tenantId: currentTenantId,
    tenantCount,
  });
});

app.use('/catalog', catalogRoutes);
app.use('/invoicing', invoicingRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/accounting', accountingRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Local app running on http://localhost:${PORT}`);
});
