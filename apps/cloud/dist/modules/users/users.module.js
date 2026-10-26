"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvdXNlcnMvdXNlcnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QyxtREFBK0M7QUFDL0MseURBQXFEO0FBQ3JELDhEQUEwRDtBQVFuRCxJQUFNLFdBQVcsR0FBakIsTUFBTSxXQUFXO0NBQUcsQ0FBQTtBQUFkLGtDQUFXO3NCQUFYLFdBQVc7SUFOdkIsSUFBQSxlQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1FBQ3ZCLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7UUFDekIsV0FBVyxFQUFFLENBQUMsa0NBQWUsQ0FBQztRQUM5QixPQUFPLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQ3hCLENBQUM7R0FDVyxXQUFXLENBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBVc2Vyc1NlcnZpY2UgfSBmcm9tICcuL3VzZXJzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlcnNDb250cm9sbGVyIH0gZnJvbSAnLi91c2Vycy5jb250cm9sbGVyJztcbmltcG9ydCB7IFByaXNtYU1vZHVsZSB9IGZyb20gJy4uLy4uL3ByaXNtYS9wcmlzbWEubW9kdWxlJztcblxuQE1vZHVsZSh7XG4gIGltcG9ydHM6IFtQcmlzbWFNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtVc2Vyc1NlcnZpY2VdLFxuICBjb250cm9sbGVyczogW1VzZXJzQ29udHJvbGxlcl0sXG4gIGV4cG9ydHM6IFtVc2Vyc1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2Vyc01vZHVsZSB7fVxuIl19