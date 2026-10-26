import { TenantsService } from './tenants.service';
export declare class TenantsController {
    private tenantsService;
    constructor(tenantsService: TenantsService);
    findAll(): Promise<({
        companies: {
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
        }[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        settings: import("@prisma/client/runtime/library").JsonValue;
        subdomain: string;
        plan: string;
    })[]>;
    findOne(id: string): Promise<({
        companies: {
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
        }[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        settings: import("@prisma/client/runtime/library").JsonValue;
        subdomain: string;
        plan: string;
    }) | null>;
    create(body: {
        name: string;
        rnc?: string;
        status?: string;
    }): Promise<{
        companies: {
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
        }[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        settings: import("@prisma/client/runtime/library").JsonValue;
        subdomain: string;
        plan: string;
    }>;
    update(id: string, body: {
        name?: string;
        rnc?: string;
        status?: string;
    }): Promise<{
        companies: {
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
        }[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        settings: import("@prisma/client/runtime/library").JsonValue;
        subdomain: string;
        plan: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        settings: import("@prisma/client/runtime/library").JsonValue;
        subdomain: string;
        plan: string;
    }>;
}
