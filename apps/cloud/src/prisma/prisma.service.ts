import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getTenantId } from '../common/tenant.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();

    this.$use(async (params, next) => {
      const tenantId = getTenantId();

      if (!tenantId) {
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
            tenantId,
          };
        }

        if (params.action === 'create') {
          if (!params.args) {
            params.args = {};
          }
          params.args.data = {
            ...params.args.data,
            tenantId,
          };
        }

        if (params.action === 'update' || params.action === 'delete') {
          if (!params.args) {
            params.args = {};
          }
          params.args.where = {
            ...(params.args.where || {}),
            tenantId,
          };
        }
      }

      return next(params);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
