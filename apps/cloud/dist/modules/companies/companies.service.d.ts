import { PrismaService } from '../../prisma/prisma.service';
export declare class CompaniesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        tenant: {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            settings: import("@prisma/client/runtime/library").JsonValue;
            subdomain: string;
            plan: string;
        };
    } & {
        id: string;
        tenantId: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        rnc: string;
        tradeName: string | null;
        address: string | null;
        phone: string | null;
        itbisType: string;
        ncfSequenceType: string;
        accountingPeriodStart: Date;
        settings: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    findOne(id: string): Promise<({
        tenant: {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            settings: import("@prisma/client/runtime/library").JsonValue;
            subdomain: string;
            plan: string;
        };
    } & {
        id: string;
        tenantId: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        rnc: string;
        tradeName: string | null;
        address: string | null;
        phone: string | null;
        itbisType: string;
        ncfSequenceType: string;
        accountingPeriodStart: Date;
        settings: import("@prisma/client/runtime/library").JsonValue;
    }) | null>;
    create(data: any): Promise<{
        tenant: {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            settings: import("@prisma/client/runtime/library").JsonValue;
            subdomain: string;
            plan: string;
        };
    } & {
        id: string;
        tenantId: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        rnc: string;
        tradeName: string | null;
        address: string | null;
        phone: string | null;
        itbisType: string;
        ncfSequenceType: string;
        accountingPeriodStart: Date;
        settings: import("@prisma/client/runtime/library").JsonValue;
    }>;
    update(id: string, data: any): Promise<{
        tenant: {
            id: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            settings: import("@prisma/client/runtime/library").JsonValue;
            subdomain: string;
            plan: string;
        };
    } & {
        id: string;
        tenantId: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        rnc: string;
        tradeName: string | null;
        address: string | null;
        phone: string | null;
        itbisType: string;
        ncfSequenceType: string;
        accountingPeriodStart: Date;
        settings: import("@prisma/client/runtime/library").JsonValue;
    }>;
    remove(id: string): Promise<{
        id: string;
        tenantId: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        rnc: string;
        tradeName: string | null;
        address: string | null;
        phone: string | null;
        itbisType: string;
        ncfSequenceType: string;
        accountingPeriodStart: Date;
        settings: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
