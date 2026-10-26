import { Module } from '@nestjs/common';
import { TenantMiddleware } from '../../common/tenant.middleware';

@Module({
  providers: [TenantMiddleware],
  exports: [TenantMiddleware],
})
export class TenantModule {}
