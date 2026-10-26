# Propuesta de Estructura y Modelo de Datos - ERP Híbrido RD

## 1. Estructura del Monorepo

```
ERP/
├── apps/
│   ├── cloud/              # Aplicación monolito modular para la nube
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── identity/        # Identidad y acceso (usuarios, roles, permisos)
│   │   │   │   ├── tenant/          # Gestión de tenants y empresas
│   │   │   │   ├── catalog/         # Catálogo de productos y servicios
│   │   │   │   ├── accounting/      # Motor contable (partida doble)
│   │   │   │   ├── invoicing/       # Facturación y NCF
│   │   │   │   ├── inventory/       # Inventario y movimientos
│   │   │   │   ├── tax/             # ITBIS e impuestos
│   │   │   │   └── sync/            # Sincronización local-nube
│   │   │   ├── shared/             # Núcleo de reglas de negocio compartido
│   │   │   │   ├── domain/          # Entidades de dominio
│   │   │   │   ├── events/          # Eventos de dominio
│   │   │   │   ├── rules/           # Reglas de negocio (contabilidad, ITBIS, etc.)
│   │   │   │   └── idempotency/     # Claves de idempotencia
│   │   │   └── main.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── local/              # Aplicación local (POS/Caja) sin internet
│       ├── src/
│       │   ├── modules/    # Mismos módulos que cloud (salvo sync)
│       │   ├── shared/     # Núcleo compartido (pointer o import directo)
│       │   └── main.ts
│       ├── package.json
│       └── tsconfig.json
│
├── shared-core/             # Paquete npm interno con núcleo compartido
│   ├── src/
│   │   ├── domain/
│   │   ├── events/
│   │   ├── rules/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
│
├── database/
│   ├── migrations/         # Migraciones SQL (compartidas entre cloud y local)
│   ├── seeds/              # Datos iniciales
│   └── schema.sql          # Esquema de referencia
│
├── tests/
│   ├── unit/               # Pruebas unitarias (cálculos, reglas)
│   ├── integration/        # Pruebas de integración (RLS, tenants)
│   └── e2e/                # Pruebas end-to-end
│
├── docs/
│   ├── arquitectura.md
│   ├── modelo-datos.md
│   ├── decisiones.md
│   └── entorno.md          # Registro de herramientas instaladas
│
├── .env.example
├── package.json            # Root package.json (workspaces)
├── tsconfig.base.json
└── README.md
```

**Justificación de la estructura:**
- **Monorepo**: Facilita compartir código entre cloud y local sin duplicación
- **shared-core como paquete npm interno**: Garantiza que el núcleo de reglas es idéntico en ambas instancias
- **Módulos por dominio**: Separa responsabilidades claramente, permitiendo escalar independientemente
- **Migraciones compartidas**: La estructura de base de datos es consistente entre cloud y local

---

## 2. Esquema SQL Inicial

### 2.1 Tablas de Infraestructura

```sql
-- Tenants: Cada cliente del SaaS
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,  -- miempresa.erprd.com
    plan VARCHAR(50) NOT NULL,              -- basic, pro, enterprise
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, suspended, cancelled
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Empresas: Cada empresa dentro de un tenant (multi-empresa por tenant)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    rnc VARCHAR(11) NOT NULL,               -- RNC de la DGII
    name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    itbis_type VARCHAR(20) NOT NULL,        -- regimen_comun, regimen_exento, exportador
    ncf_sequence_type VARCHAR(20) NOT NULL, -- normal, especial, unico
    accounting_period_start DATE NOT NULL,  -- Inicio de año fiscal
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, rnc)
);

-- Row-Level Security: Cada tenant solo ve sus datos
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenants_isolation ON tenants
    FOR ALL USING (true);  -- Solo administradores del sistema pueden ver todos

CREATE POLICY companies_isolation ON companies
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### 2.2 Identidad y Acceso

```sql
-- Usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, inactive, locked
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, email)
);

-- Roles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '[]',  -- Lista de permisos
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, name)
);

