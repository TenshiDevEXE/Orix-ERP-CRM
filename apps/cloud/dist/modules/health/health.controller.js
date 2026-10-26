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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let HealthController = class HealthController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async check(req) {
        const tenantId = req.headers['x-tenant-id'];
        const tenantCount = await this.prisma.tenant.count();
        return {
            status: 'ok',
            tenantId,
            tenantCount,
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HealthController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhbHRoLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9oZWFsdGgvaGVhbHRoLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXNEO0FBRXRELGdFQUE0RDtBQUdyRCxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUNQO0lBQXBCLFlBQW9CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBRyxDQUFDO0lBR3ZDLEFBQU4sS0FBSyxDQUFDLEtBQUssQ0FBUSxHQUFZO1FBQzdCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFXLENBQUM7UUFDdEQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyRCxPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUk7WUFDWixRQUFRO1lBQ1IsV0FBVztTQUNaLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWJZLDRDQUFnQjtBQUlyQjtJQURMLElBQUEsWUFBRyxHQUFFO0lBQ08sV0FBQSxJQUFBLFlBQUcsR0FBRSxDQUFBOzs7OzZDQVFqQjsyQkFaVSxnQkFBZ0I7SUFENUIsSUFBQSxtQkFBVSxFQUFDLFFBQVEsQ0FBQztxQ0FFUyw4QkFBYTtHQUQ5QixnQkFBZ0IsQ0FhNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sbGVyLCBHZXQsIFJlcSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFByaXNtYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcmlzbWEvcHJpc21hLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcignaGVhbHRoJylcbmV4cG9ydCBjbGFzcyBIZWFsdGhDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmlzbWE6IFByaXNtYVNlcnZpY2UpIHt9XG5cbiAgQEdldCgpXG4gIGFzeW5jIGNoZWNrKEBSZXEoKSByZXE6IFJlcXVlc3QpIHtcbiAgICBjb25zdCB0ZW5hbnRJZCA9IHJlcS5oZWFkZXJzWyd4LXRlbmFudC1pZCddIGFzIHN0cmluZztcbiAgICBjb25zdCB0ZW5hbnRDb3VudCA9IGF3YWl0IHRoaXMucHJpc21hLnRlbmFudC5jb3VudCgpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6ICdvaycsXG4gICAgICB0ZW5hbnRJZCxcbiAgICAgIHRlbmFudENvdW50LFxuICAgIH07XG4gIH1cbn0iXX0=