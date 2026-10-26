-- Políticas de Row-Level Security (RLS) para ERP Híbrido RD
-- Estas políticas aseguran que cada tenant solo acceda a sus propios datos

-- Crear esquema app si no existe
CREATE SCHEMA IF NOT EXISTS app;

-- Función auxiliar para obtener el tenant_id actual desde el contexto de la aplicación
CREATE OR REPLACE FUNCTION app.current_tenant_id() RETURNS TEXT AS $$
  SELECT NULLIF(current_setting('app.current_tenant_id', true), '');
$$ LANGUAGE SQL STABLE;

-- Habilitar RLS en todas las tablas
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE taxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entry_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE ncf_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS POR TABLA
-- ============================================

-- Companies
CREATE POLICY companies_isolation ON companies
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Users
CREATE POLICY users_isolation ON users
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Roles
CREATE POLICY roles_isolation ON roles
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- User Roles
CREATE POLICY user_roles_isolation ON user_roles
  FOR ALL
  USING (
    "userId" IN (
      SELECT id FROM users WHERE "tenantId" = app.current_tenant_id()
    )
  )
  WITH CHECK (
    "userId" IN (
      SELECT id FROM users WHERE "tenantId" = app.current_tenant_id()
    )
  );

-- Categories
CREATE POLICY categories_isolation ON categories
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Products
CREATE POLICY products_isolation ON products
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Taxes
CREATE POLICY taxes_isolation ON taxes
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Accounts
CREATE POLICY accounts_isolation ON accounts
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Accounting Periods
CREATE POLICY accounting_periods_isolation ON accounting_periods
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Journal Entries
CREATE POLICY journal_entries_isolation ON journal_entries
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Journal Entry Lines
CREATE POLICY journal_entry_lines_isolation ON journal_entry_lines
  FOR ALL
  USING (
    "journalEntryId" IN (
      SELECT id FROM journal_entries WHERE "tenantId" = app.current_tenant_id()
    )
  )
  WITH CHECK (
    "journalEntryId" IN (
      SELECT id FROM journal_entries WHERE "tenantId" = app.current_tenant_id()
    )
  );

-- NCF Sequences
CREATE POLICY ncf_sequences_isolation ON ncf_sequences
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Invoices
CREATE POLICY invoices_isolation ON invoices
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Invoice Lines
CREATE POLICY invoice_lines_isolation ON invoice_lines
  FOR ALL
  USING (
    "invoiceId" IN (
      SELECT id FROM invoices WHERE "tenantId" = app.current_tenant_id()
    )
  )
  WITH CHECK (
    "invoiceId" IN (
      SELECT id FROM invoices WHERE "tenantId" = app.current_tenant_id()
    )
  );

-- Inventory Movements
CREATE POLICY inventory_movements_isolation ON inventory_movements
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Inventory Balances
CREATE POLICY inventory_balances_isolation ON inventory_balances
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Sync Queue
CREATE POLICY sync_queue_isolation ON sync_queue
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- Audit Log
CREATE POLICY audit_log_isolation ON audit_log
  FOR ALL
  USING ("tenantId" = app.current_tenant_id())
  WITH CHECK ("tenantId" = app.current_tenant_id());

-- ============================================
-- ÍNDICES PARA OPTIMIZAR RLS
-- ============================================

CREATE INDEX idx_companies_tenant ON companies("tenantId");
CREATE INDEX idx_users_tenant ON users("tenantId");
CREATE INDEX idx_roles_tenant ON roles("tenantId");
CREATE INDEX idx_categories_tenant ON categories("tenantId");
CREATE INDEX idx_products_tenant ON products("tenantId");
CREATE INDEX idx_taxes_tenant ON taxes("tenantId");
CREATE INDEX idx_accounts_tenant ON accounts("tenantId");
CREATE INDEX idx_accounting_periods_tenant ON accounting_periods("tenantId");
CREATE INDEX idx_journal_entries_tenant ON journal_entries("tenantId");
CREATE INDEX idx_ncf_sequences_tenant ON ncf_sequences("tenantId");
CREATE INDEX idx_invoices_tenant ON invoices("tenantId");
CREATE INDEX idx_inventory_movements_tenant ON inventory_movements("tenantId");
CREATE INDEX idx_inventory_balances_tenant ON inventory_balances("tenantId");
CREATE INDEX idx_sync_queue_tenant ON sync_queue("tenantId");
CREATE INDEX idx_audit_log_tenant ON audit_log("tenantId");