-- Asignación de roles a usuarios
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    assigned_by UUID REFERENCES users(id),
    UNIQUE(user_id, role_id)
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY users_isolation ON users
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY roles_isolation ON roles
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY user_roles_isolation ON user_roles
    FOR ALL USING (
        user_id IN (SELECT id FROM users WHERE tenant_id = current_setting('app.current_tenant_id')::UUID)
    );
```

### 2.3 Catálogo de Productos

```sql
-- Categorías de productos
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Productos/Servicios
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sku VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    unit VARCHAR(20) NOT NULL,               -- unidad, caja, servicio, hora
    cost DECIMAL(15,2) NOT NULL DEFAULT 0,   -- Costo en centavos
    price DECIMAL(15,2) NOT NULL DEFAULT 0,  -- Precio de venta en centavos
    itbis_tax_id UUID REFERENCES taxes(id),  -- ITBIS aplicable
    itbis_included BOOLEAN NOT NULL DEFAULT TRUE,  -- ITBIS incluido en precio
    is_service BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, company_id, sku)
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY categories_isolation ON categories
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY products_isolation ON products
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### 2.4 Impuestos (ITBIS)

```sql
-- Tasas de impuesto
CREATE TABLE taxes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,               -- ITBIS18, ITBIS0, EXENTO
    name VARCHAR(100) NOT NULL,
    rate DECIMAL(5,4) NOT NULL,              -- 0.18 para 18%, 0.00 para 0%
    type VARCHAR(20) NOT NULL,                -- itbis, ico, selectivo
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, code)
);

-- Datos iniciales: ITBIS estándar RD
INSERT INTO taxes (tenant_id, code, name, rate, type) VALUES
    ('00000000-0000-0000-0000-000000000000', 'ITBIS18', 'ITBIS 18%', 0.18, 'itbis'),
    ('00000000-0000-0000-0000-000000000000', 'ITBIS0', 'ITBIS 0%', 0.00, 'itbis'),
    ('00000000-0000-0000-0000-000000000000', 'EXENTO', 'Exento', 0.00, 'itbis');

ALTER TABLE taxes ENABLE ROW LEVEL SECURITY;

CREATE POLICY taxes_isolation ON taxes
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### 2.5 Contabilidad (Partida Doble)

```sql
-- Plan de cuentas contables
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,               -- 1.1.01.01
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,                -- asset, liability, equity, income, expense
    subtype VARCHAR(50),                      -- current, fixed, etc.
    parent_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0, -- Saldo actual (calculado)
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, company_id, code)
);

-- Períodos contables
CREATE TABLE accounting_periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,                -- "Enero 2026"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'open', -- open, closed
    closed_at TIMESTAMPTZ,
    closed_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, company_id, start_date)
);

-- Asientos contables (journal entries)
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    period_id UUID NOT NULL REFERENCES accounting_periods(id),
    number VARCHAR(50) NOT NULL,              -- ASI-0001
    date DATE NOT NULL,
    description TEXT,
    reference_type VARCHAR(50),               -- invoice, payment, adjustment
    reference_id UUID,                        -- ID del documento relacionado
    status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, posted, voided
    posted_at TIMESTAMPTZ,
    posted_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID NOT NULL REFERENCES users(id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, company_id, number)
);

-- Líneas de asiento contable
CREATE TABLE journal_entry_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journal_entry_id UUID NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES accounts(id),
    debit DECIMAL(15,2) NOT NULL DEFAULT 0,
    credit DECIMAL(15,2) NOT NULL DEFAULT 0,
    description TEXT,
    line_number INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para validar débito = crédito
CREATE INDEX idx_journal_entry_lines_entry ON journal_entry_lines(journal_entry_id);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entry_lines ENABLE ROW LEVEL SECURITY;

CREATE POLICY accounts_isolation ON accounts
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY accounting_periods_isolation ON accounting_periods
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY journal_entries_isolation ON journal_entries
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY journal_entry_lines_isolation ON journal_entry_lines
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### 2.6 Facturación (NCF)

