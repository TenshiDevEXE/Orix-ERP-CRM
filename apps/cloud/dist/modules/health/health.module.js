"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthModule = void 0;
const common_1 = require("@nestjs/common");
const health_controller_1 = require("./health.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [health_controller_1.HealthController],
    })
], HealthModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhbHRoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2hlYWx0aC9oZWFsdGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QywyREFBdUQ7QUFDdkQsOERBQTBEO0FBTW5ELElBQU0sWUFBWSxHQUFsQixNQUFNLFlBQVk7Q0FBRyxDQUFBO0FBQWYsb0NBQVk7dUJBQVosWUFBWTtJQUp4QixJQUFBLGVBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSxDQUFDLDRCQUFZLENBQUM7UUFDdkIsV0FBVyxFQUFFLENBQUMsb0NBQWdCLENBQUM7S0FDaEMsQ0FBQztHQUNXLFlBQVksQ0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEhlYWx0aENvbnRyb2xsZXIgfSBmcm9tICcuL2hlYWx0aC5jb250cm9sbGVyJztcbmltcG9ydCB7IFByaXNtYU1vZHVsZSB9IGZyb20gJy4uLy4uL3ByaXNtYS9wcmlzbWEubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtQcmlzbWFNb2R1bGVdLFxuICBjb250cm9sbGVyczogW0hlYWx0aENvbnRyb2xsZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBIZWFsdGhNb2R1bGUge31cbiJdfQ==