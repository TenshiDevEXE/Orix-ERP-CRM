import { db } from '../db';
import type { NcfType } from '../types';

export async function getNextNcf(type: NcfType): Promise<string> {
  const seq = await db.ncfSequences.where('type').equals(type).first();
  if (!seq) {
    // Default fallback
    return `${type}00000001`;
  }
  const nextVal = seq.current + 1;
  await db.ncfSequences.update(seq.id, { current: nextVal });
  
  // Format as B0100000105 (prefix + 8 digits)
  const padded = String(nextVal).padStart(8, '0');
  return `${seq.prefix}${padded}`;
}

export function validateRncOrCedula(val: string): { isValid: boolean; type: 'RNC' | 'CEDULA' | 'INVALID' } {
  const cleaned = val.replace(/[^0-9]/g, '');
  if (cleaned.length === 9) {
    // Basic RNC validation logic
    return { isValid: true, type: 'RNC' };
  } else if (cleaned.length === 11) {
    // Basic Cédula validation logic
    return { isValid: true, type: 'CEDULA' };
  }
  return { isValid: false, type: 'INVALID' };
}

export function calculateTotals(items: { price: number; quantity: number; taxRate: number }[]) {
  let subtotal = 0;
  let itbisTotal = 0;

  for (const item of items) {
    const itemSubtotal = item.price * item.quantity;
    const itemTax = itemSubtotal * item.taxRate;
    subtotal += itemSubtotal;
    itbisTotal += itemTax;
  }

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    itbisTotal: Math.round(itbisTotal * 100) / 100,
    total: Math.round((subtotal + itbisTotal) * 100) / 100
  };
}

export function formatCurrencyRD(amount: number): string {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2
  }).format(amount);
}

