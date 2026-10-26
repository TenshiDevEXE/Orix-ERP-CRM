// Utilidades compartidas

/**
 * Convierte monto en centavos a formato decimal para display
 * @param cents Monto en centavos (entero)
 * @returns Monto en formato decimal (ej: 1500 -> 15.00)
 */
export function centsToDecimal(cents: number): number {
  return cents / 100;
}

/**
 * Convierte monto decimal a centavos
 * @param decimal Monto en formato decimal (ej: 15.00)
 * @returns Monto en centavos (entero)
 */
export function decimalToCents(decimal: number): number {
  return Math.round(decimal * 100);
}

/**
 * Formatea monto para display en moneda local
 * @param cents Monto en centavos
 * @param currency Código de moneda (default: DOP)
 */
export function formatCurrency(cents: number, currency: string = 'DOP'): string {
  const decimal = centsToDecimal(cents);
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency,
  }).format(decimal);
}

/**
 * Valida un RNC dominicano
 * @param rnc RNC a validar (9 o 11 dígitos)
 */
export function validateRNC(rnc: string): boolean {
  // RNC puede ser 9 dígitos (personas jurídicas) o 11 (personas físicas con cédula)
  const cleaned = rnc.replace(/[^0-9]/g, '');
  return cleaned.length === 9 || cleaned.length === 11;
}

/**
 * Genera un UUID v4
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}
