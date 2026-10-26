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
exports.CompaniesController = void 0;
const common_1 = require("@nestjs/common");
const companies_service_1 = require("./companies.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CompaniesController = class CompaniesController {
    companiesService;
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    findAll() {
        return this.companiesService.findAll();
    }
    findOne(id) {
        return this.companiesService.findOne(id);
    }
    create(body) {
        return this.companiesService.create(body);
    }
    update(id, body) {
        return this.companiesService.update(id, body);
    }
    remove(id) {
        return this.companiesService.remove(id);
    }
};
exports.CompaniesController = CompaniesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "remove", null);
exports.CompaniesController = CompaniesController = __decorate([
    (0, common_1.Controller)('companies'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], CompaniesController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFuaWVzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9jb21wYW5pZXMvY29tcGFuaWVzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRGO0FBQzVGLDJEQUF1RDtBQUN2RCwyREFBc0Q7QUFJL0MsSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBbUI7SUFDVjtJQUFwQixZQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFHLENBQUM7SUFHMUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFHRCxPQUFPLENBQWMsRUFBVTtRQUM3QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUdELE1BQU0sQ0FBUyxJQUFTO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsTUFBTSxDQUFjLEVBQVUsRUFBVSxJQUFTO1FBQy9DLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdELE1BQU0sQ0FBYyxFQUFVO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0YsQ0FBQTtBQTNCWSxrREFBbUI7QUFJOUI7SUFEQyxJQUFBLFlBQUcsR0FBRTs7OztrREFHTDtBQUdEO0lBREMsSUFBQSxZQUFHLEVBQUMsS0FBSyxDQUFDO0lBQ0YsV0FBQSxJQUFBLGNBQUssRUFBQyxJQUFJLENBQUMsQ0FBQTs7OztrREFFbkI7QUFHRDtJQURDLElBQUEsYUFBSSxHQUFFO0lBQ0MsV0FBQSxJQUFBLGFBQUksR0FBRSxDQUFBOzs7O2lEQUViO0FBR0Q7SUFEQyxJQUFBLFlBQUcsRUFBQyxLQUFLLENBQUM7SUFDSCxXQUFBLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQWMsV0FBQSxJQUFBLGFBQUksR0FBRSxDQUFBOzs7O2lEQUV0QztBQUdEO0lBREMsSUFBQSxlQUFNLEVBQUMsS0FBSyxDQUFDO0lBQ04sV0FBQSxJQUFBLGNBQUssRUFBQyxJQUFJLENBQUMsQ0FBQTs7OztpREFFbEI7OEJBMUJVLG1CQUFtQjtJQUYvQixJQUFBLG1CQUFVLEVBQUMsV0FBVyxDQUFDO0lBQ3ZCLElBQUEsa0JBQVMsRUFBQyw2QkFBWSxDQUFDO3FDQUVnQixvQ0FBZ0I7R0FEM0MsbUJBQW1CLENBMkIvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgUG9zdCwgUHV0LCBEZWxldGUsIEJvZHksIFBhcmFtLCBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb21wYW5pZXNTZXJ2aWNlIH0gZnJvbSAnLi9jb21wYW5pZXMuc2VydmljZSc7XG5pbXBvcnQgeyBKd3RBdXRoR3VhcmQgfSBmcm9tICcuLi9hdXRoL2p3dC1hdXRoLmd1YXJkJztcblxuQENvbnRyb2xsZXIoJ2NvbXBhbmllcycpXG5AVXNlR3VhcmRzKEp3dEF1dGhHdWFyZClcbmV4cG9ydCBjbGFzcyBDb21wYW5pZXNDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wYW5pZXNTZXJ2aWNlOiBDb21wYW5pZXNTZXJ2aWNlKSB7fVxuXG4gIEBHZXQoKVxuICBmaW5kQWxsKCkge1xuICAgIHJldHVybiB0aGlzLmNvbXBhbmllc1NlcnZpY2UuZmluZEFsbCgpO1xuICB9XG5cbiAgQEdldCgnOmlkJylcbiAgZmluZE9uZShAUGFyYW0oJ2lkJykgaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNvbXBhbmllc1NlcnZpY2UuZmluZE9uZShpZCk7XG4gIH1cblxuICBAUG9zdCgpXG4gIGNyZWF0ZShAQm9keSgpIGJvZHk6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmNvbXBhbmllc1NlcnZpY2UuY3JlYXRlKGJvZHkpO1xuICB9XG5cbiAgQFB1dCgnOmlkJylcbiAgdXBkYXRlKEBQYXJhbSgnaWQnKSBpZDogc3RyaW5nLCBAQm9keSgpIGJvZHk6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmNvbXBhbmllc1NlcnZpY2UudXBkYXRlKGlkLCBib2R5KTtcbiAgfVxuXG4gIEBEZWxldGUoJzppZCcpXG4gIHJlbW92ZShAUGFyYW0oJ2lkJykgaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNvbXBhbmllc1NlcnZpY2UucmVtb3ZlKGlkKTtcbiAgfVxufVxuIl19