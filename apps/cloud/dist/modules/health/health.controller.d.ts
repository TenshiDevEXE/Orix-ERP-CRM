import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
export declare class HealthController {
    private prisma;
    constructor(prisma: PrismaService);
    check(req: Request): Promise<{
        status: string;
        tenantId: string;
        tenantCount: number;
    }>;
}
