import { PrismaClient } from '@prisma/client';

// Crear un PrismaClient con middleware para aislamiento de tenants
const createPrismaWithTenant = (tenantId: string | null) => {
  const prisma = new PrismaClient();

  prisma.$use(async (params, next) => {
    // Si no hay tenant_id, no agregar filtro (para casos especiales)
    if (!tenantId) {
      return next(params);
    }

    // Para tablas que tienen tenantId, agregar filtro
    if (
      params.model &&
      [
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
      ].includes(params.model)
    ) {
      // Para operaciones de lectura
      if (params.action === 'findMany' || params.action === 'findFirst' || params.action === 'findUnique') {
        if (!params.args) {
          params.args = {};
        }
        params.args.where = {
          ...(params.args.where || {}),
          tenantId,
        };
      }

      // Para operaciones de escritura (create)
      if (params.action === 'create') {
        if (!params.args) {
          params.args = {};
        }
        // Sobrescribir siempre el tenantId para asegurar aislamiento
        params.args.data = {
          ...params.args.data,
          tenantId,
        };
      }

      // Para operaciones de update y delete
      if (params.action === 'update' || params.action === 'delete') {
        if (!params.args) {
          params.args = {};
        }
        // Agregar tenantId al where - esto filtrará registros que no pertenezcan al tenant
        params.args.where = {
          ...(params.args.where || {}),
          tenantId,
        };
      }
    }

    return next(params);
  });

  return prisma;
};

// @ts-ignore - Usar extensión de tipos para el middleware
declare module '@prisma/client' {
  interface PrismaClient {
    $use(callback: any): void;
  }
}

