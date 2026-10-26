"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpc21hLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcmlzbWEvcHJpc21hLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFDaEQscURBQWlEO0FBTzFDLElBQU0sWUFBWSxHQUFsQixNQUFNLFlBQVk7Q0FBRyxDQUFBO0FBQWYsb0NBQVk7dUJBQVosWUFBWTtJQUx4QixJQUFBLGVBQU0sR0FBRTtJQUNSLElBQUEsZUFBTSxFQUFDO1FBQ04sU0FBUyxFQUFFLENBQUMsOEJBQWEsQ0FBQztRQUMxQixPQUFPLEVBQUUsQ0FBQyw4QkFBYSxDQUFDO0tBQ3pCLENBQUM7R0FDVyxZQUFZLENBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGUsIEdsb2JhbCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFByaXNtYVNlcnZpY2UgfSBmcm9tICcuL3ByaXNtYS5zZXJ2aWNlJztcblxuQEdsb2JhbCgpXG5ATW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbUHJpc21hU2VydmljZV0sXG4gIGV4cG9ydHM6IFtQcmlzbWFTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJpc21hTW9kdWxlIHt9XG4iXX0=