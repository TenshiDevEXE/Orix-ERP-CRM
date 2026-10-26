// Eventos de dominio para sincronización
export interface DomainEvent {
  eventType: string;
  entityType: string;
  entityId: string;
  tenantId: string;
  companyId: string;
  payload: Record<string, unknown>;
  occurredAt: Date;
}

export class InvoicePostedEvent implements DomainEvent {
  eventType = 'invoice.posted';
  entityType = 'invoice';
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
  }) {
    this.entityId = data.invoiceId;
    this.tenantId = data.tenantId;
    this.companyId = data.companyId;
    this.payload = {
      ncf: data.ncf,
      total: data.total,
    };
    this.occurredAt = new Date();
  }
}

export class InventoryMovementEvent implements DomainEvent {
  eventType = 'inventory.movement';
  entityType = 'inventory_movement';
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
  }) {
    this.entityId = data.movementId;
    this.tenantId = data.tenantId;
    this.companyId = data.companyId;
    this.payload = {
      productId: data.productId,
      quantity: data.quantity,
      movementType: data.movementType,
    };
    this.occurredAt = new Date();
  }
}
