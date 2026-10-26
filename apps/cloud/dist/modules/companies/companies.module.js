"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesModule = void 0;
const common_1 = require("@nestjs/common");
const companies_service_1 = require("./companies.service");
const companies_controller_1 = require("./companies.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let CompaniesModule = class CompaniesModule {
};
exports.CompaniesModule = CompaniesModule;
exports.CompaniesModule = CompaniesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [companies_service_1.CompaniesService],
        controllers: [companies_controller_1.CompaniesController],
        exports: [companies_service_1.CompaniesService],
    })
], CompaniesModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFuaWVzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2NvbXBhbmllcy9jb21wYW5pZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QywyREFBdUQ7QUFDdkQsaUVBQTZEO0FBQzdELDhEQUEwRDtBQVFuRCxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0NBQUcsQ0FBQTtBQUFsQiwwQ0FBZTswQkFBZixlQUFlO0lBTjNCLElBQUEsZUFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUN2QixTQUFTLEVBQUUsQ0FBQyxvQ0FBZ0IsQ0FBQztRQUM3QixXQUFXLEVBQUUsQ0FBQywwQ0FBbUIsQ0FBQztRQUNsQyxPQUFPLEVBQUUsQ0FBQyxvQ0FBZ0IsQ0FBQztLQUM1QixDQUFDO0dBQ1csZUFBZSxDQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29tcGFuaWVzU2VydmljZSB9IGZyb20gJy4vY29tcGFuaWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcGFuaWVzQ29udHJvbGxlciB9IGZyb20gJy4vY29tcGFuaWVzLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUHJpc21hTW9kdWxlIH0gZnJvbSAnLi4vLi4vcHJpc21hL3ByaXNtYS5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1ByaXNtYU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0NvbXBhbmllc1NlcnZpY2VdLFxuICBjb250cm9sbGVyczogW0NvbXBhbmllc0NvbnRyb2xsZXJdLFxuICBleHBvcnRzOiBbQ29tcGFuaWVzU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIENvbXBhbmllc01vZHVsZSB7fVxuIl19