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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CompaniesService = class CompaniesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.company.findMany({
            include: { tenant: true },
        });
    }
    async findOne(id) {
        return this.prisma.company.findUnique({
            where: { id },
            include: { tenant: true },
        });
    }
    async create(data) {
        return this.prisma.company.create({
            data,
            include: { tenant: true },
        });
    }
    async update(id, data) {
        return this.prisma.company.update({
            where: { id },
            data,
            include: { tenant: true },
        });
    }
    async remove(id) {
        return this.prisma.company.delete({
            where: { id },
        });
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompaniesService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFuaWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9jb21wYW5pZXMvY29tcGFuaWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLGdFQUE0RDtBQUdyRCxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUNQO0lBQXBCLFlBQW9CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBRyxDQUFDO0lBRTdDLEtBQUssQ0FBQyxPQUFPO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDbEMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFVO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1lBQ3BDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNiLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBUztRQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNoQyxJQUFJO1lBQ0osT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFVLEVBQUUsSUFBUztRQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNoQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDYixJQUFJO1lBQ0osT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFVO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2hDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBcENZLDRDQUFnQjsyQkFBaEIsZ0JBQWdCO0lBRDVCLElBQUEsbUJBQVUsR0FBRTtxQ0FFaUIsOEJBQWE7R0FEOUIsZ0JBQWdCLENBb0M1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcmlzbWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJpc21hL3ByaXNtYS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbXBhbmllc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByaXNtYTogUHJpc21hU2VydmljZSkge31cblxuICBhc3luYyBmaW5kQWxsKCkge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS5jb21wYW55LmZpbmRNYW55KHtcbiAgICAgIGluY2x1ZGU6IHsgdGVuYW50OiB0cnVlIH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEuY29tcGFueS5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgICBpbmNsdWRlOiB7IHRlbmFudDogdHJ1ZSB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS5jb21wYW55LmNyZWF0ZSh7XG4gICAgICBkYXRhLFxuICAgICAgaW5jbHVkZTogeyB0ZW5hbnQ6IHRydWUgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEuY29tcGFueS51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgIGRhdGEsXG4gICAgICBpbmNsdWRlOiB7IHRlbmFudDogdHJ1ZSB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEuY29tcGFueS5kZWxldGUoe1xuICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19