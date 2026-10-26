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
exports.CatalogController = void 0;
const common_1 = require("@nestjs/common");
const catalog_service_1 = require("./catalog.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CatalogController = class CatalogController {
    catalogService;
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    findCategories() {
        return this.catalogService.findCategories();
    }
    createCategory(body) {
        return this.catalogService.createCategory(body);
    }
    findProducts() {
        return this.catalogService.findProducts();
    }
    createProduct(body) {
        return this.catalogService.createProduct(body);
    }
    findTaxes() {
        return this.catalogService.findTaxes();
    }
    createTax(body) {
        return this.catalogService.createTax(body);
    }
};
exports.CatalogController = CatalogController;
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "findCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "findProducts", null);
__decorate([
    (0, common_1.Post)('products'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('taxes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "findTaxes", null);
__decorate([
    (0, common_1.Post)('taxes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "createTax", null);
exports.CatalogController = CatalogController = __decorate([
    (0, common_1.Controller)('catalog'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [catalog_service_1.CatalogService])
], CatalogController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvY2F0YWxvZy9jYXRhbG9nLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXdFO0FBQ3hFLHVEQUFtRDtBQUNuRCwyREFBc0Q7QUFJL0MsSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBaUI7SUFDUjtJQUFwQixZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBRyxDQUFDO0lBR3RELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUdELGNBQWMsQ0FBUyxJQUFTO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUdELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUdELGFBQWEsQ0FBUyxJQUFTO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUdELFNBQVMsQ0FBUyxJQUFTO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGLENBQUE7QUFoQ1ksOENBQWlCO0FBSTVCO0lBREMsSUFBQSxZQUFHLEVBQUMsWUFBWSxDQUFDOzs7O3VEQUdqQjtBQUdEO0lBREMsSUFBQSxhQUFJLEVBQUMsWUFBWSxDQUFDO0lBQ0gsV0FBQSxJQUFBLGFBQUksR0FBRSxDQUFBOzs7O3VEQUVyQjtBQUdEO0lBREMsSUFBQSxZQUFHLEVBQUMsVUFBVSxDQUFDOzs7O3FEQUdmO0FBR0Q7SUFEQyxJQUFBLGFBQUksRUFBQyxVQUFVLENBQUM7SUFDRixXQUFBLElBQUEsYUFBSSxHQUFFLENBQUE7Ozs7c0RBRXBCO0FBR0Q7SUFEQyxJQUFBLFlBQUcsRUFBQyxPQUFPLENBQUM7Ozs7a0RBR1o7QUFHRDtJQURDLElBQUEsYUFBSSxFQUFDLE9BQU8sQ0FBQztJQUNILFdBQUEsSUFBQSxhQUFJLEdBQUUsQ0FBQTs7OztrREFFaEI7NEJBL0JVLGlCQUFpQjtJQUY3QixJQUFBLG1CQUFVLEVBQUMsU0FBUyxDQUFDO0lBQ3JCLElBQUEsa0JBQVMsRUFBQyw2QkFBWSxDQUFDO3FDQUVjLGdDQUFjO0dBRHZDLGlCQUFpQixDQWdDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sbGVyLCBHZXQsIFBvc3QsIEJvZHksIFVzZUd1YXJkcyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENhdGFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jYXRhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgSnd0QXV0aEd1YXJkIH0gZnJvbSAnLi4vYXV0aC9qd3QtYXV0aC5ndWFyZCc7XG5cbkBDb250cm9sbGVyKCdjYXRhbG9nJylcbkBVc2VHdWFyZHMoSnd0QXV0aEd1YXJkKVxuZXhwb3J0IGNsYXNzIENhdGFsb2dDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXRhbG9nU2VydmljZTogQ2F0YWxvZ1NlcnZpY2UpIHt9XG5cbiAgQEdldCgnY2F0ZWdvcmllcycpXG4gIGZpbmRDYXRlZ29yaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmNhdGFsb2dTZXJ2aWNlLmZpbmRDYXRlZ29yaWVzKCk7XG4gIH1cblxuICBAUG9zdCgnY2F0ZWdvcmllcycpXG4gIGNyZWF0ZUNhdGVnb3J5KEBCb2R5KCkgYm9keTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuY2F0YWxvZ1NlcnZpY2UuY3JlYXRlQ2F0ZWdvcnkoYm9keSk7XG4gIH1cblxuICBAR2V0KCdwcm9kdWN0cycpXG4gIGZpbmRQcm9kdWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5jYXRhbG9nU2VydmljZS5maW5kUHJvZHVjdHMoKTtcbiAgfVxuXG4gIEBQb3N0KCdwcm9kdWN0cycpXG4gIGNyZWF0ZVByb2R1Y3QoQEJvZHkoKSBib2R5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5jYXRhbG9nU2VydmljZS5jcmVhdGVQcm9kdWN0KGJvZHkpO1xuICB9XG5cbiAgQEdldCgndGF4ZXMnKVxuICBmaW5kVGF4ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2F0YWxvZ1NlcnZpY2UuZmluZFRheGVzKCk7XG4gIH1cblxuICBAUG9zdCgndGF4ZXMnKVxuICBjcmVhdGVUYXgoQEJvZHkoKSBib2R5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5jYXRhbG9nU2VydmljZS5jcmVhdGVUYXgoYm9keSk7XG4gIH1cbn1cbiJdfQ==