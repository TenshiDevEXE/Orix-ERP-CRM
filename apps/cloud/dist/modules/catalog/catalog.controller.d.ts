import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private catalogService;
    constructor(catalogService: CatalogService);
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
    createCategory(body: any): Promise<{
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
    createProduct(body: any): Promise<{
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
    createTax(body: any): Promise<{
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
