"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const tenant_middleware_1 = require("../../common/tenant.middleware");
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        providers: [tenant_middleware_1.TenantMiddleware],
        exports: [tenant_middleware_1.TenantMiddleware],
    })
], TenantModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL3RlbmFudC90ZW5hbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QyxzRUFBa0U7QUFNM0QsSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTtDQUFHLENBQUE7QUFBZixvQ0FBWTt1QkFBWixZQUFZO0lBSnhCLElBQUEsZUFBTSxFQUFDO1FBQ04sU0FBUyxFQUFFLENBQUMsb0NBQWdCLENBQUM7UUFDN0IsT0FBTyxFQUFFLENBQUMsb0NBQWdCLENBQUM7S0FDNUIsQ0FBQztHQUNXLFlBQVksQ0FBRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFRlbmFudE1pZGRsZXdhcmUgfSBmcm9tICcuLi8uLi9jb21tb24vdGVuYW50Lm1pZGRsZXdhcmUnO1xuXG5ATW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbVGVuYW50TWlkZGxld2FyZV0sXG4gIGV4cG9ydHM6IFtUZW5hbnRNaWRkbGV3YXJlXSxcbn0pXG5leHBvcnQgY2xhc3MgVGVuYW50TW9kdWxlIHt9XG4iXX0=