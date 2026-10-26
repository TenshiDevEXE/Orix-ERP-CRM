import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { InvoicingService } from './invoicing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('invoicing')
@UseGuards(JwtAuthGuard)
export class InvoicingController {
  constructor(private invoicingService: InvoicingService) {}

  @Get('invoices')
  findInvoices() {
    return this.invoicingService.findInvoices();
  }

  @Post('invoices')
  createInvoice(@Body() body: any) {
    return this.invoicingService.createInvoice(body);
  }

  @Put('invoices/:id/status')
  updateInvoiceStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.invoicingService.updateInvoiceStatus(id, status);
  }
}
