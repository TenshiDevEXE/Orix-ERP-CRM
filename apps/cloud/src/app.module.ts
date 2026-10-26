import { Module, MiddlewareConsumer } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { TenantMiddleware } from './common/tenant.middleware';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { InvoicingModule } from './modules/invoicing/invoicing.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { AccountingModule } from './modules/accounting/accounting.module';

@Module({
  imports: [
    PrismaModule,
    TenantModule,
    HealthModule,
    AuthModule,
    UsersModule,
    RolesModule,
    TenantsModule,
    CompaniesModule,
    CatalogModule,
    InvoicingModule,
    InventoryModule,
    AccountingModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude('health', 'auth/login', 'auth/register', 'favicon.ico')
      .forRoutes('*');
  }
}