```sql
-- Secuencias de NCF por tipo
CREATE TABLE ncf_sequences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,                -- 01 (factura), 02 (nota débito), etc.
    prefix VARCHAR(20) NOT NULL,              -- B01000...
    current_sequence BIGINT NOT NULL DEFAULT 1,
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, company_id, type, valid_from)
);

-- Facturas
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL,                -- Referencia a tabla customers (por crear)
    invoice_number VARCHAR(50) NOT NULL,      -- B01000...
    ncf VARCHAR(50) NOT NULL,                  -- NCF completo
    ncf_type VARCHAR(10) NOT NULL,            -- 01, 02, 03, 04, 11, 12, 13, 14, 15
    invoice_date DATE NOT NULL,
    due_date DATE,
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    itbis_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    total DECIMAL(15,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, posted, paid, voided
    journal_entry_id UUID REFERENCES journal_entries(id),
    idempotency_key VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID NOT NULL REFERENCES users(id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, company_id, ncf)
);

-- Líneas de factura
CREATE TABLE invoice_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    discount DECIMAL(15,2) NOT NULL DEFAULT 0,
    itbis_rate DECIMAL(5,4) NOT NULL,
    itbis_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    line_total DECIMAL(15,2) NOT NULL,
    line_number INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE ncf_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_lines ENABLE ROW LEVEL SECURITY;

CREATE POLICY ncf_sequences_isolation ON ncf_sequences
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY invoices_isolation ON invoices
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY invoice_lines_isolation ON invoice_lines
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### 2.7 Inventario

```sql
-- Movimientos de inventario (inmutables)
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    movement_type VARCHAR(20) NOT NULL,       -- purchase, sale, adjustment, transfer
    reference_type VARCHAR(50),                -- invoice, purchase_order, etc.
    reference_id UUID,
    quantity DECIMAL(10,2) NOT NULL,           -- Positivo = entrada, negativo = salida
    unit_cost DECIMAL(15,2) NOT NULL,         -- Costo unitario en el momento
    total_cost DECIMAL(15,2) NOT NULL,        -- quantity * unit_cost
    location_id UUID,                         -- Bodega/sucursal (por definir)
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID NOT NULL REFERENCES users(id)
);

-- Saldo actual de inventario (calculado de movimientos)
-- Esta tabla se mantiene con triggers o vista materializada
CREATE TABLE inventory_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    location_id UUID,
    quantity_on_hand DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_cost DECIMAL(15,2) NOT NULL DEFAULT 0,
    last_movement_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, company_id, product_id, location_id)
);

ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_balances ENABLE ROW LEVEL SECURITY;

CREATE POLICY inventory_movements_isolation ON inventory_movements
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

CREATE POLICY inventory_balances_isolation ON inventory_balances
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### 2.8 Auditoría

```sql
-- Tabla genérica de auditoría para cambios sensibles
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL,             -- insert, update, delete
    old_values JSONB,
    new_values JSONB,
    changed_by UUID NOT NULL REFERENCES users(id),
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY audit_log_isolation ON audit_log
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

### 2.9 Sincronización (inicial, unidireccional local → nube)

```sql
-- Cola de eventos para sincronización
CREATE TABLE sync_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,         -- invoice.created, inventory.movement
    entity_type VARCHAR(50) NOT NULL,         -- invoice, product, etc.
    entity_id UUID NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, sent, confirmed, failed
    attempts INTEGER NOT NULL DEFAULT 0,
    last_attempt_at TIMESTAMPTZ,
    next_attempt_at TIMESTAMPTZ,
    error_message TEXT,
    confirmed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- Índices para procesamiento eficiente
CREATE INDEX idx_sync_queue_status ON sync_queue(status, next_attempt_at);
CREATE INDEX idx_sync_queue_tenant ON sync_queue(tenant_id, company_id);

ALTER TABLE sync_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY sync_queue_isolation ON sync_queue
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

---

## 3. Decisiones Abiertas y Recomendaciones

### 3.1 Stack Tecnológico

**Pregunta:** ¿Qué lenguaje de programación y framework usar?

**Recomendación:**
- **Lenguaje**: TypeScript + Node.js
  - Justificación: Amplio ecosistema, ideal para I/O, mismo runtime en cloud y local
