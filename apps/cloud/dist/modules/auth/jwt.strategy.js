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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    prisma;
    constructor(prisma) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'default-secret-change-in-production',
        });
        this.prisma = prisma;
    }
    async validate(payload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            include: { company: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return {
            id: user.id,
            email: user.email,
            companyId: user.companyId,
            tenantId: user.tenantId,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JwtStrategy);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvYXV0aC9qd3Quc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW1FO0FBQ25FLCtDQUFvRDtBQUNwRCwrQ0FBb0Q7QUFDcEQsZ0VBQTREO0FBR3JELElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVksU0FBUSxJQUFBLDJCQUFnQixFQUFDLHVCQUFRLENBQUM7SUFDckM7SUFBcEIsWUFBb0IsTUFBcUI7UUFDdkMsS0FBSyxDQUFDO1lBQ0osY0FBYyxFQUFFLHlCQUFVLENBQUMsMkJBQTJCLEVBQUU7WUFDeEQsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUkscUNBQXFDO1NBQzdFLENBQUMsQ0FBQztRQUxlLFdBQU0sR0FBTixNQUFNLENBQWU7SUFNekMsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBWTtRQUN6QixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUM3QyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUMxQixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1NBQzNCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNWLE1BQU0sSUFBSSw4QkFBcUIsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFFRCxPQUFPO1lBQ0wsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBMUJZLGtDQUFXO3NCQUFYLFdBQVc7SUFEdkIsSUFBQSxtQkFBVSxHQUFFO3FDQUVpQiw4QkFBYTtHQUQ5QixXQUFXLENBMEJ2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFVuYXV0aG9yaXplZEV4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFBhc3Nwb3J0U3RyYXRlZ3kgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcbmltcG9ydCB7IEV4dHJhY3RKd3QsIFN0cmF0ZWd5IH0gZnJvbSAncGFzc3BvcnQtand0JztcbmltcG9ydCB7IFByaXNtYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcmlzbWEvcHJpc21hLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0U3RyYXRlZ3kgZXh0ZW5kcyBQYXNzcG9ydFN0cmF0ZWd5KFN0cmF0ZWd5KSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJpc21hOiBQcmlzbWFTZXJ2aWNlKSB7XG4gICAgc3VwZXIoe1xuICAgICAgand0RnJvbVJlcXVlc3Q6IEV4dHJhY3RKd3QuZnJvbUF1dGhIZWFkZXJBc0JlYXJlclRva2VuKCksXG4gICAgICBpZ25vcmVFeHBpcmF0aW9uOiBmYWxzZSxcbiAgICAgIHNlY3JldE9yS2V5OiBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8ICdkZWZhdWx0LXNlY3JldC1jaGFuZ2UtaW4tcHJvZHVjdGlvbicsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyB2YWxpZGF0ZShwYXlsb2FkOiBhbnkpIHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5wcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBwYXlsb2FkLnN1YiB9LFxuICAgICAgaW5jbHVkZTogeyBjb21wYW55OiB0cnVlIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgIGNvbXBhbnlJZDogdXNlci5jb21wYW55SWQsXG4gICAgICB0ZW5hbnRJZDogdXNlci50ZW5hbnRJZCxcbiAgICB9O1xuICB9XG59XG4iXX0=