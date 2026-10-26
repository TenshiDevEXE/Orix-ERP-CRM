export interface DomainEvent {
    eventType: string;
    entityType: string;
    entityId: string;
    tenantId: string;
    companyId: string;
    payload: Record<string, unknown>;
    occurredAt: Date;
}
export declare class InvoicePostedEvent implements DomainEvent {
    eventType: string;
    entityType: string;
    entityId: string;
    tenantId: string;
    companyId: string;
    payload: Record<string, unknown>;
    occurredAt: Date;
    constructor(data: {
        invoiceId: string;
        tenantId: string;
        companyId: string;
        ncf: string;
        total: number;
    });
}
export declare class InventoryMovementEvent implements DomainEvent {
    eventType: string;
    entityType: string;
    entityId: string;
    tenantId: string;
    companyId: string;
    payload: Record<string, unknown>;
    occurredAt: Date;
    constructor(data: {
        movementId: string;
        tenantId: string;
        companyId: string;
        productId: string;
        quantity: number;
        movementType: string;
    });
}
//# sourceMappingURL=index.d.ts.map