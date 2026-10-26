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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RolesService = class RolesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.role.findMany();
    }
    async findOne(id) {
        return this.prisma.role.findUnique({
            where: { id },
            include: { userRoles: { include: { user: true } } },
        });
    }
    async create(data) {
        return this.prisma.role.create({
            data,
        });
    }
    async update(id, data) {
        return this.prisma.role.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.role.delete({
            where: { id },
        });
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL3JvbGVzL3JvbGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLGdFQUE0RDtBQUdyRCxJQUFNLFlBQVksR0FBbEIsTUFBTSxZQUFZO0lBQ0g7SUFBcEIsWUFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFHLENBQUM7SUFFN0MsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQVU7UUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDakMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7U0FDcEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBOEQ7UUFDekUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBSTtTQUNMLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVUsRUFBRSxJQUE2QztRQUNwRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDYixJQUFJO1NBQ0wsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBVTtRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7U0FDZCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQWhDWSxvQ0FBWTt1QkFBWixZQUFZO0lBRHhCLElBQUEsbUJBQVUsR0FBRTtxQ0FFaUIsOEJBQWE7R0FEOUIsWUFBWSxDQWdDeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUHJpc21hU2VydmljZSB9IGZyb20gJy4uLy4uL3ByaXNtYS9wcmlzbWEuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb2xlc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByaXNtYTogUHJpc21hU2VydmljZSkge31cblxuICBhc3luYyBmaW5kQWxsKCkge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS5yb2xlLmZpbmRNYW55KCk7XG4gIH1cblxuICBhc3luYyBmaW5kT25lKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEucm9sZS5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgICBpbmNsdWRlOiB7IHVzZXJSb2xlczogeyBpbmNsdWRlOiB7IHVzZXI6IHRydWUgfSB9IH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZGF0YTogeyBuYW1lOiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nOyB0ZW5hbnRJZDogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEucm9sZS5jcmVhdGUoe1xuICAgICAgZGF0YSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiB7IG5hbWU/OiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEucm9sZS51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyByZW1vdmUoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS5yb2xlLmRlbGV0ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=