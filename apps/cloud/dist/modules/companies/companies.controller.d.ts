import { CompaniesService } from './companies.service';
export declare class CompaniesController {
    private companiesService;
    constructor(companiesService: CompaniesService);
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
    create(body: any): Promise<{
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
    update(id: string, body: any): Promise<{
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
