import Dexie, { type Table } from 'dexie';
import type { 
  Company, User, Product, Customer, Invoice, 
  AccountingEntry, Account, NcfSequence 
} from '../types';

export class ErpDatabase extends Dexie {
  companies!: Table<Company, string>;
  users!: Table<User, string>;
  products!: Table<Product, string>;
  customers!: Table<Customer, string>;
  invoices!: Table<Invoice, string>;
  accountingEntries!: Table<AccountingEntry, string>;
  accounts!: Table<Account, string>;
  ncfSequences!: Table<NcfSequence, string>;

  constructor() {
    super('AgyErpDb');
    this.version(2).stores({
      companies: 'id, rnc, name',
      users: 'id, companyId, username, role',
      products: 'id, companyId, code, barcode, category, name',
      customers: 'id, companyId, rncOrCedula, name',
      invoices: 'id, companyId, invoiceNumber, ncf, customerId, status, syncStatus, createdAt',
      accountingEntries: 'id, companyId, date, reference, syncStatus',
      accounts: 'id, companyId, code, type',
      ncfSequences: 'id, companyId, type'
    });
  }
}

export const db = new ErpDatabase();

export async function initMultiTenantData() {
  const compCount = await db.companies.count();
  if (compCount === 0) {
    const defaultCompanyId = 'comp-01';
    const altCompanyId = 'comp-02';

    await db.companies.bulkAdd([
      {
        id: defaultCompanyId,
        name: 'Supermercado y Comercial Caribe SRL',
        rnc: '101-89472-1',
        address: 'Av. Winston Churchill #105, Santo Domingo, D.N.',
        phone: '809-555-0100',
        email: 'info@caribecomercial.do',
        createdAt: new Date().toISOString()
      },
      {
        id: altCompanyId,
        name: 'Farmacia & Servicios Del Sol SRL',
        rnc: '130-98214-3',
        address: 'Av. 27 de Febrero #45, Santiago de los Caballeros',
        phone: '809-582-4455',
        email: 'contacto@farmaciadelsol.do',
        createdAt: new Date().toISOString()
      }
    ]);

    // Usuarios para la Empresa 1
    await db.users.bulkAdd([
      {
        id: 'usr-admin-1',
        companyId: defaultCompanyId,
        username: 'admin',
        name: 'Carlos Mendoza (Gerente Admin)',
        role: 'ADMIN',
        allowedModules: ['pos', 'inventory', 'crm', 'accounting', 'users', 'settings'],
        active: true,
        avatar: '👨‍💼'
      },
      {
        id: 'usr-caja-1',
        companyId: defaultCompanyId,
        username: 'cajera1',
        name: 'Laura Gómez (Cajera)',
        role: 'CASHIER',
        allowedModules: ['pos'], // Solo POS
        active: true,
        avatar: '👩‍💻'
      },
      {
        id: 'usr-inv-1',
        companyId: defaultCompanyId,
        username: 'almacen1',
        name: 'Marcos Peralta (Encargado Almacén)',
        role: 'INVENTORY_MANAGER',
        allowedModules: ['inventory'], // Solo inventario
        active: true,
        avatar: '📦'
      },
      {
        id: 'usr-conta-1',
        companyId: defaultCompanyId,
        username: 'contador1',
        name: 'Lic. Roberto Peña (Contador)',
        role: 'ACCOUNTANT',
        allowedModules: ['accounting', 'crm'], // Contabilidad y CRM
        active: true,
        avatar: '📊'
      },
      // Usuario de Empresa 2
      {
        id: 'usr-admin-2',
        companyId: altCompanyId,
        username: 'admin_sol',
        name: 'Dra. Altagracia Reyes',
        role: 'ADMIN',
        allowedModules: ['pos', 'inventory', 'crm', 'accounting', 'users', 'settings'],
        active: true,
        avatar: '👩‍⚕️'
      }
    ]);

    // Productos Empresa 1
    await db.products.bulkAdd([
      {
        id: 'p1',
        companyId: defaultCompanyId,
        code: 'PROD-001',
        name: 'Aceite de Oliva Extra Virgen 500ml',
        category: 'Alimentos',
        price: 450,
        cost: 310,
        stock: 45,
        minStock: 10,
        taxRate: 0.18,
        unit: 'UND',
        barcode: '746100010001'
      },
      {
        id: 'p2',
        companyId: defaultCompanyId,
        code: 'PROD-002',
        name: 'Arroz Premium Selecto 10 Lbs',
        category: 'Granos',
        price: 380,
        cost: 290,
        stock: 80,
        minStock: 15,
        taxRate: 0,
        unit: 'UND',
        barcode: '746100010002'
      },
      {
        id: 'p3',
        companyId: defaultCompanyId,
        code: 'PROD-003',
        name: 'Café Molido Dominicano 1 Lb',
        category: 'Bebidas',
        price: 260,
        cost: 180,
        stock: 32,
        minStock: 8,
        taxRate: 0.18,
        unit: 'UND',
        barcode: '746100010003'
      },
      // Producto Empresa 2
      {
        id: 'p4',
        companyId: altCompanyId,
        code: 'MED-001',
        name: 'Paracetamol 500mg Caja 20 tabletas',
        category: 'Medicamentos',
        price: 180,
        cost: 110,
        stock: 120,
        minStock: 25,
        taxRate: 0, // Medicamentos exentos en RD
        unit: 'CAJA',
        barcode: '746200020001'
      }
    ]);

    // Clientes
    await db.customers.bulkAdd([
      {
        id: 'c1',
        companyId: defaultCompanyId,
        name: 'Cliente General / Consumidor Final',
        rncOrCedula: '00000000000',
        phone: '809-000-0000',
        creditLimit: 0,
        currentBalance: 0,
        ncfPreference: 'B02'
      },
      {
        id: 'c2',
        companyId: defaultCompanyId,
        name: 'Inversiones Santo Domingo SRL',
        rncOrCedula: '131-89472-1',
        phone: '809-555-1234',
        email: 'ventas@santodomingo.do',
        address: 'Av. Abraham Lincoln #402',
        creditLimit: 150000,
        currentBalance: 14500,
        ncfPreference: 'B01'
      }
    ]);

    // Secuencias NCF por Empresa
    await db.ncfSequences.bulkAdd([
      { id: 'seq-b01-1', companyId: defaultCompanyId, type: 'B01', prefix: 'B01', current: 104, max: 1000 },
      { id: 'seq-b02-1', companyId: defaultCompanyId, type: 'B02', prefix: 'B02', current: 520, max: 5000 },
      { id: 'seq-b14-1', companyId: defaultCompanyId, type: 'B14', prefix: 'B14', current: 12, max: 500 },
      { id: 'seq-b15-1', companyId: defaultCompanyId, type: 'B15', prefix: 'B15', current: 5, max: 200 },
      
      { id: 'seq-b01-2', companyId: altCompanyId, type: 'B01', prefix: 'B01', current: 10, max: 1000 },
      { id: 'seq-b02-2', companyId: altCompanyId, type: 'B02', prefix: 'B02', current: 45, max: 5000 }
    ]);

    // Catálogo Contable Empresa 1
    await db.accounts.bulkAdd([
      { id: '1101-1', companyId: defaultCompanyId, code: '1.1.01', name: 'Caja General / POS', type: 'ASSET', balance: 54300 },
      { id: '1102-1', companyId: defaultCompanyId, code: '1.1.02', name: 'Banco Popular Dominicano', type: 'ASSET', balance: 420800 },
      { id: '1105-1', companyId: defaultCompanyId, code: '1.1.05', name: 'Cuentas por Cobrar Clientes', type: 'ASSET', balance: 14500 },
      { id: '1108-1', companyId: defaultCompanyId, code: '1.1.08', name: 'Inventario de Mercancías', type: 'ASSET', balance: 185600 },
      { id: '2105-1', companyId: defaultCompanyId, code: '2.1.05', name: 'ITBIS por Pagar a DGII', type: 'LIABILITY', balance: 14200 },
      { id: '4101-1', companyId: defaultCompanyId, code: '4.1.01', name: 'Ingresos por Ventas de Bienes', type: 'INCOME', balance: 650000 }
    ]);
  }
}
