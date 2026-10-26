import { PrismaService } from '../../prisma/prisma.service';
export declare class InventoryService {
    private prisma;
    constructor(prisma: PrismaService);
    findMovements(): Promise<({
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
        };
        product: {
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
        };
    } & {
        id: string;
        tenantId: string;
        companyId: string;
        createdAt: Date;
        createdBy: string;
        productId: string;
        quantity: import("@prisma/client/runtime/library").Decimal;
        movementType: string;
        referenceType: string | null;
        referenceId: string | null;
        unitCost: import("@prisma/client/runtime/library").Decimal;
        totalCost: import("@prisma/client/runtime/library").Decimal;
        locationId: string | null;
        occurredAt: Date;
    })[]>;
    createMovement(data: any): Promise<{
        product: {
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
        };
    } & {
        id: string;
        tenantId: string;
        companyId: string;
        createdAt: Date;
        createdBy: string;
        productId: string;
        quantity: import("@prisma/client/runtime/library").Decimal;
        movementType: string;
        referenceType: string | null;
        referenceId: string | null;
        unitCost: import("@prisma/client/runtime/library").Decimal;
        totalCost: import("@prisma/client/runtime/library").Decimal;
        locationId: string | null;
        occurredAt: Date;
    }>;
    findBalances(): Promise<{
        id: string;
        tenantId: string;
        companyId: string;
        updatedAt: Date;
        productId: string;
        totalCost: import("@prisma/client/runtime/library").Decimal;
        locationId: string | null;
        quantityOnHand: import("@prisma/client/runtime/library").Decimal;
        lastMovementAt: Date | null;
    }[]>;
}
