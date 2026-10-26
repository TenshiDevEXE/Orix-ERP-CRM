/**
 * Convierte monto en centavos a formato decimal para display
 * @param cents Monto en centavos (entero)
 * @returns Monto en formato decimal (ej: 1500 -> 15.00)
 */
export declare function centsToDecimal(cents: number): number;
/**
 * Convierte monto decimal a centavos
 * @param decimal Monto en formato decimal (ej: 15.00)
 * @returns Monto en centavos (entero)
 */
export declare function decimalToCents(decimal: number): number;
/**
 * Formatea monto para display en moneda local
 * @param cents Monto en centavos
 * @param currency Código de moneda (default: DOP)
 */
export declare function formatCurrency(cents: number, currency?: string): string;
/**
 * Valida un RNC dominicano
 * @param rnc RNC a validar (9 o 11 dígitos)
 */
export declare function validateRNC(rnc: string): boolean;
/**
 * Genera un UUID v4
 */
export declare function generateUUID(): string;
//# sourceMappingURL=index.d.ts.map