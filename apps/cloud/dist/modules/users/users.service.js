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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.user.findMany({
            include: { company: true, userRoles: { include: { role: true } } },
        });
    }
    async findOne(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { company: true, userRoles: { include: { role: true } } },
        });
    }
    async update(id, data) {
        return this.prisma.user.update({
            where: { id },
            data,
            include: { company: true },
        });
    }
    async assignRole(userId, roleId) {
        return this.prisma.userRole.create({
            data: {
                userId,
                roleId,
            },
            include: { role: true, user: true },
        });
    }
    async removeRole(userId, roleId) {
        return this.prisma.userRole.deleteMany({
            where: {
                userId,
                roleId,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXJzL3VzZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLGdFQUE0RDtBQUdyRCxJQUFNLFlBQVksR0FBbEIsTUFBTSxZQUFZO0lBQ0g7SUFBcEIsWUFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFHLENBQUM7SUFFN0MsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1NBQ25FLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQVU7UUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDakMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtTQUNuRSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFVLEVBQUUsSUFJeEI7UUFDQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDYixJQUFJO1lBQ0osT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtTQUMzQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBYztRQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNqQyxJQUFJLEVBQUU7Z0JBQ0osTUFBTTtnQkFDTixNQUFNO2FBQ1A7WUFDRCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7U0FDcEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBYyxFQUFFLE1BQWM7UUFDN0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDckMsS0FBSyxFQUFFO2dCQUNMLE1BQU07Z0JBQ04sTUFBTTthQUNQO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUE5Q1ksb0NBQVk7dUJBQVosWUFBWTtJQUR4QixJQUFBLG1CQUFVLEdBQUU7cUNBRWlCLDhCQUFhO0dBRDlCLFlBQVksQ0E4Q3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFByaXNtYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcmlzbWEvcHJpc21hLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlcnNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmlzbWE6IFByaXNtYVNlcnZpY2UpIHt9XG5cbiAgYXN5bmMgZmluZEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEudXNlci5maW5kTWFueSh7XG4gICAgICBpbmNsdWRlOiB7IGNvbXBhbnk6IHRydWUsIHVzZXJSb2xlczogeyBpbmNsdWRlOiB7IHJvbGU6IHRydWUgfSB9IH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgICBpbmNsdWRlOiB7IGNvbXBhbnk6IHRydWUsIHVzZXJSb2xlczogeyBpbmNsdWRlOiB7IHJvbGU6IHRydWUgfSB9IH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGUoaWQ6IHN0cmluZywgZGF0YToge1xuICAgIGZpcnN0TmFtZT86IHN0cmluZztcbiAgICBsYXN0TmFtZT86IHN0cmluZztcbiAgICBlbWFpbD86IHN0cmluZztcbiAgfSkge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS51c2VyLnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgZGF0YSxcbiAgICAgIGluY2x1ZGU6IHsgY29tcGFueTogdHJ1ZSB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgYXNzaWduUm9sZSh1c2VySWQ6IHN0cmluZywgcm9sZUlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEudXNlclJvbGUuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICByb2xlSWQsXG4gICAgICB9LFxuICAgICAgaW5jbHVkZTogeyByb2xlOiB0cnVlLCB1c2VyOiB0cnVlIH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyByZW1vdmVSb2xlKHVzZXJJZDogc3RyaW5nLCByb2xlSWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS51c2VyUm9sZS5kZWxldGVNYW55KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgcm9sZUlkLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19