- **Framework**: NestJS para cloud, Fastify/Express simplificado para local
  - Justificación: NestJS provee estructura modular, inyección de dependencias, listo para escalabilidad
  - Local usa versión simplificada para reducir overhead en POS offline
- **ORM**: Prisma
  - Justificación: Type-safe, excelente soporte para PostgreSQL, migraciones integradas, buen rendimiento

**Alternativas consideradas:**
- Python (Django/FastAPI): Bueno pero runtime más pesado para POS offline
- Go: Excelente rendimiento pero curva de aprendizaje más alta
- Java/Spring: Excesivo para MVP local

### 3.2 Base de Datos Local

**Pregunta:** ¿PostgreSQL o SQLite para la instalación local?

**Recomendación: PostgreSQL**

**Justificación:**
1. **Consistencia del esquema**: Cloud y local usan el mismo motor, sin migraciones duales
2. **Row-Level Security**: SQLite no tiene RLS nativo, tendríamos que implementarlo en código
3. **Características avanzadas**: JSONB, triggers, funciones personalizadas necesarias para reglas de negocio
4. **Futuro crecimiento**: Si un cliente escala, puede migrar a PostgreSQL server sin cambiar código
5. **Instalación**: PostgreSQL puede instalarse como servicio ligero (~50MB) en Windows/Mac/Linux

**Condiciones donde usaría SQLite:**
- Si el cliente tiene hardware muy limitado (< 2GB RAM)
- Si requerimos ejecutar desde USB sin instalación

**Alternativa**: PostgreSQL Embedded con opción de fallback a SQLite para casos extremos

### 3.3 Gestión de Migraciones

**Pregunta:** ¿Qué herramienta de migraciones usar?

**Recomendación:** Prisma Migrate

**Justificación:**
- Integrado con Prisma ORM
- Migraciones versionadas y reversibles
- Mismo sistema funciona en cloud y local
- Soporta seeds para datos iniciales

**Alternativa:** dbmate (ligero, agnóstico) si Prisma se siente pesado

### 3.4 Autenticación

**Pregunta:** ¿Cómo manejar autenticación en cloud vs local?

**Recomendación:**
- **Cloud**: JWT + refresh tokens, almacenados en httpOnly cookies
- **Local**: Sesión simple con hash en local (POS típico tiene 1-3 usuarios fijos)
- **Compartido**: Mismo hash bcrypt para passwords

**Razón**: Local offline no puede validar tokens con servidor, necesita autenticación autónoma

### 3.5 Cálculo de Saldos

**Pregunta:** ¿Cómo mantener saldos contables y de inventario?

**Recomendación:** Vista materializada + triggers

**Justificación:**
- **Ventaja**: Consultas rápidas para reporting
- **Desventaja**: Overhead en escritura
- **Alternativa para MVP**: Calcular al vuelo con índices optimizados, luego migrar a materializado

**Propuesta inicial**: Calcular al vuelo con caching Redis en cloud, sin cache en local (volumen bajo)

### 3.6 Idempotencia

**Pregunta:** ¿Estrategia para claves de idempotencia?

**Recomendación:**
- **Formato**: `{entity_type}:{tenant_id}:{company_id}:{client_generated_id}`
- **Ejemplo**: `invoice:uuid-tenant:uuid-company:client-12345`
- **Índice único**: Garantiza no duplicados
- **TTL**: 30 días en Redis (cloud), permanente en BD (local)

### 3.7 Mapeo Evento → Asiento Contable

**Pregunta:** ¿Cómo definir qué evento genera qué asiento?

**Recomendación:** Tabla de configuración `accounting_event_mappings`

```sql
CREATE TABLE accounting_event_mappings (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    company_id UUID NOT NULL,
    event_type VARCHAR(100) NOT NULL,         -- invoice.posted, payment.received
    debit_account_id UUID NOT NULL REFERENCES accounts(id),
    credit_account_id UUID NOT NULL REFERENCES accounts(id),
    description_template TEXT,
    is_active BOOLEAN DEFAULT TRUE
);
```

