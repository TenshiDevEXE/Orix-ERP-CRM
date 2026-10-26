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
exports.AccountingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const shared_core_1 = require("@erp/shared-core");
let AccountingService = class AccountingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAccounts() {
        return this.prisma.account.findMany();
    }
    async createAccount(data) {
        return this.prisma.account.create({ data });
    }
    async findJournalEntries() {
        return this.prisma.journalEntry.findMany({
            include: { lines: true, company: true },
        });
    }
    async createJournalEntry(data) {
        const validation = (0, shared_core_1.validateDoubleEntry)(data.lines);
        if (!validation.valid) {
            throw new Error(validation.error);
        }
        const entry = await this.prisma.journalEntry.create({
            data: {
                companyId: data.companyId,
                date: data.date,
                description: data.description,
                status: 'posted',
                lines: {
                    create: data.lines.map((line, index) => ({
                        accountId: line.accountId,
                        lineNumber: index + 1,
                        debit: line.debit,
                        credit: line.credit,
                    })),
                },
            },
            include: { lines: true },
        });
        return entry;
    }
    async findPeriods() {
        return this.prisma.accountingPeriod.findMany();
    }
    async createPeriod(data) {
        return this.prisma.accountingPeriod.create({ data });
    }
    async closePeriod(id) {
        return this.prisma.accountingPeriod.update({
            where: { id },
            data: { status: 'closed' },
        });
    }
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountingService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZXMvYWNjb3VudGluZy9hY2NvdW50aW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLGdFQUE0RDtBQUM1RCxrREFBdUQ7QUFHaEQsSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBaUI7SUFDUjtJQUFwQixZQUFvQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO0lBQUcsQ0FBQztJQUU3QyxLQUFLLENBQUMsWUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLElBQVM7UUFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxLQUFLLENBQUMsa0JBQWtCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ3ZDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtTQUN4QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQVM7UUFFaEMsTUFBTSxVQUFVLEdBQUcsSUFBQSxpQ0FBbUIsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBR0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDbEQsSUFBSSxFQUFFO2dCQUNKLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDN0IsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsS0FBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNwRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7d0JBQ3pCLFVBQVUsRUFBRSxLQUFLLEdBQUcsQ0FBQzt3QkFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07cUJBQ3BCLENBQUMsQ0FBQztpQkFDSjthQUNGO1lBQ0QsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtTQUNsQixDQUFDLENBQUM7UUFFVixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVztRQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFTO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQVU7UUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztZQUN6QyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBNURZLDhDQUFpQjs0QkFBakIsaUJBQWlCO0lBRDdCLElBQUEsbUJBQVUsR0FBRTtxQ0FFaUIsOEJBQWE7R0FEOUIsaUJBQWlCLENBNEQ3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcmlzbWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJpc21hL3ByaXNtYS5zZXJ2aWNlJztcbmltcG9ydCB7IHZhbGlkYXRlRG91YmxlRW50cnkgfSBmcm9tICdAZXJwL3NoYXJlZC1jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjY291bnRpbmdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmlzbWE6IFByaXNtYVNlcnZpY2UpIHt9XG5cbiAgYXN5bmMgZmluZEFjY291bnRzKCkge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS5hY2NvdW50LmZpbmRNYW55KCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVBY2NvdW50KGRhdGE6IGFueSkge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS5hY2NvdW50LmNyZWF0ZSh7IGRhdGEgfSk7XG4gIH1cblxuICBhc3luYyBmaW5kSm91cm5hbEVudHJpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpc21hLmpvdXJuYWxFbnRyeS5maW5kTWFueSh7XG4gICAgICBpbmNsdWRlOiB7IGxpbmVzOiB0cnVlLCBjb21wYW55OiB0cnVlIH0sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVKb3VybmFsRW50cnkoZGF0YTogYW55KSB7XG4gICAgLy8gVmFsaWRhciB1c2FuZG8gc2hhcmVkLWNvcmVcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdmFsaWRhdGVEb3VibGVFbnRyeShkYXRhLmxpbmVzKTtcbiAgICBpZiAoIXZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcih2YWxpZGF0aW9uLmVycm9yKTtcbiAgICB9XG5cbiAgICAvLyBDcmVhciBhc2llbnRvIHVzYW5kbyB1bmNoZWNrZWQgaW5wdXRcbiAgICBjb25zdCBlbnRyeSA9IGF3YWl0IHRoaXMucHJpc21hLmpvdXJuYWxFbnRyeS5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBjb21wYW55SWQ6IGRhdGEuY29tcGFueUlkLFxuICAgICAgICBkYXRlOiBkYXRhLmRhdGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICBzdGF0dXM6ICdwb3N0ZWQnLFxuICAgICAgICBsaW5lczoge1xuICAgICAgICAgIGNyZWF0ZTogZGF0YS5saW5lcy5tYXAoKGxpbmU6IGFueSwgaW5kZXg6IG51bWJlcikgPT4gKHtcbiAgICAgICAgICAgIGFjY291bnRJZDogbGluZS5hY2NvdW50SWQsXG4gICAgICAgICAgICBsaW5lTnVtYmVyOiBpbmRleCArIDEsXG4gICAgICAgICAgICBkZWJpdDogbGluZS5kZWJpdCxcbiAgICAgICAgICAgIGNyZWRpdDogbGluZS5jcmVkaXQsXG4gICAgICAgICAgfSkpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGluY2x1ZGU6IHsgbGluZXM6IHRydWUgfSxcbiAgICB9IGFzIGFueSk7XG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBhc3luYyBmaW5kUGVyaW9kcygpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEuYWNjb3VudGluZ1BlcmlvZC5maW5kTWFueSgpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlUGVyaW9kKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS5hY2NvdW50aW5nUGVyaW9kLmNyZWF0ZSh7IGRhdGEgfSk7XG4gIH1cblxuICBhc3luYyBjbG9zZVBlcmlvZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpc21hLmFjY291bnRpbmdQZXJpb2QudXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgICBkYXRhOiB7IHN0YXR1czogJ2Nsb3NlZCcgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19