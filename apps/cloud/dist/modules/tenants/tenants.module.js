"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsModule = void 0;
const common_1 = require("@nestjs/common");
const tenants_service_1 = require("./tenants.service");
const tenants_controller_1 = require("./tenants.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let TenantsModule = class TenantsModule {
};
exports.TenantsModule = TenantsModule;
exports.TenantsModule = TenantsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [tenants_service_1.TenantsService],
        controllers: [tenants_controller_1.TenantsController],
        exports: [tenants_service_1.TenantsService],
    })
], TenantsModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy90ZW5hbnRzL3RlbmFudHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUF3QztBQUN4Qyx1REFBbUQ7QUFDbkQsNkRBQXlEO0FBQ3pELDhEQUEwRDtBQVFuRCxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0NBQUcsQ0FBQTtBQUFoQixzQ0FBYTt3QkFBYixhQUFhO0lBTnpCLElBQUEsZUFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUN2QixTQUFTLEVBQUUsQ0FBQyxnQ0FBYyxDQUFDO1FBQzNCLFdBQVcsRUFBRSxDQUFDLHNDQUFpQixDQUFDO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLGdDQUFjLENBQUM7S0FDMUIsQ0FBQztHQUNXLGFBQWEsQ0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFRlbmFudHNTZXJ2aWNlIH0gZnJvbSAnLi90ZW5hbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGVuYW50c0NvbnRyb2xsZXIgfSBmcm9tICcuL3RlbmFudHMuY29udHJvbGxlcic7XG5pbXBvcnQgeyBQcmlzbWFNb2R1bGUgfSBmcm9tICcuLi8uLi9wcmlzbWEvcHJpc21hLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbUHJpc21hTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbVGVuYW50c1NlcnZpY2VdLFxuICBjb250cm9sbGVyczogW1RlbmFudHNDb250cm9sbGVyXSxcbiAgZXhwb3J0czogW1RlbmFudHNTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgVGVuYW50c01vZHVsZSB7fVxuIl19