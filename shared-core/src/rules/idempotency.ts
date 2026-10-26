// Utilidades para idempotencia de operaciones

/**
 * Genera una clave de idempotencia única
 * @param entityType Tipo de entidad (invoice, payment, etc.)
 * @param tenantId ID del tenant
 * @param companyId ID de la empresa
 * @param clientGeneratedId ID generado por el cliente
 */
export function generateIdempotencyKey(
  entityType: string,
  tenantId: string,
  companyId: string,
  clientGeneratedId: string,
): string {
  return `${entityType}:${tenantId}:${companyId}:${clientGeneratedId}`;
}

/**
 * Valida el formato de una clave de idempotencia
 */
export function validateIdempotencyKey(key: string): boolean {
  const parts = key.split(':');
  return parts.length === 4 && parts.every((part) => part.length > 0);
}

/**
 * Extrae información de una clave de idempotencia
 */
export function parseIdempotencyKey(key: string): {
  entityType: string;
  tenantId: string;
  companyId: string;
  clientGeneratedId: string;
} | null {
  if (!validateIdempotencyKey(key)) {
    return null;
  }

  const [entityType, tenantId, companyId, clientGeneratedId] = key.split(':');
  return {
    entityType,
    tenantId,
    companyId,
    clientGeneratedId,
  };
}