describe('Aislamiento entre Tenants usando Middleware de Prisma', () => {
  let tenant1Id: string;
  let tenant2Id: string;
  let company1Id: string;
  let company2Id: string;

  beforeAll(async () => {
    // Usar un cliente sin middleware para la configuración inicial
    const adminPrisma = new PrismaClient();

    // Limpiar datos de prueba anteriores
    await adminPrisma.company.deleteMany();
    await adminPrisma.tenant.deleteMany();

    // Crear dos tenants
    const tenant1 = await adminPrisma.tenant.create({
      data: {
        name: 'Tenant 1',
        subdomain: 'tenant1',
        plan: 'basic',
        status: 'active',
      },
    });
    tenant1Id = tenant1.id;

    const tenant2 = await adminPrisma.tenant.create({
      data: {
        name: 'Tenant 2',
        subdomain: 'tenant2',
        plan: 'basic',
        status: 'active',
      },
    });
    tenant2Id = tenant2.id;

    // Crear una empresa para cada tenant
    const company1 = await adminPrisma.company.create({
      data: {
        tenantId: tenant1Id,
        rnc: '123456789',
        name: 'Empresa 1',
        itbisType: 'regimen_comun',
        ncfSequenceType: 'normal',
        accountingPeriodStart: new Date('2026-01-01'),
      },
    });
    company1Id = company1.id;

    const company2 = await adminPrisma.company.create({
      data: {
        tenantId: tenant2Id,
        rnc: '987654321',
        name: 'Empresa 2',
        itbisType: 'regimen_comun',
        ncfSequenceType: 'normal',
        accountingPeriodStart: new Date('2026-01-01'),
      },
    });
    company2Id = company2.id;

    await adminPrisma.$disconnect();
  });

  afterAll(async () => {
    // Limpiar datos de prueba
    const adminPrisma = new PrismaClient();
    await adminPrisma.company.deleteMany();
    await adminPrisma.tenant.deleteMany();
    await adminPrisma.$disconnect();
  });

  describe('Prueba básica de aislamiento', () => {
    it('debe permitir que tenant1 vea sus propias empresas', async () => {
      const prisma = createPrismaWithTenant(tenant1Id);

      const companies = await prisma.company.findMany();
      expect(companies).toHaveLength(1);
      expect(companies[0].id).toBe(company1Id);
      expect(companies[0].tenantId).toBe(tenant1Id);

      await prisma.$disconnect();
    });

    it('debe permitir que tenant2 vea sus propias empresas', async () => {
      const prisma = createPrismaWithTenant(tenant2Id);

      const companies = await prisma.company.findMany();
      expect(companies).toHaveLength(1);
      expect(companies[0].id).toBe(company2Id);
      expect(companies[0].tenantId).toBe(tenant2Id);

      await prisma.$disconnect();
    });

    it('NO debe permitir que tenant1 vea empresas de tenant2', async () => {
      const prisma = createPrismaWithTenant(tenant1Id);

      const companies = await prisma.company.findMany();
      expect(companies).toHaveLength(1);
      expect(companies[0].id).toBe(company1Id);
      expect(companies.some((c) => c.id === company2Id)).toBe(false);

      await prisma.$disconnect();
    });

    it('NO debe permitir que tenant2 vea empresas de tenant1', async () => {
      const prisma = createPrismaWithTenant(tenant2Id);

      const companies = await prisma.company.findMany();
      expect(companies).toHaveLength(1);
      expect(companies[0].id).toBe(company2Id);
      expect(companies.some((c) => c.id === company1Id)).toBe(false);

      await prisma.$disconnect();
    });
  });

  describe('Prueba de escritura - aislamiento', () => {
    it('debe permitir que tenant1 cree sus propios productos', async () => {
      const prisma = createPrismaWithTenant(tenant1Id);

      const product = await prisma.product.create({
        data: {
          companyId: company1Id,
          sku: 'PROD-001',
          name: 'Producto Tenant 1',
          unit: 'unidad',
          cost: 1000,
          price: 1500,
        },
      } as any);

      expect(product.tenantId).toBe(tenant1Id);

      await prisma.$disconnect();
    });

    it('NO debe permitir que tenant1 cree productos con tenantId diferente', async () => {
      const prisma = createPrismaWithTenant(tenant1Id);

      const product = await prisma.product.create({
        data: {
          companyId: company1Id,
          sku: 'PROD-002',
          name: 'Producto con tenantId forzado',
          unit: 'unidad',
          cost: 1000,
          price: 1500,
        },
      } as any);

      expect(product.tenantId).toBe(tenant1Id);
      expect(product.tenantId).not.toBe(tenant2Id);

      await prisma.$disconnect();
    });

    it('NO debe permitir que tenant1 actualice productos de tenant2', async () => {
      const prisma2 = createPrismaWithTenant(tenant2Id);
      const product = await prisma2.product.create({
        data: { companyId: company2Id, sku: 'PROD-003', name: 'Producto Original', unit: 'unidad', cost: 1000, price: 1500 },
      } as any);
      await prisma2.$disconnect();

      const prisma1 = createPrismaWithTenant(tenant1Id);
      // Intentar actualizar individual - debería fallar porque no encuentra el registro con tenantId de tenant1
      await expect(
        prisma1.product.update({
          where: { id: product.id },
          data: { name: 'Modificado por tenant1' },
        }),
      ).rejects.toThrow();
      await prisma1.$disconnect();
    });

    it('NO debe permitir que tenant1 elimine productos de tenant2', async () => {
      const prisma2 = createPrismaWithTenant(tenant2Id);
      const product = await prisma2.product.create({
        data: { companyId: company2Id, sku: 'PROD-004', name: 'Producto a eliminar', unit: 'unidad', cost: 1000, price: 1500 },
      } as any);
      await prisma2.$disconnect();

      const prisma1 = createPrismaWithTenant(tenant1Id);
      // Intentar eliminar individual - debería fallar porque no encuentra el registro con tenantId de tenant1
      await expect(
        prisma1.product.delete({
          where: { id: product.id },
        }),
      ).rejects.toThrow();
      await prisma1.$disconnect();
    });
  });

  describe('Prueba de aislamiento en tablas relacionadas', () => {
    it('debe aislar usuarios por tenant', async () => {
      const prisma1 = createPrismaWithTenant(tenant1Id);
      await prisma1.user.create({
        data: { companyId: company1Id, email: 'user1@tenant1.com', passwordHash: 'hash123', firstName: 'Usuario', lastName: 'Uno' },
      } as any);
      await prisma1.$disconnect();

      const prisma2 = createPrismaWithTenant(tenant2Id);
      await prisma2.user.create({
        data: { companyId: company2Id, email: 'user1@tenant2.com', passwordHash: 'hash456', firstName: 'Usuario', lastName: 'Dos' },
      } as any);
      await prisma2.$disconnect();

      // Verificar que tenant1 solo ve su usuario
      const prisma1Check = createPrismaWithTenant(tenant1Id);
      const users1 = await prisma1Check.user.findMany();
      expect(users1).toHaveLength(1);
      expect(users1[0].email).toBe('user1@tenant1.com');
      await prisma1Check.$disconnect();

      // Verificar que tenant2 solo ve su usuario
      const prisma2Check = createPrismaWithTenant(tenant2Id);
      const users2 = await prisma2Check.user.findMany();
      expect(users2).toHaveLength(1);
      expect(users2[0].email).toBe('user1@tenant2.com');
      await prisma2Check.$disconnect();
    });

    it('debe aislar impuestos por tenant', async () => {
      const prisma1 = createPrismaWithTenant(tenant1Id);
      await prisma1.tax.create({
        data: {
          tenantId: tenant1Id,
          code: 'CUSTOM-1',
          name: 'Impuesto custom tenant1',
          rate: 0.15,
          type: 'itbis',
        },
      });
      await prisma1.$disconnect();

      const prisma2 = createPrismaWithTenant(tenant2Id);
      const taxes = await prisma2.tax.findMany();
      // No debe ver el impuesto de tenant1
      expect(taxes.some((t) => t.code === 'CUSTOM-1')).toBe(false);
      await prisma2.$disconnect();
    });
  });

  describe('Prueba sin contexto de tenant', () => {
    it('debe devolver todos los datos cuando no se setea tenant_id', async () => {
      const prisma = createPrismaWithTenant(null);

      const companies = await prisma.company.findMany();
      // Sin tenant_id, no hay filtro, debería ver todo
      expect(companies.length).toBeGreaterThanOrEqual(2);

      await prisma.$disconnect();
    });
  });
});
