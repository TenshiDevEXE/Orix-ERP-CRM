"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModule = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("./inventory.service");
const inventory_controller_1 = require("./inventory.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [inventory_service_1.InventoryService],
        controllers: [inventory_controller_1.InventoryController],
        exports: [inventory_service_1.InventoryService],
    })
], InventoryModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2ludmVudG9yeS9pbnZlbnRvcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QywyREFBdUQ7QUFDdkQsaUVBQTZEO0FBQzdELDhEQUEwRDtBQVFuRCxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0NBQUcsQ0FBQTtBQUFsQiwwQ0FBZTswQkFBZixlQUFlO0lBTjNCLElBQUEsZUFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUN2QixTQUFTLEVBQUUsQ0FBQyxvQ0FBZ0IsQ0FBQztRQUM3QixXQUFXLEVBQUUsQ0FBQywwQ0FBbUIsQ0FBQztRQUNsQyxPQUFPLEVBQUUsQ0FBQyxvQ0FBZ0IsQ0FBQztLQUM1QixDQUFDO0dBQ1csZUFBZSxDQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gJy4vaW52ZW50b3J5LnNlcnZpY2UnO1xuaW1wb3J0IHsgSW52ZW50b3J5Q29udHJvbGxlciB9IGZyb20gJy4vaW52ZW50b3J5LmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgUHJpc21hTW9kdWxlIH0gZnJvbSAnLi4vLi4vcHJpc21hL3ByaXNtYS5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1ByaXNtYU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0ludmVudG9yeVNlcnZpY2VdLFxuICBjb250cm9sbGVyczogW0ludmVudG9yeUNvbnRyb2xsZXJdLFxuICBleHBvcnRzOiBbSW52ZW50b3J5U2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIEludmVudG9yeU1vZHVsZSB7fVxuIl19