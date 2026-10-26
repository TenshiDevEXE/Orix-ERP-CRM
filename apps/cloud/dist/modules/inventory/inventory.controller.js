"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("./inventory.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let InventoryController = class InventoryController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    findMovements() {
        return this.inventoryService.findMovements();
    }
    createMovement(body) {
        return this.inventoryService.createMovement(body);
    }
    findBalances() {
        return this.inventoryService.findBalances();
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)('movements'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findMovements", null);
__decorate([
    (0, common_1.Post)('movements'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "createMovement", null);
__decorate([
    (0, common_1.Get)('balances'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findBalances", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('inventory'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9pbnZlbnRvcnkvaW52ZW50b3J5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXdFO0FBQ3hFLDJEQUF1RDtBQUN2RCwyREFBc0Q7QUFJL0MsSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBbUI7SUFDVjtJQUFwQixZQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFHMUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFHRCxjQUFjLENBQVMsSUFBUztRQUM5QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUdELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0NBQ0YsQ0FBQTtBQWpCWSxrREFBbUI7QUFJOUI7SUFEQyxJQUFBLFlBQUcsRUFBQyxXQUFXLENBQUM7Ozs7d0RBR2hCO0FBR0Q7SUFEQyxJQUFBLGFBQUksRUFBQyxXQUFXLENBQUM7SUFDRixXQUFBLElBQUEsYUFBSSxHQUFFLENBQUE7Ozs7eURBRXJCO0FBR0Q7SUFEQyxJQUFBLFlBQUcsRUFBQyxVQUFVLENBQUM7Ozs7dURBR2Y7OEJBaEJVLG1CQUFtQjtJQUYvQixJQUFBLG1CQUFVLEVBQUMsV0FBVyxDQUFDO0lBQ3ZCLElBQUEsa0JBQVMsRUFBQyw2QkFBWSxDQUFDO3FDQUVnQixvQ0FBZ0I7R0FEM0MsbUJBQW1CLENBaUIvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgUG9zdCwgQm9keSwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSW52ZW50b3J5U2VydmljZSB9IGZyb20gJy4vaW52ZW50b3J5LnNlcnZpY2UnO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vYXV0aC9qd3QtYXV0aC5ndWFyZCc7XG5cbkBDb250cm9sbGVyKCdpbnZlbnRvcnknKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG5leHBvcnQgY2xhc3MgSW52ZW50b3J5Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW52ZW50b3J5U2VydmljZTogSW52ZW50b3J5U2VydmljZSkge31cblxuICBAR2V0KCdtb3ZlbWVudHMnKVxuICBmaW5kTW92ZW1lbnRzKCkge1xuICAgIHJldHVybiB0aGlzLmludmVudG9yeVNlcnZpY2UuZmluZE1vdmVtZW50cygpO1xuICB9XG5cbiAgQFBvc3QoJ21vdmVtZW50cycpXG4gIGNyZWF0ZU1vdmVtZW50KEBCb2R5KCkgYm9keTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaW52ZW50b3J5U2VydmljZS5jcmVhdGVNb3ZlbWVudChib2R5KTtcbiAgfVxuXG4gIEBHZXQoJ2JhbGFuY2VzJylcbiAgZmluZEJhbGFuY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmludmVudG9yeVNlcnZpY2UuZmluZEJhbGFuY2VzKCk7XG4gIH1cbn1cbiJdfQ==