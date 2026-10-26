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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./local-auth.guard");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async register(body) {
        return this.authService.register(body);
    }
    getProfile(req) {
        return req.user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvYXV0aC9hdXRoLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQWlGO0FBQ2pGLGlEQUE2QztBQUM3Qyx5REFBb0Q7QUFDcEQscURBQWdEO0FBR3pDLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFDTDtJQUFwQixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7SUFJMUMsQUFBTixLQUFLLENBQUMsS0FBSyxDQUFZLEdBQVE7UUFDN0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLFFBQVEsQ0FBUyxJQU90QjtRQUNDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUlELFVBQVUsQ0FBWSxHQUFRO1FBQzVCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0NBQ0YsQ0FBQTtBQTFCWSx3Q0FBYztBQUtuQjtJQUZMLElBQUEsa0JBQVMsRUFBQyxpQ0FBYyxDQUFDO0lBQ3pCLElBQUEsYUFBSSxFQUFDLE9BQU8sQ0FBQztJQUNELFdBQUEsSUFBQSxnQkFBTyxHQUFFLENBQUE7Ozs7MkNBRXJCO0FBR0s7SUFETCxJQUFBLGFBQUksRUFBQyxVQUFVLENBQUM7SUFDRCxXQUFBLElBQUEsYUFBSSxHQUFFLENBQUE7Ozs7OENBU3JCO0FBSUQ7SUFGQyxJQUFBLGtCQUFTLEVBQUMsNkJBQVksQ0FBQztJQUN2QixJQUFBLFlBQUcsRUFBQyxTQUFTLENBQUM7SUFDSCxXQUFBLElBQUEsZ0JBQU8sR0FBRSxDQUFBOzs7O2dEQUVwQjt5QkF6QlUsY0FBYztJQUQxQixJQUFBLG1CQUFVLEVBQUMsTUFBTSxDQUFDO3FDQUVnQiwwQkFBVztHQURqQyxjQUFjLENBMEIxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xsZXIsIFBvc3QsIEJvZHksIFVzZUd1YXJkcywgUmVxdWVzdCwgR2V0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbEF1dGhHdWFyZCB9IGZyb20gJy4vbG9jYWwtYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuL2p3dC1hdXRoLmd1YXJkJztcblxuQENvbnRyb2xsZXIoJ2F1dGgnKVxuZXhwb3J0IGNsYXNzIEF1dGhDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHt9XG5cbiAgQFVzZUd1YXJkcyhMb2NhbEF1dGhHdWFyZClcbiAgQFBvc3QoJ2xvZ2luJylcbiAgYXN5bmMgbG9naW4oQFJlcXVlc3QoKSByZXE6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luKHJlcS51c2VyKTtcbiAgfVxuXG4gIEBQb3N0KCdyZWdpc3RlcicpXG4gIGFzeW5jIHJlZ2lzdGVyKEBCb2R5KCkgYm9keToge1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbiAgICBmaXJzdE5hbWU6IHN0cmluZztcbiAgICBsYXN0TmFtZTogc3RyaW5nO1xuICAgIGNvbXBhbnlJZDogc3RyaW5nO1xuICAgIHRlbmFudElkOiBzdHJpbmc7XG4gIH0pIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5yZWdpc3Rlcihib2R5KTtcbiAgfVxuXG4gIEBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuICBAR2V0KCdwcm9maWxlJylcbiAgZ2V0UHJvZmlsZShAUmVxdWVzdCgpIHJlcTogYW55KSB7XG4gICAgcmV0dXJuIHJlcS51c2VyO1xuICB9XG59XG4iXX0=