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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, body) {
        return this.usersService.update(id, body);
    }
    assignRole(id, roleId) {
        return this.usersService.assignRole(id, roleId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/roles'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "assignRole", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXJzL3VzZXJzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW9GO0FBQ3BGLG1EQUErQztBQUMvQywyREFBc0Q7QUFJL0MsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQUNOO0lBQXBCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUcsQ0FBQztJQUdsRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFHRCxPQUFPLENBQWMsRUFBVTtRQUM3QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFHRCxNQUFNLENBQWMsRUFBVSxFQUFVLElBQVM7UUFDL0MsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUdELFVBQVUsQ0FBYyxFQUFVLEVBQWtCLE1BQWM7UUFDaEUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNGLENBQUE7QUF0QlksMENBQWU7QUFJMUI7SUFEQyxJQUFBLFlBQUcsR0FBRTs7Ozs4Q0FHTDtBQUdEO0lBREMsSUFBQSxZQUFHLEVBQUMsS0FBSyxDQUFDO0lBQ0YsV0FBQSxJQUFBLGNBQUssRUFBQyxJQUFJLENBQUMsQ0FBQTs7Ozs4Q0FFbkI7QUFHRDtJQURDLElBQUEsWUFBRyxFQUFDLEtBQUssQ0FBQztJQUNILFdBQUEsSUFBQSxjQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFBYyxXQUFBLElBQUEsYUFBSSxHQUFFLENBQUE7Ozs7NkNBRXRDO0FBR0Q7SUFEQyxJQUFBLGFBQUksRUFBQyxXQUFXLENBQUM7SUFDTixXQUFBLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQWMsV0FBQSxJQUFBLGFBQUksRUFBQyxRQUFRLENBQUMsQ0FBQTs7OztpREFFbEQ7MEJBckJVLGVBQWU7SUFGM0IsSUFBQSxtQkFBVSxFQUFDLE9BQU8sQ0FBQztJQUNuQixJQUFBLGtCQUFTLEVBQUMsNkJBQVksQ0FBQztxQ0FFWSw0QkFBWTtHQURuQyxlQUFlLENBc0IzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgUG9zdCwgUHV0LCBCb2R5LCBQYXJhbSwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlcnNTZXJ2aWNlIH0gZnJvbSAnLi91c2Vycy5zZXJ2aWNlJztcbmltcG9ydCB7IEp3dEF1dGhHdWFyZCB9IGZyb20gJy4uL2F1dGgvand0LWF1dGguZ3VhcmQnO1xuXG5AQ29udHJvbGxlcigndXNlcnMnKVxuQFVzZUd1YXJkcyhKd3RBdXRoR3VhcmQpXG5leHBvcnQgY2xhc3MgVXNlcnNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2Vyc1NlcnZpY2U6IFVzZXJzU2VydmljZSkge31cblxuICBAR2V0KClcbiAgZmluZEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy51c2Vyc1NlcnZpY2UuZmluZEFsbCgpO1xuICB9XG5cbiAgQEdldCgnOmlkJylcbiAgZmluZE9uZShAUGFyYW0oJ2lkJykgaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnVzZXJzU2VydmljZS5maW5kT25lKGlkKTtcbiAgfVxuXG4gIEBQdXQoJzppZCcpXG4gIHVwZGF0ZShAUGFyYW0oJ2lkJykgaWQ6IHN0cmluZywgQEJvZHkoKSBib2R5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy51c2Vyc1NlcnZpY2UudXBkYXRlKGlkLCBib2R5KTtcbiAgfVxuXG4gIEBQb3N0KCc6aWQvcm9sZXMnKVxuICBhc3NpZ25Sb2xlKEBQYXJhbSgnaWQnKSBpZDogc3RyaW5nLCBAQm9keSgncm9sZUlkJykgcm9sZUlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy51c2Vyc1NlcnZpY2UuYXNzaWduUm9sZShpZCwgcm9sZUlkKTtcbiAgfVxufVxuIl19