**Ventaja**: Configurable por tenant sin cambiar código

### 3.8 Estructura de shared-core

**Pregunta:** ¿Cómo empaquetar el núcleo compartido?

**Recomendación:** Monorepo con workspaces de npm

```json
{
  "workspaces": [
    "apps/*",
    "shared-core"
  ]
}
```

**Ventajas:**
- Desarrollo incremental: `npm install` en root instala todo
- TypeScript path aliases: `@shared/rules` funciona en ambos
- Build único: `npm run build` en shared-core, apps lo referencian

### 3.9 Pruebas

**Pregunta:** ¿Framework de pruebas?

**Recomendación:**
- **Unitarias**: Jest + ts-jest
- **Integración**: Jest con supertest (HTTP) + pg-test-helper (BD)
- **E2E**: Playwright (si hay UI) o Jest para API

**Cobertura mínima requerida**: 80% en reglas de negocio, 100% en cálculos contables/ITBIS

### 3.10 Control de Versiones del Esquema

**Pregunta:** ¿Cómo manejar cambios de esquema entre versiones?

**Recomendación:**
- Migraciones Prisma con checksum
- Versión del schema en tabla `schema_version`
- Local verifica compatibilidad antes de sincronizar

---

## 4. Orden de Implementación Propuesto

### Fase 1: Infraestructura (Primer Entregable)
1. ✅ Estructura del monorepo
2. ✅ Esquema SQL inicial
3. ⏳ Pruebas de RLS (aislamiento entre tenants)
4. ⏳ Documentación de decisiones

### Fase 2: Núcleo Compartido
1. Implementar entidades de dominio en TypeScript
2. Implementar reglas de negocio (ITBIS, partida doble)
3. Pruebas unitarias de cálculos
4. Empaquetar como `shared-core`

### Fase 3: API Cloud (Identity + Tenant)
1. Endpoints para crear tenants
2. Endpoints para CRUD de usuarios/roles
3. Middleware para setear `app.current_tenant_id`
4. Pruebas de aislamiento

### Fase 4: Contabilidad Básica
1. CRUD de cuentas contables
2. Motor de asientos (validar débito=crédito)
3. Mapeo de eventos a asientos
4. Pruebas de contabilidad

### Fase 5: Facturación + NCF
1. Generación de NCF con secuencias
2. Cálculo de ITBIS
3. Creación de asiento automático al postear factura
4. Pruebas de NCF e ITBIS

### Fase 6: Inventario
1. Movimientos inmutables
2. Cálculo de saldos
3. Integración con facturación (ajuste de inventario al facturar)
4. Pruebas de inventario

### Fase 7: Sincronización (Unidireccional)
1. Cola de eventos
2. Procesador con reintentos
3. Idempotencia
4. Pruebas de sincronización

---

## 5. Preguntas para el Usuario

1. **Stack tecnológico**: ¿Aceptas TypeScript + Node.js + NestJS + Prisma, o prefieres otra alternativa?

2. **Base de datos local**: ¿Confirmas PostgreSQL para local? (Ver justificación en 3.2)

3. **Multi-empresa por tenant**: ¿Necesitas que un tenant tenga múltiples empresas desde el inicio, o podemos empezar con 1:1?

4. **Cálculo de saldos**: ¿Prefieres calcular al vuelo (más simple) o vista materializada (más rápido pero más complejo)?

5. **Mapeo contable**: ¿La tabla de configuración `accounting_event_mappings` te parece adecuada, o prefieres código hardcodeado inicialmente?

6. **Pruebas**: ¿Es aceptable Jest como framework único para unitarias e integración?

---

## 6. TODO: Suposiciones por Validar

- [ ] Confirmar requisitos exactos de NCF (tipos 01-15, secuencias por tipo)
- [ ] Validar reglas de ITBIS RD (exenciones, tasa especial 16% en zonas francas)
- [ ] Definir estructura de clientes (tabla `customers` por crear)
- [ ] Confirmar si se necesita control de bodegas/sucursales en inventario
- [ ] Definir requisitos de reportes (libro diario, balance, estado de resultados)
