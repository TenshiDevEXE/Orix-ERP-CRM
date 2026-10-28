export type NcfType = 
  | 'B01' // Factura de Crédito Fiscal
  | 'B02' // Factura de Consumo Final
  | 'B14' // Regímenes Especiales
  | 'B15' // Comprobante Gubernamental
  | 'E31' // e-CF Crédito Fiscal Electrónico
  | 'E32'; // e-CF Consumo Electrónico

export type ModuleKey = 'pos' | 'inventory' | 'crm' | 'accounting' | 'users' | 'settings';

export interface Company {
  id: string;
  name: string;
  rnc: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt: string;
}

export interface UserRole {
  id: string;
  name: string;
  allowedModules: ModuleKey[];
}

export interface User {
  id: string;
  companyId: string;
  username: string;
  password?: string;
  name: string;
  role: 'ADMIN' | 'CASHIER' | 'ACCOUNTANT' | 'INVENTORY_MANAGER' | 'CUSTOM';
  allowedModules: ModuleKey[];
  active: boolean;
  avatar?: string;
}

export interface Customer {
  id: string;
  companyId: string;
  name: string;
  rncOrCedula: string;
  phone?: string;
  email?: string;
  address?: string;
  creditLimit: number;
  currentBalance: number;
  ncfPreference: NcfType;
}

export interface Product {
  id: string;
  companyId: string;
  code: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  taxRate: number; // 0.18, 0.16, 0
  unit: string;
  barcode?: string;
}

export interface InvoiceItem {
  productId: string;
  code: string;
  name: string;
  quantity: number;
  price: number;
  taxRate: number;
  taxAmount: number;
  subtotal: number;
  total: number;
}

export interface Invoice {
  id: string;
  companyId: string;
  invoiceNumber: string;
  ncf: string;
  ncfType: NcfType;
  customerId: string;
  customerName: string;
  customerRnc: string;
  items: InvoiceItem[];
  subtotal: number;
  itbisTotal: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer' | 'credit';
  status: 'PAID' | 'PENDING' | 'CANCELLED';
  syncStatus: 'SYNCED' | 'PENDING_SYNC';
  createdAt: string;
  cashierName: string;
}

export interface AccountingEntry {
  id: string;
  companyId: string;
  date: string;
  reference: string;
  description: string;
  lines: {
    accountId: string;
    accountCode: string;
    accountName: string;
    debit: number;
    credit: number;
  }[];
  syncStatus: 'SYNCED' | 'PENDING_SYNC';
}

export interface Account {
  id: string;
  companyId: string;
  code: string;
  name: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'INCOME' | 'EXPENSE';
  balance: number;
}

export interface NcfSequence {
  id: string;
  companyId: string;
  type: string;
  current: number;
  max: number;
  prefix: string;
}
