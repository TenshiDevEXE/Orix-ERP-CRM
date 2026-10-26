import { PrismaService } from '../../prisma/prisma.service';
export declare class CatalogService {
    private prisma;
    constructor(prisma: PrismaService);
    findCategories(): Promise<{
        id: string;
        tenantId: string;
        companyId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        parentId: string | null;
        code: string | null;
    }[]>;
    createCategory(data: any): Promise<{
        id: string;
        tenantId: string;
        companyId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        parentId: string | null;
        code: string | null;
    }>;
    findProducts(): Promise<({
        company: {
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
        } | null;
        category: {
            id: string;
            tenantId: string;
            companyId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            parentId: string | null;
            code: string | null;
        } | null;
    } & {
        id: string;
        tenantId: string;
        companyId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        categoryId: string | null;
        sku: string;
        unit: string;
        cost: import("@prisma/client/runtime/library").Decimal;
        price: import("@prisma/client/runtime/library").Decimal;
        itbisTaxId: string | null;
        itbisIncluded: boolean;
        isService: boolean;
        isActive: boolean;
    })[]>;
    createProduct(data: any): Promise<{
        company: {
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
        } | null;
        category: {
            id: string;
            tenantId: string;
            companyId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            parentId: string | null;
            code: string | null;
        } | null;
    } & {
        id: string;
        tenantId: string;
        companyId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        categoryId: string | null;
        sku: string;
        unit: string;
        cost: import("@prisma/client/runtime/library").Decimal;
        price: import("@prisma/client/runtime/library").Decimal;
        itbisTaxId: string | null;
        itbisIncluded: boolean;
        isService: boolean;
        isActive: boolean;
    }>;
    findTaxes(): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        isActive: boolean;
        rate: import("@prisma/client/runtime/library").Decimal;
        type: string;
    }[]>;
    createTax(data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        isActive: boolean;
        rate: import("@prisma/client/runtime/library").Decimal;
        type: string;
    }>;
}
