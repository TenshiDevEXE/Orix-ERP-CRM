"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenantId = exports.TenantMiddleware = void 0;
const common_1 = require("@nestjs/common");
const async_hooks_1 = require("async_hooks");
const tenantStorage = new async_hooks_1.AsyncLocalStorage();
let TenantMiddleware = class TenantMiddleware {
    use(req, _res, next) {
        const tenantId = req.headers['x-tenant-id'];
        if (!tenantId) {
            throw new common_1.UnauthorizedException('Tenant ID is required');
        }
        tenantStorage.run({ tenantId }, () => {
            next();
        });
    }
};
exports.TenantMiddleware = TenantMiddleware;
exports.TenantMiddleware = TenantMiddleware = __decorate([
    (0, common_1.Injectable)()
], TenantMiddleware);
const getTenantId = () => {
    return tenantStorage.getStore()?.tenantId;
};
exports.getTenantId = getTenantId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3RlbmFudC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUFtRjtBQUVuRiw2Q0FBZ0Q7QUFNaEQsTUFBTSxhQUFhLEdBQUcsSUFBSSwrQkFBaUIsRUFBaUIsQ0FBQztBQUd0RCxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUMzQixHQUFHLENBQUMsR0FBWSxFQUFFLElBQWMsRUFBRSxJQUFrQjtRQUNsRCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBVyxDQUFDO1FBRXRELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNkLE1BQU0sSUFBSSw4QkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRCxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFO1lBQ25DLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQVpZLDRDQUFnQjsyQkFBaEIsZ0JBQWdCO0lBRDVCLElBQUEsbUJBQVUsR0FBRTtHQUNBLGdCQUFnQixDQVk1QjtBQUVNLE1BQU0sV0FBVyxHQUFHLEdBQXVCLEVBQUU7SUFDbEQsT0FBTyxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxDQUFDO0FBQzVDLENBQUMsQ0FBQztBQUZXLFFBQUEsV0FBVyxlQUV0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5lc3RNaWRkbGV3YXJlLCBVbmF1dGhvcml6ZWRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgTmV4dEZ1bmN0aW9uIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBBc3luY0xvY2FsU3RvcmFnZSB9IGZyb20gJ2FzeW5jX2hvb2tzJztcblxuaW50ZXJmYWNlIFRlbmFudENvbnRleHQge1xuICB0ZW5hbnRJZD86IHN0cmluZztcbn1cblxuY29uc3QgdGVuYW50U3RvcmFnZSA9IG5ldyBBc3luY0xvY2FsU3RvcmFnZTxUZW5hbnRDb250ZXh0PigpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGVuYW50TWlkZGxld2FyZSBpbXBsZW1lbnRzIE5lc3RNaWRkbGV3YXJlIHtcbiAgdXNlKHJlcTogUmVxdWVzdCwgX3JlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgIGNvbnN0IHRlbmFudElkID0gcmVxLmhlYWRlcnNbJ3gtdGVuYW50LWlkJ10gYXMgc3RyaW5nO1xuXG4gICAgaWYgKCF0ZW5hbnRJZCkge1xuICAgICAgdGhyb3cgbmV3IFVuYXV0aG9yaXplZEV4Y2VwdGlvbignVGVuYW50IElEIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgdGVuYW50U3RvcmFnZS5ydW4oeyB0ZW5hbnRJZCB9LCAoKSA9PiB7XG4gICAgICBuZXh0KCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldFRlbmFudElkID0gKCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIHJldHVybiB0ZW5hbnRTdG9yYWdlLmdldFN0b3JlKCk/LnRlbmFudElkO1xufTtcbiJdfQ==