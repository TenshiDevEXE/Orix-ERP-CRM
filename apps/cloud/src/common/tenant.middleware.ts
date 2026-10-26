import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AsyncLocalStorage } from 'async_hooks';

interface TenantContext {
  tenantId?: string;
}

const tenantStorage = new AsyncLocalStorage<TenantContext>();

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string;

    if (!tenantId) {
      throw new UnauthorizedException('Tenant ID is required');
    }

    tenantStorage.run({ tenantId }, () => {
      next();
    });
  }
}

export const getTenantId = (): string | undefined => {
  return tenantStorage.getStore()?.tenantId;
};
