import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { calculateITBIS } from '@erp/shared-core';

@Injectable()
export class InvoicingService {
  constructor(private prisma: PrismaService) {}

  async findInvoices() {
    return this.prisma.invoice.findMany({
      include: { company: true, lines: true },
    });
  }

  async createInvoice(data: any) {
    const company = await this.prisma.company.findUnique({
      where: { id: data.companyId },
      include: { ncfSequences: true },
    });

    if (!company) {
      throw new Error('Company not found');
    }

    const itbisCalcs = data.lines.map((line: any) =>
      calculateITBIS(line.quantity * line.price, line.taxRate, false),
    );
    const subtotal = itbisCalcs.reduce((sum: number, calc: any) => sum + calc.subtotal, 0);
    const taxTotal = itbisCalcs.reduce((sum: number, calc: any) => sum + calc.itbisAmount, 0);
    const total = itbisCalcs.reduce((sum: number, calc: any) => sum + calc.total, 0);

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
          create: data.lines.map((line: any, index: number) => ({
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
    } as any);

    await this.prisma.ncfSequence.update({
      where: { id: ncfSequence.id },
      data: { currentSequence: Number(ncfSequence.currentSequence) + 1 },
    });

    return invoice;
  }

  async updateInvoiceStatus(id: string, status: string) {
    return this.prisma.invoice.update({
      where: { id },
      data: { status },
      include: { lines: true },
    });
  }
}
