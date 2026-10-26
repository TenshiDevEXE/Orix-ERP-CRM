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
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TenantsService = class TenantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.tenant.findMany({
            include: { companies: true },
        });
    }
    async findOne(id) {
        return this.prisma.tenant.findUnique({
            where: { id },
            include: { companies: true },
        });
    }
    async create(data) {
        return this.prisma.tenant.create({
            data,
            include: { companies: true },
        });
    }
    async update(id, data) {
        return this.prisma.tenant.update({
            where: { id },
            data,
            include: { companies: true },
        });
    }
    async remove(id) {
        return this.prisma.tenant.delete({
            where: { id },
        });
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenantsService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvdGVuYW50cy90ZW5hbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLGdFQUE0RDtBQUdyRCxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFjO0lBQ0w7SUFBcEIsWUFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFHLENBQUM7SUFFN0MsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNqQyxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQVU7UUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDbkMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtTQUM3QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFTO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQy9CLElBQUk7WUFDSixPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVUsRUFBRSxJQUFzRDtRQUM3RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUMvQixLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDYixJQUFJO1lBQ0osT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtTQUM3QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFVO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQy9CLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBcENZLHdDQUFjO3lCQUFkLGNBQWM7SUFEMUIsSUFBQSxtQkFBVSxHQUFFO3FDQUVpQiw4QkFBYTtHQUQ5QixjQUFjLENBb0MxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcmlzbWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJpc21hL3ByaXNtYS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlbmFudHNTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmlzbWE6IFByaXNtYVNlcnZpY2UpIHt9XG5cbiAgYXN5bmMgZmluZEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEudGVuYW50LmZpbmRNYW55KHtcbiAgICAgIGluY2x1ZGU6IHsgY29tcGFuaWVzOiB0cnVlIH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEudGVuYW50LmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgIGluY2x1ZGU6IHsgY29tcGFuaWVzOiB0cnVlIH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMucHJpc21hLnRlbmFudC5jcmVhdGUoe1xuICAgICAgZGF0YSxcbiAgICAgIGluY2x1ZGU6IHsgY29tcGFuaWVzOiB0cnVlIH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGUoaWQ6IHN0cmluZywgZGF0YTogeyBuYW1lPzogc3RyaW5nOyBybmM/OiBzdHJpbmc7IHN0YXR1cz86IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMucHJpc21hLnRlbmFudC51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgIGRhdGEsXG4gICAgICBpbmNsdWRlOiB7IGNvbXBhbmllczogdHJ1ZSB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEudGVuYW50LmRlbGV0ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=