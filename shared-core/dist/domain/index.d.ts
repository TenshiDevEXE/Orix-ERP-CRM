export interface BaseEntity {
    id: string;
    tenantId: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Tenant extends BaseEntity {
    name: string;
    subdomain: string;
    plan: string;
    status: string;
}
export interface Company extends BaseEntity {
    tenantId: string;
    rnc: string;
    name: string;
    tradeName?: string;
    itbisType: string;
}
export interface Money {
    amount: number;
    currency: string;
}
export interface IdempotentOperation {
    idempotencyKey: string;
    entityType: string;
    entityId: string;
}
//# sourceMappingURL=index.d.ts.map