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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const roles_service_1 = require("./roles.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    findAll() {
        return this.rolesService.findAll();
    }
    findOne(id) {
        return this.rolesService.findOne(id);
    }
    create(body) {
        return this.rolesService.create(body);
    }
    update(id, body) {
        return this.rolesService.update(id, body);
    }
    remove(id) {
        return this.rolesService.remove(id);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "remove", null);
exports.RolesController = RolesController = __decorate([
    (0, common_1.Controller)('roles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL3JvbGVzL3JvbGVzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRGO0FBQzVGLG1EQUErQztBQUMvQywyREFBc0Q7QUFJL0MsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQUNOO0lBQXBCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUcsQ0FBQztJQUdsRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHRCxPQUFPLENBQWMsRUFBVTtRQUM3QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFHRCxNQUFNLENBQVMsSUFBOEQ7UUFDM0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBR0QsTUFBTSxDQUFjLEVBQVUsRUFBVSxJQUE2QztRQUNuRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsTUFBTSxDQUFjLEVBQVU7UUFDNUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0YsQ0FBQTtBQTNCWSwwQ0FBZTtBQUkxQjtJQURDLElBQUEsWUFBRyxHQUFFOzs7OzhDQUdMO0FBR0Q7SUFEQyxJQUFBLFlBQUcsRUFBQyxLQUFLLENBQUM7SUFDRixXQUFBLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBOzs7OzhDQUVuQjtBQUdEO0lBREMsSUFBQSxhQUFJLEdBQUU7SUFDQyxXQUFBLElBQUEsYUFBSSxHQUFFLENBQUE7Ozs7NkNBRWI7QUFHRDtJQURDLElBQUEsWUFBRyxFQUFDLEtBQUssQ0FBQztJQUNILFdBQUEsSUFBQSxjQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFBYyxXQUFBLElBQUEsYUFBSSxHQUFFLENBQUE7Ozs7NkNBRXRDO0FBR0Q7SUFEQyxJQUFBLGVBQU0sRUFBQyxLQUFLLENBQUM7SUFDTixXQUFBLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBOzs7OzZDQUVsQjswQkExQlUsZUFBZTtJQUYzQixJQUFBLG1CQUFVLEVBQUMsT0FBTyxDQUFDO0lBQ25CLElBQUEsa0JBQVMsRUFBQyw2QkFBWSxDQUFDO3FDQUVZLDRCQUFZO0dBRG5DLGVBQWUsQ0EyQjNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSwgQm9keSwgUGFyYW0sIFVzZUd1YXJkcyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJvbGVzU2VydmljZSB9IGZyb20gJy4vcm9sZXMuc2VydmljZSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9hdXRoL2p3dC1hdXRoLmd1YXJkJztcblxuQENvbnRyb2xsZXIoJ3JvbGVzJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuZXhwb3J0IGNsYXNzIFJvbGVzQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm9sZXNTZXJ2aWNlOiBSb2xlc1NlcnZpY2UpIHt9XG5cbiAgQEdldCgpXG4gIGZpbmRBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9sZXNTZXJ2aWNlLmZpbmRBbGwoKTtcbiAgfVxuXG4gIEBHZXQoJzppZCcpXG4gIGZpbmRPbmUoQFBhcmFtKCdpZCcpIGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5yb2xlc1NlcnZpY2UuZmluZE9uZShpZCk7XG4gIH1cblxuICBAUG9zdCgpXG4gIGNyZWF0ZShAQm9keSgpIGJvZHk6IHsgbmFtZTogc3RyaW5nOyBkZXNjcmlwdGlvbj86IHN0cmluZzsgdGVuYW50SWQ6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMucm9sZXNTZXJ2aWNlLmNyZWF0ZShib2R5KTtcbiAgfVxuXG4gIEBQdXQoJzppZCcpXG4gIHVwZGF0ZShAUGFyYW0oJ2lkJykgaWQ6IHN0cmluZywgQEJvZHkoKSBib2R5OiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5yb2xlc1NlcnZpY2UudXBkYXRlKGlkLCBib2R5KTtcbiAgfVxuXG4gIEBEZWxldGUoJzppZCcpXG4gIHJlbW92ZShAUGFyYW0oJ2lkJykgaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnJvbGVzU2VydmljZS5yZW1vdmUoaWQpO1xuICB9XG59XG4iXX0=