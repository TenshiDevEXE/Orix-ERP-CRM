# ERP Híbrido Multi-Tenant - República Dominicana

Sistema ERP híbrido (local + nube) multi-empresa para el mercado dominicano con:
- Facturación con NCF e ITBIS
- Inventario
- Contabilidad de partida doble
- Aislamiento multi-tenant

## MVP v0.0.1

### Características
- **Monorepo** con NestJS (cloud) y Express (local)
- **Shared-core** con reglas de negocio compartidas
- **PostgreSQL** con Prisma ORM
- **Row-Level Security** con middleware de tenant
- **Módulos**: identidad, tenants, catálogo, facturación, inventario, contabilidad
- **Tests**: 35/35 pasando (24 unitarias + 11 integración)

### Instalación

```bash
# Instalar dependencias
npm install

# Configurar base de datos
cp .env.example .env
# Editar .env con tu DATABASE_URL

# Ejecutar migraciones
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate

# Ejecutar tests
npm run test
npm run test:integration
```

### Ejecutar aplicaciones

**Cloud (NestJS)**:
```bash
cd apps/cloud
npm run build
npm run start
# http://localhost:3000
```

**Local (Express)**:
```bash
cd apps/local
npm run build
npm run start
# http://localhost:3001
```

### Crear Repo en GitHub

1. Crear nuevo repo en GitHub (private)
2. Copia los siguientes comandos:

```bash
# Agregar remote
git remote add origin https://github.com/TU_USERNAME/erp-hibrido-rd.git

# Push
git branch -M main
git push -u origin main

# Crear release 0.0.1 en GitHub
# Ve a: https://github.com/TU_USERNAME/erp-hibrido-rd/releases/new
# Tag: v0.0.1
# Title: MVP v0.0.1
# Description: ERP Híbrido Multi-Tenant para República Dominicana
```

### Documentación
- `docs/entorno.md` - Configuración del entorno
- `PROPUESTA_INICIAL.md` - Propuesta técnica inicial

### Tecnologías
- TypeScript, Node.js
- NestJS, Express
- Prisma, PostgreSQL
- Jest, bcrypt

## Licencia
MIT
