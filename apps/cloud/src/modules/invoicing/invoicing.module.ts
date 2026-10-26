import { Module } from '@nestjs/common';
import { InvoicingService } from './invoicing.service';
import { InvoicingController } from './invoicing.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [InvoicingService],
  controllers: [InvoicingController],
  exports: [InvoicingService],
})
export class InvoicingModule {}
