# Arquitectura del Sistema ERP/CRM Híbrido (RD)

## 1. Visión General
Sistema empresarial integral diseñado para operar bajo dos modalidades:
- **Cloud/Web (Estilo Odoo):** Gestión integral multi-sucursal, CRM, compras, ventas, reportes e impuestos DGII.
- **Local/Offline POS (Estilo Mónica):** Terminal de punto de venta y facturación ultrarrápida con tolerancia a cortes de internet, persistencia local (IndexedDB/SQLite) y sincronización con motor de outbox.

## 2. Pila Tecnológica
- **Frontend / UI:** Next.js (React 19) + Tailwind CSS + Lucide Icons + Shadcn/Radix UI.
- **Backend Core:** NestJS / Express modular con TypeScript.
- **Base de Datos Principal:** PostgreSQL con Prisma ORM (Multi-tenant y RLS).
- **Almacenamiento Local (Offline-First):** Dexie.js (IndexedDB) para browser/desktop.
- **Normativa Fiscal Dominicana:**
  - NCF: B01 (Crédito Fiscal), B02 (Consumo), B14 (Regímenes Especiales), B15 (Gubernamental), e-CF listo.
  - ITBIS: 18%, 16%, exento, retenciones DGII.
  - Reportes 606 y 607.

## 3. Módulos Principales
1. **POS & Facturación:** Cajas, turnos, atajos de teclado, emisión de facturas y tickets.
2. **CRM & Clientes:** Cuentas por cobrar (CxC), límites de crédito, gestión de contactos.
3. **Catálogo & Inventario:** Multi-almacén, stock mínimo, lotes, movimientos (Kardex).
4. **Compras & Proveedores:** Cuentas por pagar (CxP), órdenes de compra, gastos.
5. **Contabilidad General:** Partida doble, catálogo de cuentas, asientos automáticos, balance general.

