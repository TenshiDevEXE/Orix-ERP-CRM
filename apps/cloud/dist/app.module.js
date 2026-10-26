"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const tenant_module_1 = require("./modules/tenant/tenant.module");
const tenant_middleware_1 = require("./common/tenant.middleware");
const health_module_1 = require("./modules/health/health.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const roles_module_1 = require("./modules/roles/roles.module");
const tenants_module_1 = require("./modules/tenants/tenants.module");
const companies_module_1 = require("./modules/companies/companies.module");
const catalog_module_1 = require("./modules/catalog/catalog.module");
const invoicing_module_1 = require("./modules/invoicing/invoicing.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const accounting_module_1 = require("./modules/accounting/accounting.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(tenant_middleware_1.TenantMiddleware)
            .exclude('health', 'auth/login', 'auth/register', 'favicon.ico')
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            tenant_module_1.TenantModule,
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            tenants_module_1.TenantsModule,
            companies_module_1.CompaniesModule,
            catalog_module_1.CatalogModule,
            invoicing_module_1.InvoicingModule,
            inventory_module_1.InventoryModule,
            accounting_module_1.AccountingModule,
        ],
    })
], AppModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUE0RDtBQUM1RCwwREFBc0Q7QUFDdEQsa0VBQThEO0FBQzlELGtFQUE4RDtBQUM5RCxrRUFBOEQ7QUFDOUQsNERBQXdEO0FBQ3hELCtEQUEyRDtBQUMzRCwrREFBMkQ7QUFDM0QscUVBQWlFO0FBQ2pFLDJFQUF1RTtBQUN2RSxxRUFBaUU7QUFDakUsMkVBQXVFO0FBQ3ZFLDJFQUF1RTtBQUN2RSw4RUFBMEU7QUFrQm5FLElBQU0sU0FBUyxHQUFmLE1BQU0sU0FBUztJQUNwQixTQUFTLENBQUMsUUFBNEI7UUFDcEMsUUFBUTthQUNMLEtBQUssQ0FBQyxvQ0FBZ0IsQ0FBQzthQUN2QixPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDO2FBQy9ELFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0YsQ0FBQTtBQVBZLDhCQUFTO29CQUFULFNBQVM7SUFoQnJCLElBQUEsZUFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ1AsNEJBQVk7WUFDWiw0QkFBWTtZQUNaLDRCQUFZO1lBQ1osd0JBQVU7WUFDViwwQkFBVztZQUNYLDBCQUFXO1lBQ1gsOEJBQWE7WUFDYixrQ0FBZTtZQUNmLDhCQUFhO1lBQ2Isa0NBQWU7WUFDZixrQ0FBZTtZQUNmLG9DQUFnQjtTQUNqQjtLQUNGLENBQUM7R0FDVyxTQUFTLENBT3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlLCBNaWRkbGV3YXJlQ29uc3VtZXIgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcmlzbWFNb2R1bGUgfSBmcm9tICcuL3ByaXNtYS9wcmlzbWEubW9kdWxlJztcbmltcG9ydCB7IFRlbmFudE1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy90ZW5hbnQvdGVuYW50Lm1vZHVsZSc7XG5pbXBvcnQgeyBUZW5hbnRNaWRkbGV3YXJlIH0gZnJvbSAnLi9jb21tb24vdGVuYW50Lm1pZGRsZXdhcmUnO1xuaW1wb3J0IHsgSGVhbHRoTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2hlYWx0aC9oZWFsdGgubW9kdWxlJztcbmltcG9ydCB7IEF1dGhNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvYXV0aC9hdXRoLm1vZHVsZSc7XG5pbXBvcnQgeyBVc2Vyc01vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy91c2Vycy91c2Vycy5tb2R1bGUnO1xuaW1wb3J0IHsgUm9sZXNNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvcm9sZXMvcm9sZXMubW9kdWxlJztcbmltcG9ydCB7IFRlbmFudHNNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvdGVuYW50cy90ZW5hbnRzLm1vZHVsZSc7XG5pbXBvcnQgeyBDb21wYW5pZXNNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvY29tcGFuaWVzL2NvbXBhbmllcy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2F0YWxvZ01vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9jYXRhbG9nL2NhdGFsb2cubW9kdWxlJztcbmltcG9ydCB7IEludm9pY2luZ01vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9pbnZvaWNpbmcvaW52b2ljaW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBJbnZlbnRvcnlNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvaW52ZW50b3J5L2ludmVudG9yeS5tb2R1bGUnO1xuaW1wb3J0IHsgQWNjb3VudGluZ01vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9hY2NvdW50aW5nL2FjY291bnRpbmcubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBQcmlzbWFNb2R1bGUsXG4gICAgVGVuYW50TW9kdWxlLFxuICAgIEhlYWx0aE1vZHVsZSxcbiAgICBBdXRoTW9kdWxlLFxuICAgIFVzZXJzTW9kdWxlLFxuICAgIFJvbGVzTW9kdWxlLFxuICAgIFRlbmFudHNNb2R1bGUsXG4gICAgQ29tcGFuaWVzTW9kdWxlLFxuICAgIENhdGFsb2dNb2R1bGUsXG4gICAgSW52b2ljaW5nTW9kdWxlLFxuICAgIEludmVudG9yeU1vZHVsZSxcbiAgICBBY2NvdW50aW5nTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge1xuICBjb25maWd1cmUoY29uc3VtZXI6IE1pZGRsZXdhcmVDb25zdW1lcikge1xuICAgIGNvbnN1bWVyXG4gICAgICAuYXBwbHkoVGVuYW50TWlkZGxld2FyZSlcbiAgICAgIC5leGNsdWRlKCdoZWFsdGgnLCAnYXV0aC9sb2dpbicsICdhdXRoL3JlZ2lzdGVyJywgJ2Zhdmljb24uaWNvJylcbiAgICAgIC5mb3JSb3V0ZXMoJyonKTtcbiAgfVxufVxuIl19