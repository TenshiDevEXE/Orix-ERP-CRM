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
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CatalogService = class CatalogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findCategories() {
        return this.prisma.category.findMany();
    }
    async createCategory(data) {
        return this.prisma.category.create({ data });
    }
    async findProducts() {
        return this.prisma.product.findMany({
            include: { category: true, company: true },
        });
    }
    async createProduct(data) {
        return this.prisma.product.create({
            data,
            include: { category: true, company: true },
        });
    }
    async findTaxes() {
        return this.prisma.tax.findMany();
    }
    async createTax(data) {
        return this.prisma.tax.create({ data });
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CatalogService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvY2F0YWxvZy9jYXRhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLGdFQUE0RDtBQUdyRCxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFjO0lBQ0w7SUFBcEIsWUFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFHLENBQUM7SUFHN0MsS0FBSyxDQUFDLGNBQWM7UUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFTO1FBQzVCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBR0QsS0FBSyxDQUFDLFlBQVk7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDbEMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1NBQzNDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLElBQVM7UUFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDaEMsSUFBSTtZQUNKLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtTQUMzQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0QsS0FBSyxDQUFDLFNBQVM7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLElBQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDRixDQUFBO0FBbENZLHdDQUFjO3lCQUFkLGNBQWM7SUFEMUIsSUFBQSxtQkFBVSxHQUFFO3FDQUVpQiw4QkFBYTtHQUQ5QixjQUFjLENBa0MxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcmlzbWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJpc21hL3ByaXNtYS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhdGFsb2dTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmlzbWE6IFByaXNtYVNlcnZpY2UpIHt9XG5cbiAgLy8gQ2F0ZWdvcsOtYXNcbiAgYXN5bmMgZmluZENhdGVnb3JpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpc21hLmNhdGVnb3J5LmZpbmRNYW55KCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVDYXRlZ29yeShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEuY2F0ZWdvcnkuY3JlYXRlKHsgZGF0YSB9KTtcbiAgfVxuXG4gIC8vIFByb2R1Y3Rvc1xuICBhc3luYyBmaW5kUHJvZHVjdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpc21hLnByb2R1Y3QuZmluZE1hbnkoe1xuICAgICAgaW5jbHVkZTogeyBjYXRlZ29yeTogdHJ1ZSwgY29tcGFueTogdHJ1ZSB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlUHJvZHVjdChkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEucHJvZHVjdC5jcmVhdGUoe1xuICAgICAgZGF0YSxcbiAgICAgIGluY2x1ZGU6IHsgY2F0ZWdvcnk6IHRydWUsIGNvbXBhbnk6IHRydWUgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEltcHVlc3Rvc1xuICBhc3luYyBmaW5kVGF4ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpc21hLnRheC5maW5kTWFueSgpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlVGF4KGRhdGE6IGFueSkge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS50YXguY3JlYXRlKHsgZGF0YSB9KTtcbiAgfVxufVxuIl19