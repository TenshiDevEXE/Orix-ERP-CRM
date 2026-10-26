"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const local_strategy_1 = require("./local.strategy");
const jwt_strategy_1 = require("./jwt.strategy");
const prisma_module_1 = require("../../prisma/prisma.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
                signOptions: { expiresIn: '24h' },
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9hdXRoL2F1dGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QyxxQ0FBd0M7QUFDeEMsK0NBQWtEO0FBQ2xELGlEQUE2QztBQUM3Qyx1REFBbUQ7QUFDbkQscURBQWlEO0FBQ2pELGlEQUE2QztBQUM3Qyw4REFBMEQ7QUFlbkQsSUFBTSxVQUFVLEdBQWhCLE1BQU0sVUFBVTtDQUFHLENBQUE7QUFBYixnQ0FBVTtxQkFBVixVQUFVO0lBYnRCLElBQUEsZUFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ1AsNEJBQVk7WUFDWix5QkFBYztZQUNkLGVBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pCLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxxQ0FBcUM7Z0JBQ3ZFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUU7YUFDbEMsQ0FBQztTQUNIO1FBQ0QsU0FBUyxFQUFFLENBQUMsMEJBQVcsRUFBRSw4QkFBYSxFQUFFLDBCQUFXLENBQUM7UUFDcEQsV0FBVyxFQUFFLENBQUMsZ0NBQWMsQ0FBQztRQUM3QixPQUFPLEVBQUUsQ0FBQywwQkFBVyxDQUFDO0tBQ3ZCLENBQUM7R0FDVyxVQUFVLENBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBKd3RNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2p3dCc7XG5pbXBvcnQgeyBQYXNzcG9ydE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoQ29udHJvbGxlciB9IGZyb20gJy4vYXV0aC5jb250cm9sbGVyJztcbmltcG9ydCB7IExvY2FsU3RyYXRlZ3kgfSBmcm9tICcuL2xvY2FsLnN0cmF0ZWd5JztcbmltcG9ydCB7IEp3dFN0cmF0ZWd5IH0gZnJvbSAnLi9qd3Quc3RyYXRlZ3knO1xuaW1wb3J0IHsgUHJpc21hTW9kdWxlIH0gZnJvbSAnLi4vLi4vcHJpc21hL3ByaXNtYS5tb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFByaXNtYU1vZHVsZSxcbiAgICBQYXNzcG9ydE1vZHVsZSxcbiAgICBKd3RNb2R1bGUucmVnaXN0ZXIoe1xuICAgICAgc2VjcmV0OiBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8ICdkZWZhdWx0LXNlY3JldC1jaGFuZ2UtaW4tcHJvZHVjdGlvbicsXG4gICAgICBzaWduT3B0aW9uczogeyBleHBpcmVzSW46ICcyNGgnIH0sXG4gICAgfSksXG4gIF0sXG4gIHByb3ZpZGVyczogW0F1dGhTZXJ2aWNlLCBMb2NhbFN0cmF0ZWd5LCBKd3RTdHJhdGVneV0sXG4gIGNvbnRyb2xsZXJzOiBbQXV0aENvbnRyb2xsZXJdLFxuICBleHBvcnRzOiBbQXV0aFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRoTW9kdWxlIHt9XG4iXX0=