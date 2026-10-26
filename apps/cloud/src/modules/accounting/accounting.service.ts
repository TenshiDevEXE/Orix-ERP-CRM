import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { validateDoubleEntry } from '@erp/shared-core';

@Injectable()
export class AccountingService {
  constructor(private prisma: PrismaService) {}

  async findAccounts() {
    return this.prisma.account.findMany();
  }

  async createAccount(data: any) {
    return this.prisma.account.create({ data });
  }

  async findJournalEntries() {
    return this.prisma.journalEntry.findMany({
      include: { lines: true, company: true },
    });
  }

  async createJournalEntry(data: any) {
    // Validar usando shared-core
    const validation = validateDoubleEntry(data.lines);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Crear asiento usando unchecked input
    const entry = await this.prisma.journalEntry.create({
      data: {
        companyId: data.companyId,
        date: data.date,
        description: data.description,
        status: 'posted',
        lines: {
          create: data.lines.map((line: any, index: number) => ({
            accountId: line.accountId,
            lineNumber: index + 1,
            debit: line.debit,
            credit: line.credit,
          })),
        },
      },
      include: { lines: true },
    } as any);

    return entry;
  }

  async findPeriods() {
    return this.prisma.accountingPeriod.findMany();
  }

  async createPeriod(data: any) {
    return this.prisma.accountingPeriod.create({ data });
  }

  async closePeriod(id: string) {
    return this.prisma.accountingPeriod.update({
      where: { id },
      data: { status: 'closed' },
    });
  }
}
