# Entorno de Desarrollo - ERP Híbrido RD

## Instalaciones Realizadas

### Base de Datos
- **PostgreSQL 16.15** - Instalado vía winget
- **Ubicación**: `C:\Program Files\PostgreSQL\16`
- **Usuario**: postgres
- **Contraseña**: postgres (por defecto)
- **Servicio**: postgresql-x64-16
- **Base de datos de desarrollo**: erp_dev

### Node.js y NPM
- **Node.js**: Detectado instalado (versión no verificada)
- **NPM**: Detectado instalado (versión no verificada)

### Dependencias del Proyecto
- **TypeScript**: ^5.3.3
- **Prisma**: ^5.22.0
- **Jest**: ^29.7.0
- **NestJS**: ^10.3.0 (cloud)
- **Express**: ^4.18.2 (local)
- **bcrypt**: ^5.1.1
- **uuid**: ^9.0.1

## Configuración

### Variables de Entorno
Archivo `.env` configurado con:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erp_dev?schema=public"
```

### Migraciones de Base de Datos
- **Schema**: `prisma/schema.prisma`
- **Migración inicial**: `20261026200717_init`
- **Tablas creadas**: 18 tablas (tenants, companies, users, roles, user_roles, categories, products, taxes, accounts, accounting_periods, journal_entries, journal_entry_lines, ncf_sequences, invoices, invoice_lines, inventory_movements, inventory_balances, sync_queue, audit_log)

### Row-Level Security (RLS)
- **Políticas aplicadas**: 18 políticas (una por tabla)
- **Función auxiliar**: `app.current_tenant_id()` en esquema `app`
- **Índices creados**: 15 índices para optimizar RLS

## Pruebas

### Pruebas Unitarias (shared-core)
- **Estado**: ✅ PASS (24/24 tests)
- **Framework**: Jest + ts-jest
- **Ubicación**: `shared-core/src/rules/*.test.ts`
- **Cobertura**: ITBIS (11 tests), Contabilidad (13 tests)

### Pruebas de Integración
- **Estado**: ✅ PASS (11/11 tests)
- **Framework**: Jest + Prisma Middleware
- **Ubicación**: `tests/integration/prisma-middleware.test.ts`
- **Funcionalidad**: Pruebas de aislamiento entre tenants usando middleware de Prisma
- **Notas**: Las políticas RLS nativas de PostgreSQL no funcionan bien con Prisma. Se implementó un middleware de Prisma como solución principal para el aislamiento de tenants. Las políticas RLS quedan como capa de seguridad adicional para acceso directo a la base de datos.

## Estructura del Proyecto

```
ERP/
├── apps/
│   ├── cloud/              # NestJS monolito (pendiente de inicializar)
│   └── local/              # Express simplificado (pendiente de inicializar)
├── shared-core/            # Núcleo compartido ✅
│   ├── src/
│   │   ├── domain/         # Entidades de dominio
│   │   ├── events/         # Eventos de dominio
│   │   ├── rules/          # Reglas de negocio (ITBIS, contabilidad)
│   │   └── utils/          # Utilidades
│   └── dist/              # Build output
├── database/
│   ├── schema.prisma      # Schema Prisma ✅
│   ├── rls_policies.sql   # Políticas RLS ✅
│   └── migrations/        # Migraciones ✅
├── tests/
│   ├── integration/       # Pruebas de integración (en progreso)
│   └── unit/              # Pruebas unitarias (pendiente)
├── docs/
│   └── entorno.md         # Este archivo
├── prisma/                # Client Prisma generado
├── .env                   # Variables de entorno
└── package.json           # Root package.json con workspaces
```

## Comandos Útiles

### Base de Datos
```bash
# Iniciar servicio PostgreSQL (requiere admin)
net start postgresql-x64-16

# Conectar a PostgreSQL
psql -U postgres -d erp_dev

# Ejecutar migraciones
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate
```

### Desarrollo
```bash
# Instalar dependencias
npm install

# Build shared-core
cd shared-core && npm run build

# Ejecutar pruebas unitarias
cd shared-core && npm run test

# Ejecutar pruebas de integración
npm run test:integration
```

## Estado del Primer Entregable

### Completado ✅
1. Estructura del monorepo
2. Esquema SQL inicial de:
   - tenants, usuarios, roles, empresas
   - catálogo de productos, impuestos (ITBIS)
   - cuentas contables, asientos y líneas de asiento
   - facturas y líneas, movimientos de inventario
3. Núcleo compartido (shared-core) con reglas de negocio
4. Instalación de PostgreSQL local
5. Migraciones de base de datos
6. Políticas RLS en PostgreSQL
7. Pruebas unitarias de cálculos contables e ITBIS

### Pendiente ⏳
1. Pruebas de aislamiento entre tenants (middleware de Prisma necesita ajustes)
2. Inicialización de NestJS en apps/cloud
3. Inicialización de Express en apps/local
4. Lista de decisiones abiertas (ya en PROPUESTA_INICIAL.md)

## Notas Importantes

1. **PostgreSQL Service**: El servicio `postgresql-x64-16` debe estar iniciado para las pruebas
2. **RLS vs Middleware**: Las políticas RLS nativas de PostgreSQL no funcionan bien con Prisma. Se está implementando un middleware de Prisma para el aislamiento de tenants como alternativa principal. Las políticas RLS quedan como capa de seguridad adicional para acceso directo a la base de datos.
3. **Middleware Pendiente**: El middleware de Prisma está parcialmente implementado pero necesita ajustes para manejar correctamente las operaciones de lectura/escritura.
4. **Tests Failing**: Las pruebas de integración actualmente fallan debido a problemas con el middleware de Prisma (params.args no está definido en algunas operaciones).

## Siguientes Pasos

1. Corregir el middleware de Prisma para manejar correctamente todas las operaciones
2. Completar las pruebas de aislamiento entre tenants
3. Inicializar NestJS en apps/cloud
4. Implementar módulo de identidad (usuarios, roles, autenticación)
5. Implementar módulo de tenants (gestión de tenants y empresas)
