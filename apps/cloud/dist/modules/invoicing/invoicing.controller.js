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
exports.InvoicingController = void 0;
const common_1 = require("@nestjs/common");
const invoicing_service_1 = require("./invoicing.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let InvoicingController = class InvoicingController {
    invoicingService;
    constructor(invoicingService) {
        this.invoicingService = invoicingService;
    }
    findInvoices() {
        return this.invoicingService.findInvoices();
    }
    createInvoice(body) {
        return this.invoicingService.createInvoice(body);
    }
    updateInvoiceStatus(id, status) {
        return this.invoicingService.updateInvoiceStatus(id, status);
    }
};
exports.InvoicingController = InvoicingController;
__decorate([
    (0, common_1.Get)('invoices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoicingController.prototype, "findInvoices", null);
__decorate([
    (0, common_1.Post)('invoices'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InvoicingController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Put)('invoices/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InvoicingController.prototype, "updateInvoiceStatus", null);
exports.InvoicingController = InvoicingController = __decorate([
    (0, common_1.Controller)('invoicing'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [invoicing_service_1.InvoicingService])
], InvoicingController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljaW5nLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9pbnZvaWNpbmcvaW52b2ljaW5nLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW9GO0FBQ3BGLDJEQUF1RDtBQUN2RCwyREFBc0Q7QUFJL0MsSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBbUI7SUFDVjtJQUFwQixZQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFHMUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFHRCxhQUFhLENBQVMsSUFBUztRQUM3QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUdELG1CQUFtQixDQUFjLEVBQVUsRUFBa0IsTUFBYztRQUN6RSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGLENBQUE7QUFqQlksa0RBQW1CO0FBSTlCO0lBREMsSUFBQSxZQUFHLEVBQUMsVUFBVSxDQUFDOzs7O3VEQUdmO0FBR0Q7SUFEQyxJQUFBLGFBQUksRUFBQyxVQUFVLENBQUM7SUFDRixXQUFBLElBQUEsYUFBSSxHQUFFLENBQUE7Ozs7d0RBRXBCO0FBR0Q7SUFEQyxJQUFBLFlBQUcsRUFBQyxxQkFBcUIsQ0FBQztJQUNOLFdBQUEsSUFBQSxjQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFBYyxXQUFBLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQyxDQUFBOzs7OzhEQUUzRDs4QkFoQlUsbUJBQW1CO0lBRi9CLElBQUEsbUJBQVUsRUFBQyxXQUFXLENBQUM7SUFDdkIsSUFBQSxrQkFBUyxFQUFDLDZCQUFZLENBQUM7cUNBRWdCLG9DQUFnQjtHQUQzQyxtQkFBbUIsQ0FpQi9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIEJvZHksIFBhcmFtLCBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJbnZvaWNpbmdTZXJ2aWNlIH0gZnJvbSAnLi9pbnZvaWNpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9hdXRoL2p3dC1hdXRoLmd1YXJkJztcblxuQENvbnRyb2xsZXIoJ2ludm9pY2luZycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBJbnZvaWNpbmdDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbnZvaWNpbmdTZXJ2aWNlOiBJbnZvaWNpbmdTZXJ2aWNlKSB7fVxuXG4gIEBHZXQoJ2ludm9pY2VzJylcbiAgZmluZEludm9pY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmludm9pY2luZ1NlcnZpY2UuZmluZEludm9pY2VzKCk7XG4gIH1cblxuICBAUG9zdCgnaW52b2ljZXMnKVxuICBjcmVhdGVJbnZvaWNlKEBCb2R5KCkgYm9keTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaW52b2ljaW5nU2VydmljZS5jcmVhdGVJbnZvaWNlKGJvZHkpO1xuICB9XG5cbiAgQFB1dCgnaW52b2ljZXMvOmlkL3N0YXR1cycpXG4gIHVwZGF0ZUludm9pY2VTdGF0dXMoQFBhcmFtKCdpZCcpIGlkOiBzdHJpbmcsIEBCb2R5KCdzdGF0dXMnKSBzdGF0dXM6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmludm9pY2luZ1NlcnZpY2UudXBkYXRlSW52b2ljZVN0YXR1cyhpZCwgc3RhdHVzKTtcbiAgfVxufVxuIl19