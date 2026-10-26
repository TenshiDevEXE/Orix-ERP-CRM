import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async check(@Req() req: Request) {
    const tenantId = req.headers['x-tenant-id'] as string;
    const tenantCount = await this.prisma.tenant.count();
    return {
      status: 'ok',
      tenantId,
      tenantCount,
    };
  }
}