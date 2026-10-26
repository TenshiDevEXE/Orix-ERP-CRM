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
exports.TenantsController = void 0;
const common_1 = require("@nestjs/common");
const tenants_service_1 = require("./tenants.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TenantsController = class TenantsController {
    tenantsService;
    constructor(tenantsService) {
        this.tenantsService = tenantsService;
    }
    findAll() {
        return this.tenantsService.findAll();
    }
    findOne(id) {
        return this.tenantsService.findOne(id);
    }
    create(body) {
        return this.tenantsService.create(body);
    }
    update(id, body) {
        return this.tenantsService.update(id, body);
    }
    remove(id) {
        return this.tenantsService.remove(id);
    }
};
exports.TenantsController = TenantsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "remove", null);
exports.TenantsController = TenantsController = __decorate([
    (0, common_1.Controller)('tenants'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [tenants_service_1.TenantsService])
], TenantsController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50cy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvdGVuYW50cy90ZW5hbnRzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRGO0FBQzVGLHVEQUFtRDtBQUNuRCwyREFBc0Q7QUFJL0MsSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBaUI7SUFDUjtJQUFwQixZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBRyxDQUFDO0lBR3RELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUdELE9BQU8sQ0FBYyxFQUFVO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUdELE1BQU0sQ0FBUyxJQUFxRDtRQUNsRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFHRCxNQUFNLENBQWMsRUFBVSxFQUFVLElBQXNEO1FBQzVGLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFHRCxNQUFNLENBQWMsRUFBVTtRQUM1QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FDRixDQUFBO0FBM0JZLDhDQUFpQjtBQUk1QjtJQURDLElBQUEsWUFBRyxHQUFFOzs7O2dEQUdMO0FBR0Q7SUFEQyxJQUFBLFlBQUcsRUFBQyxLQUFLLENBQUM7SUFDRixXQUFBLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBOzs7O2dEQUVuQjtBQUdEO0lBREMsSUFBQSxhQUFJLEdBQUU7SUFDQyxXQUFBLElBQUEsYUFBSSxHQUFFLENBQUE7Ozs7K0NBRWI7QUFHRDtJQURDLElBQUEsWUFBRyxFQUFDLEtBQUssQ0FBQztJQUNILFdBQUEsSUFBQSxjQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFBYyxXQUFBLElBQUEsYUFBSSxHQUFFLENBQUE7Ozs7K0NBRXRDO0FBR0Q7SUFEQyxJQUFBLGVBQU0sRUFBQyxLQUFLLENBQUM7SUFDTixXQUFBLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBOzs7OytDQUVsQjs0QkExQlUsaUJBQWlCO0lBRjdCLElBQUEsbUJBQVUsRUFBQyxTQUFTLENBQUM7SUFDckIsSUFBQSxrQkFBUyxFQUFDLDZCQUFZLENBQUM7cUNBRWMsZ0NBQWM7R0FEdkMsaUJBQWlCLENBMkI3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgUG9zdCwgUHV0LCBEZWxldGUsIEJvZHksIFBhcmFtLCBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBUZW5hbnRzU2VydmljZSB9IGZyb20gJy4vdGVuYW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2F1dGgvand0LWF1dGguZ3VhcmQnO1xuXG5AQ29udHJvbGxlcigndGVuYW50cycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBUZW5hbnRzQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGVuYW50c1NlcnZpY2U6IFRlbmFudHNTZXJ2aWNlKSB7fVxuXG4gIEBHZXQoKVxuICBmaW5kQWxsKCkge1xuICAgIHJldHVybiB0aGlzLnRlbmFudHNTZXJ2aWNlLmZpbmRBbGwoKTtcbiAgfVxuXG4gIEBHZXQoJzppZCcpXG4gIGZpbmRPbmUoQFBhcmFtKCdpZCcpIGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy50ZW5hbnRzU2VydmljZS5maW5kT25lKGlkKTtcbiAgfVxuXG4gIEBQb3N0KClcbiAgY3JlYXRlKEBCb2R5KCkgYm9keTogeyBuYW1lOiBzdHJpbmc7IHJuYz86IHN0cmluZzsgc3RhdHVzPzogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy50ZW5hbnRzU2VydmljZS5jcmVhdGUoYm9keSk7XG4gIH1cblxuICBAUHV0KCc6aWQnKVxuICB1cGRhdGUoQFBhcmFtKCdpZCcpIGlkOiBzdHJpbmcsIEBCb2R5KCkgYm9keTogeyBuYW1lPzogc3RyaW5nOyBybmM/OiBzdHJpbmc7IHN0YXR1cz86IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMudGVuYW50c1NlcnZpY2UudXBkYXRlKGlkLCBib2R5KTtcbiAgfVxuXG4gIEBEZWxldGUoJzppZCcpXG4gIHJlbW92ZShAUGFyYW0oJ2lkJykgaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnRlbmFudHNTZXJ2aWNlLnJlbW92ZShpZCk7XG4gIH1cbn1cbiJdfQ==