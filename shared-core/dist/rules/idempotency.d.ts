/**
 * Genera una clave de idempotencia única
 * @param entityType Tipo de entidad (invoice, payment, etc.)
 * @param tenantId ID del tenant
 * @param companyId ID de la empresa
 * @param clientGeneratedId ID generado por el cliente
 */
export declare function generateIdempotencyKey(entityType: string, tenantId: string, companyId: string, clientGeneratedId: string): string;
/**
 * Valida el formato de una clave de idempotencia
 */
export declare function validateIdempotencyKey(key: string): boolean;
/**
 * Extrae información de una clave de idempotencia
 */
export declare function parseIdempotencyKey(key: string): {
    entityType: string;
    tenantId: string;
    companyId: string;
    clientGeneratedId: string;
} | null;
//# sourceMappingURL=idempotency.d.ts.map