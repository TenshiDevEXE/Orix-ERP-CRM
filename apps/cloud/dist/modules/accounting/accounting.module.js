"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingModule = void 0;
const common_1 = require("@nestjs/common");
const accounting_service_1 = require("./accounting.service");
const accounting_controller_1 = require("./accounting.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let AccountingModule = class AccountingModule {
};
exports.AccountingModule = AccountingModule;
exports.AccountingModule = AccountingModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [accounting_service_1.AccountingService],
        controllers: [accounting_controller_1.AccountingController],
        exports: [accounting_service_1.AccountingService],
    })
], AccountingModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9hY2NvdW50aW5nL2FjY291bnRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUF3QztBQUN4Qyw2REFBeUQ7QUFDekQsbUVBQStEO0FBQy9ELDhEQUEwRDtBQVFuRCxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtDQUFHLENBQUE7QUFBbkIsNENBQWdCOzJCQUFoQixnQkFBZ0I7SUFONUIsSUFBQSxlQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1FBQ3ZCLFNBQVMsRUFBRSxDQUFDLHNDQUFpQixDQUFDO1FBQzlCLFdBQVcsRUFBRSxDQUFDLDRDQUFvQixDQUFDO1FBQ25DLE9BQU8sRUFBRSxDQUFDLHNDQUFpQixDQUFDO0tBQzdCLENBQUM7R0FDVyxnQkFBZ0IsQ0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEFjY291bnRpbmdTZXJ2aWNlIH0gZnJvbSAnLi9hY2NvdW50aW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWNjb3VudGluZ0NvbnRyb2xsZXIgfSBmcm9tICcuL2FjY291bnRpbmcuY29udHJvbGxlcic7XG5pbXBvcnQgeyBQcmlzbWFNb2R1bGUgfSBmcm9tICcuLi8uLi9wcmlzbWEvcHJpc21hLm1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbUHJpc21hTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbQWNjb3VudGluZ1NlcnZpY2VdLFxuICBjb250cm9sbGVyczogW0FjY291bnRpbmdDb250cm9sbGVyXSxcbiAgZXhwb3J0czogW0FjY291bnRpbmdTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudGluZ01vZHVsZSB7fVxuIl19