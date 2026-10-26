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
exports.InvoicingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const shared_core_1 = require("@erp/shared-core");
let InvoicingService = class InvoicingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findInvoices() {
        return this.prisma.invoice.findMany({
            include: { company: true, lines: true },
        });
    }
    async createInvoice(data) {
        const company = await this.prisma.company.findUnique({
            where: { id: data.companyId },
            include: { ncfSequences: true },
        });
        if (!company) {
            throw new Error('Company not found');
        }
        const itbisCalcs = data.lines.map((line) => (0, shared_core_1.calculateITBIS)(line.quantity * line.price, line.taxRate, false));
        const subtotal = itbisCalcs.reduce((sum, calc) => sum + calc.subtotal, 0);
        const taxTotal = itbisCalcs.reduce((sum, calc) => sum + calc.itbisAmount, 0);
        const total = itbisCalcs.reduce((sum, calc) => sum + calc.total, 0);
        const ncfSequence = company.ncfSequences[0];
        const ncf = `${ncfSequence.prefix}-${String(Number(ncfSequence.currentSequence)).padStart(8, '0')}`;
        const invoice = await this.prisma.invoice.create({
            data: {
                companyId: data.companyId,
                customerId: data.customerId,
                ncf,
                subtotal,
                itbisAmount: taxTotal,
                total,
                status: 'pending',
                invoiceDate: new Date(),
                ncfType: '01',
                invoiceNumber: `INV-${Date.now()}`,
                idempotencyKey: `${Date.now()}-${data.companyId}`,
                createdBy: 'system',
                lines: {
                    create: data.lines.map((line, index) => ({
                        productId: line.productId,
                        lineNumber: index + 1,
                        description: `Line ${index + 1}`,
                        quantity: line.quantity,
                        unitPrice: line.price,
                        itbisRate: line.taxRate,
                        taxAmount: line.quantity * line.price * line.taxRate,
                        lineTotal: line.quantity * line.price * (1 + line.taxRate),
                    })),
                },
            },
            include: { lines: true, company: true },
        });
        await this.prisma.ncfSequence.update({
            where: { id: ncfSequence.id },
            data: { currentSequence: Number(ncfSequence.currentSequence) + 1 },
        });
        return invoice;
    }
    async updateInvoiceStatus(id, status) {
        return this.prisma.invoice.update({
            where: { id },
            data: { status },
            include: { lines: true },
        });
    }
};
exports.InvoicingService = InvoicingService;
exports.InvoicingService = InvoicingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoicingService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9pbnZvaWNpbmcvaW52b2ljaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLGdFQUE0RDtBQUM1RCxrREFBa0Q7QUFHM0MsSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBZ0I7SUFDUDtJQUFwQixZQUFvQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO0lBQUcsQ0FBQztJQUU3QyxLQUFLLENBQUMsWUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNsQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7U0FDeEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBUztRQUMzQixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUNuRCxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM3QixPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFO1NBQ2hDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUM5QyxJQUFBLDRCQUFjLEVBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFD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LEVBQVUsRUFBRSxNQUFjO1FBQ2xELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2hDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNiLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRTtZQUNoQixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO1NBQ3pCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBMUVZLDRDQUFnQjsyQkFBaEIsZ0JBQWdCO0lBRDVCLElBQUEsbUJBQVUsR0FBRTtxQ0FFaUIsOEJBQWE7R0FEOUIsZ0JBQWdCLENBMEU1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcmlzbWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJpc21hL3ByaXNtYS5zZXJ2aWNlJztcbmltcG9ydCB7IGNhbGN1bGF0ZUlUQklTIH0gZnJvbSAnQGVycC9zaGFyZWQtY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbnZvaWNpbmdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmlzbWE6IFByaXNtYVNlcnZpY2UpIHt9XG5cbiAgYXN5bmMgZmluZEludm9pY2VzKCkge1xuICAgIHJldHVybiB0aGlzLnByaXNtYS5pbnZvaWNlLmZpbmRNYW55KHtcbiAgICAgIGluY2x1ZGU6IHsgY29tcGFueTogdHJ1ZSwgbGluZXM6IHRydWUgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZUludm9pY2UoZGF0YTogYW55KSB7XG4gICAgY29uc3QgY29tcGFueSA9IGF3YWl0IHRoaXMucHJpc21hLmNvbXBhbnkuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogZGF0YS5jb21wYW55SWQgfSxcbiAgICAgIGluY2x1ZGU6IHsgbmNmU2VxdWVuY2VzOiB0cnVlIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIWNvbXBhbnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29tcGFueSBub3QgZm91bmQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpdGJpc0NhbGNzID0gZGF0YS5saW5lcy5tYXAoKGxpbmU6IGFueSkgPT5cbiAgICAgIGNhbGN1bGF0ZUlUQklTKGxpbmUucXVhbnRpdHkgKiBsaW5lLnByaWNlLCBsaW5lLnRheFJhdGUsIGZhbHNlKSxcbiAgICApO1xuICAgIGNvbnN0IHN1YnRvdGFsID0gaXRiaXNDYWxjcy5yZWR1Y2UoKHN1bTogbnVtYmVyLCBjYWxjOiBhbnkpID0+IHN1bSArIGNhbGMuc3VidG90YWwsIDApO1xuICAgIGNvbnN0IHRheFRvdGFsID0gaXRiaXNDYWxjcy5yZWR1Y2UoKHN1bTogbnVtYmVyLCBjYWxjOiBhbnkpID0+IHN1bSArIGNhbGMuaXRiaXNBbW91bnQsIDApO1xuICAgIGNvbnN0IHRvdGFsID0gaXRiaXNDYWxjcy5yZWR1Y2UoKHN1bTogbnVtYmVyLCBjYWxjOiBhbnkpID0+IHN1bSArIGNhbGMudG90YWwsIDApO1xuXG4gICAgY29uc3QgbmNmU2VxdWVuY2UgPSBjb21wYW55Lm5jZlNlcXVlbmNlc1swXTtcbiAgICBjb25zdCBuY2YgPSBgJHtuY2ZTZXF1ZW5jZS5wcmVmaXh9LSR7U3RyaW5nKE51bWJlcihuY2ZTZXF1ZW5jZS5jdXJyZW50U2VxdWVuY2UpKS5wYWRTdGFydCg4LCAnMCcpfWA7XG5cbiAgICBjb25zdCBpbnZvaWNlID0gYXdhaXQgdGhpcy5wcmlzbWEuaW52b2ljZS5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBjb21wYW55SWQ6IGRhdGEuY29tcGFueUlkLFxuICAgICAgICBjdXN0b21lcklkOiBkYXRhLmN1c3RvbWVySWQsXG4gICAgICAgIG5jZixcbiAgICAgICAgc3VidG90YWwsXG4gICAgICAgIGl0YmlzQW1vdW50OiB0YXhUb3RhbCxcbiAgICAgICAgdG90YWwsXG4gICAgICAgIHN0YXR1czogJ3BlbmRpbmcnLFxuICAgICAgICBpbnZvaWNlRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgbmNmVHlwZTogJzAxJyxcbiAgICAgICAgaW52b2ljZU51bWJlcjogYElOVi0ke0RhdGUubm93KCl9YCxcbiAgICAgICAgaWRlbXBvdGVuY3lLZXk6IGAke0RhdGUubm93KCl9LSR7ZGF0YS5jb21wYW55SWR9YCxcbiAgICAgICAgY3JlYXRlZEJ5OiAnc3lzdGVtJyxcbiAgICAgICAgbGluZXM6IHtcbiAgICAgICAgICBjcmVhdGU6IGRhdGEubGluZXMubWFwKChsaW5lOiBhbnksIGluZGV4OiBudW1iZXIpID0+ICh7XG4gICAgICAgICAgICBwcm9kdWN0SWQ6IGxpbmUucHJvZHVjdElkLFxuICAgICAgICAgICAgbGluZU51bWJlcjogaW5kZXggKyAxLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGBMaW5lICR7aW5kZXggKyAxfWAsXG4gICAgICAgICAgICBxdWFudGl0eTogbGluZS5xdWFudGl0eSxcbiAgICAgICAgICAgIHVuaXRQcmljZTogbGluZS5wcmljZSxcbiAgICAgICAgICAgIGl0YmlzUmF0ZTogbGluZS50YXhSYXRlLFxuICAgICAgICAgICAgdGF4QW1vdW50OiBsaW5lLnF1YW50aXR5ICogbGluZS5wcmljZSAqIGxpbmUudGF4UmF0ZSxcbiAgICAgICAgICAgIGxpbmVUb3RhbDogbGluZS5xdWFudGl0eSAqIGxpbmUucHJpY2UgKiAoMSArIGxpbmUudGF4UmF0ZSksXG4gICAgICAgICAgfSkpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGluY2x1ZGU6IHsgbGluZXM6IHRydWUsIGNvbXBhbnk6IHRydWUgfSxcbiAgICB9IGFzIGFueSk7XG5cbiAgICBhd2FpdCB0aGlzLnByaXNtYS5uY2ZTZXF1ZW5jZS51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IG5jZlNlcXVlbmNlLmlkIH0sXG4gICAgICBkYXRhOiB7IGN1cnJlbnRTZXF1ZW5jZTogTnVtYmVyKG5jZlNlcXVlbmNlLmN1cnJlbnRTZXF1ZW5jZSkgKyAxIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW52b2ljZTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZUludm9pY2VTdGF0dXMoaWQ6IHN0cmluZywgc3RhdHVzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5wcmlzbWEuaW52b2ljZS51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgIGRhdGE6IHsgc3RhdHVzIH0sXG4gICAgICBpbmNsdWRlOiB7IGxpbmVzOiB0cnVlIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==