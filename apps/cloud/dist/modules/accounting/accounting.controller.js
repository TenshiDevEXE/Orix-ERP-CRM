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
exports.AccountingController = void 0;
const common_1 = require("@nestjs/common");
const accounting_service_1 = require("./accounting.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let AccountingController = class AccountingController {
    accountingService;
    constructor(accountingService) {
        this.accountingService = accountingService;
    }
    findAccounts() {
        return this.accountingService.findAccounts();
    }
    createAccount(body) {
        return this.accountingService.createAccount(body);
    }
    findJournalEntries() {
        return this.accountingService.findJournalEntries();
    }
    createJournalEntry(body) {
        return this.accountingService.createJournalEntry(body);
    }
    findPeriods() {
        return this.accountingService.findPeriods();
    }
    createPeriod(body) {
        return this.accountingService.createPeriod(body);
    }
    closePeriod(id) {
        return this.accountingService.closePeriod(id);
    }
};
exports.AccountingController = AccountingController;
__decorate([
    (0, common_1.Get)('accounts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "findAccounts", null);
__decorate([
    (0, common_1.Post)('accounts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)('journal-entries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "findJournalEntries", null);
__decorate([
    (0, common_1.Post)('journal-entries'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createJournalEntry", null);
__decorate([
    (0, common_1.Get)('periods'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "findPeriods", null);
__decorate([
    (0, common_1.Post)('periods'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createPeriod", null);
__decorate([
    (0, common_1.Put)('periods/:id/close'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "closePeriod", null);
exports.AccountingController = AccountingController = __decorate([
    (0, common_1.Controller)('accounting'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [accounting_service_1.AccountingService])
], AccountingController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudGluZy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvYWNjb3VudGluZy9hY2NvdW50aW5nLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW9GO0FBQ3BGLDZEQUF5RDtBQUN6RCwyREFBc0Q7QUFJL0MsSUFBTSxvQkFBb0IsR0FBMUIsTUFBTSxvQkFBb0I7SUFDWDtJQUFwQixZQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFHLENBQUM7SUFHNUQsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFHRCxhQUFhLENBQVMsSUFBUztRQUM3QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUdELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFHRCxrQkFBa0IsQ0FBUyxJQUFTO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFHRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUdELFlBQVksQ0FBUyxJQUFTO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBR0QsV0FBVyxDQUFjLEVBQVU7UUFDakMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRixDQUFBO0FBckNZLG9EQUFvQjtBQUkvQjtJQURDLElBQUEsWUFBRyxFQUFDLFVBQVUsQ0FBQzs7Ozt3REFHZjtBQUdEO0lBREMsSUFBQSxhQUFJLEVBQUMsVUFBVSxDQUFDO0lBQ0YsV0FBQSxJQUFBLGFBQUksR0FBRSxDQUFBOzs7O3lEQUVwQjtBQUdEO0lBREMsSUFBQSxZQUFHLEVBQUMsaUJBQWlCLENBQUM7Ozs7OERBR3RCO0FBR0Q7SUFEQyxJQUFBLGFBQUksRUFBQyxpQkFBaUIsQ0FBQztJQUNKLFdBQUEsSUFBQSxhQUFJLEdBQUUsQ0FBQTs7Ozs4REFFekI7QUFHRDtJQURDLElBQUEsWUFBRyxFQUFDLFNBQVMsQ0FBQzs7Ozt1REFHZDtBQUdEO0lBREMsSUFBQSxhQUFJLEVBQUMsU0FBUyxDQUFDO0lBQ0YsV0FBQSxJQUFBLGFBQUksR0FBRSxDQUFBOzs7O3dEQUVuQjtBQUdEO0lBREMsSUFBQSxZQUFHLEVBQUMsbUJBQW1CLENBQUM7SUFDWixXQUFBLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBOzs7O3VEQUV2QjsrQkFwQ1Usb0JBQW9CO0lBRmhDLElBQUEsbUJBQVUsRUFBQyxZQUFZLENBQUM7SUFDeEIsSUFBQSxrQkFBUyxFQUFDLDZCQUFZLENBQUM7cUNBRWlCLHNDQUFpQjtHQUQ3QyxvQkFBb0IsQ0FxQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIEJvZHksIFBhcmFtLCBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBBY2NvdW50aW5nU2VydmljZSB9IGZyb20gJy4vYWNjb3VudGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2F1dGgvand0LWF1dGguZ3VhcmQnO1xuXG5AQ29udHJvbGxlcignYWNjb3VudGluZycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBBY2NvdW50aW5nQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWNjb3VudGluZ1NlcnZpY2U6IEFjY291bnRpbmdTZXJ2aWNlKSB7fVxuXG4gIEBHZXQoJ2FjY291bnRzJylcbiAgZmluZEFjY291bnRzKCkge1xuICAgIHJldHVybiB0aGlzLmFjY291bnRpbmdTZXJ2aWNlLmZpbmRBY2NvdW50cygpO1xuICB9XG5cbiAgQFBvc3QoJ2FjY291bnRzJylcbiAgY3JlYXRlQWNjb3VudChAQm9keSgpIGJvZHk6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmFjY291bnRpbmdTZXJ2aWNlLmNyZWF0ZUFjY291bnQoYm9keSk7XG4gIH1cblxuICBAR2V0KCdqb3VybmFsLWVudHJpZXMnKVxuICBmaW5kSm91cm5hbEVudHJpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNjb3VudGluZ1NlcnZpY2UuZmluZEpvdXJuYWxFbnRyaWVzKCk7XG4gIH1cblxuICBAUG9zdCgnam91cm5hbC1lbnRyaWVzJylcbiAgY3JlYXRlSm91cm5hbEVudHJ5KEBCb2R5KCkgYm9keTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuYWNjb3VudGluZ1NlcnZpY2UuY3JlYXRlSm91cm5hbEVudHJ5KGJvZHkpO1xuICB9XG5cbiAgQEdldCgncGVyaW9kcycpXG4gIGZpbmRQZXJpb2RzKCkge1xuICAgIHJldHVybiB0aGlzLmFjY291bnRpbmdTZXJ2aWNlLmZpbmRQZXJpb2RzKCk7XG4gIH1cblxuICBAUG9zdCgncGVyaW9kcycpXG4gIGNyZWF0ZVBlcmlvZChAQm9keSgpIGJvZHk6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmFjY291bnRpbmdTZXJ2aWNlLmNyZWF0ZVBlcmlvZChib2R5KTtcbiAgfVxuXG4gIEBQdXQoJ3BlcmlvZHMvOmlkL2Nsb3NlJylcbiAgY2xvc2VQZXJpb2QoQFBhcmFtKCdpZCcpIGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5hY2NvdW50aW5nU2VydmljZS5jbG9zZVBlcmlvZChpZCk7XG4gIH1cbn1cbiJdfQ==