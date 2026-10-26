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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let InventoryService = class InventoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findMovements() {
        return this.prisma.inventoryMovement.findMany({
            include: { product: true, company: true },
        });
    }
    async createMovement(data) {
        const movement = await this.prisma.inventoryMovement.create({
            data: {
                ...data,
                movementType: data.type,
                unitCost: 0,
                totalCost: 0,
                createdBy: 'system',
            },
            include: { product: true },
        });
        const sign = data.type === 'out' ? -1 : 1;
        const existingBalance = await this.prisma.inventoryBalance.findFirst({
            where: { productId: data.productId },
        });
        if (existingBalance) {
            await this.prisma.inventoryBalance.update({
                where: { id: existingBalance.id },
                data: { quantityOnHand: { increment: sign * data.quantity } },
            });
        }
        else {
            await this.prisma.inventoryBalance.create({
                data: {
                    productId: data.productId,
                    companyId: data.companyId,
                    quantityOnHand: sign * data.quantity,
                    totalCost: 0,
                },
            });
        }
        return movement;
    }
    async findBalances() {
        return this.prisma.inventoryBalance.findMany();
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9pbnZlbnRvcnkvaW52ZW50b3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLGdFQUE0RDtBQUdyRCxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUNQO0lBQXBCLFlBQW9CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBRyxDQUFDO0lBRTdDLEtBQUssQ0FBQyxhQUFhO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUM7WUFDNUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1NBQzFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLElBQVM7UUFFNUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLEVBQUU7Z0JBQ0osR0FBRyxJQUFJO2dCQUNQLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDdkIsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsU0FBUyxFQUFFLENBQUM7Z0JBQ1osU0FBUyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1NBQzNCLENBQUMsQ0FBQztRQUdILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sZUFBZSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDbkUsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7U0FDckMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUNwQixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsZUFBZSxDQUFDLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7YUFDOUQsQ0FBQyxDQUFDO1FBQ0wsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxJQUFJLEVBQUU7b0JBQ0osU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO29CQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3pCLGNBQWMsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVE7b0JBQ3BDLFNBQVMsRUFBRSxDQUFDO2lCQUNiO2FBQ0ssQ0FBQyxDQUFDO1FBQ1osQ0FBQztRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakQsQ0FBQztDQUNGLENBQUE7QUFsRFksNENBQWdCOzJCQUFoQixnQkFBZ0I7SUFENUIsSUFBQSxtQkFBVSxHQUFFO3FDQUVpQiw4QkFBYTtHQUQ5QixnQkFBZ0IsQ0FrRDVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFByaXNtYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcmlzbWEvcHJpc21hLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW52ZW50b3J5U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJpc21hOiBQcmlzbWFTZXJ2aWNlKSB7fVxuXG4gIGFzeW5jIGZpbmRNb3ZlbWVudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpc21hLmludmVudG9yeU1vdmVtZW50LmZpbmRNYW55KHtcbiAgICAgIGluY2x1ZGU6IHsgcHJvZHVjdDogdHJ1ZSwgY29tcGFueTogdHJ1ZSB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlTW92ZW1lbnQoZGF0YTogYW55KSB7XG4gICAgLy8gQ3JlYXIgbW92aW1pZW50byBpbm11dGFibGVcbiAgICBjb25zdCBtb3ZlbWVudCA9IGF3YWl0IHRoaXMucHJpc21hLmludmVudG9yeU1vdmVtZW50LmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIG1vdmVtZW50VHlwZTogZGF0YS50eXBlLFxuICAgICAgICB1bml0Q29zdDogMCxcbiAgICAgICAgdG90YWxDb3N0OiAwLFxuICAgICAgICBjcmVhdGVkQnk6ICdzeXN0ZW0nLFxuICAgICAgfSxcbiAgICAgIGluY2x1ZGU6IHsgcHJvZHVjdDogdHJ1ZSB9LFxuICAgIH0pO1xuXG4gICAgLy8gQWN0dWFsaXphciBzYWxkbyAoZGVyaXZhdGl2ZSBjYWxjdWxhdGlvbilcbiAgICBjb25zdCBzaWduID0gZGF0YS50eXBlID09PSAnb3V0JyA/IC0xIDogMTtcbiAgICBjb25zdCBleGlzdGluZ0JhbGFuY2UgPSBhd2FpdCB0aGlzLnByaXNtYS5pbnZlbnRvcnlCYWxhbmNlLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZTogeyBwcm9kdWN0SWQ6IGRhdGEucHJvZHVjdElkIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoZXhpc3RpbmdCYWxhbmNlKSB7XG4gICAgICBhd2FpdCB0aGlzLnByaXNtYS5pbnZlbnRvcnlCYWxhbmNlLnVwZGF0ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZ0JhbGFuY2UuaWQgfSxcbiAgICAgICAgZGF0YTogeyBxdWFudGl0eU9uSGFuZDogeyBpbmNyZW1lbnQ6IHNpZ24gKiBkYXRhLnF1YW50aXR5IH0gfSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB0aGlzLnByaXNtYS5pbnZlbnRvcnlCYWxhbmNlLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBwcm9kdWN0SWQ6IGRhdGEucHJvZHVjdElkLFxuICAgICAgICAgIGNvbXBhbnlJZDogZGF0YS5jb21wYW55SWQsXG4gICAgICAgICAgcXVhbnRpdHlPbkhhbmQ6IHNpZ24gKiBkYXRhLnF1YW50aXR5LFxuICAgICAgICAgIHRvdGFsQ29zdDogMCxcbiAgICAgICAgfSxcbiAgICAgIH0gYXMgYW55KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW92ZW1lbnQ7XG4gIH1cblxuICBhc3luYyBmaW5kQmFsYW5jZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpc21hLmludmVudG9yeUJhbGFuY2UuZmluZE1hbnkoKTtcbiAgfVxufVxuIl19