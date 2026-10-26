import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounting')
@UseGuards(JwtAuthGuard)
export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  @Get('accounts')
  findAccounts() {
    return this.accountingService.findAccounts();
  }

  @Post('accounts')
  createAccount(@Body() body: any) {
    return this.accountingService.createAccount(body);
  }

  @Get('journal-entries')
  findJournalEntries() {
    return this.accountingService.findJournalEntries();
  }

  @Post('journal-entries')
  createJournalEntry(@Body() body: any) {
    return this.accountingService.createJournalEntry(body);
  }

  @Get('periods')
  findPeriods() {
    return this.accountingService.findPeriods();
  }

  @Post('periods')
  createPeriod(@Body() body: any) {
    return this.accountingService.createPeriod(body);
  }

  @Put('periods/:id/close')
  closePeriod(@Param('id') id: string) {
    return this.accountingService.closePeriod(id);
  }
}
