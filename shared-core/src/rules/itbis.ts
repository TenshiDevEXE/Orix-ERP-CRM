// Cálculos de ITBIS (Impuesto sobre Transferencia de Bienes Industrializados)
// República Dominicana

export interface ITBISRate {
  code: string;
  name: string;
  rate: number; // 0.18 para 18%, 0.00 para 0%
  type: 'itbis' | 'ico' | 'selectivo';
}

export interface ITBISCalculation {
  subtotal: number; // En centavos
  itbisAmount: number; // En centavos
  total: number; // En centavos
  rate: number;
}

/**
 * Calcula el ITBIS para un monto
 * @param amount Monto base en centavos
 * @param rate Tasa de ITBIS (0.18 para 18%)
 * @param included Si el ITBIS está incluido en el precio
 */
export function calculateITBIS(
  amount: number,
  rate: number,
  included: boolean,
): ITBISCalculation {
  if (included) {
    // Si el ITBIS está incluido, el amount ya contiene el impuesto
    // Fórmula: base = amount / (1 + rate)
    const base = Math.round(amount / (1 + rate));
    const itbisAmount = amount - base;
    return {
      subtotal: base,
      itbisAmount,
      total: amount,
      rate,
    };
  } else {
    // Si el ITBIS no está incluido, se suma al monto
    const itbisAmount = Math.round(amount * rate);
    const total = amount + itbisAmount;
    return {
      subtotal: amount,
      itbisAmount,
      total,
      rate,
    };
  }
}

/**
 * Calcula el ITBIS para una línea de factura
 */
export function calculateLineITBIS(
  quantity: number,
  unitPrice: number,
  rate: number,
  included: boolean,
): ITBISCalculation {
  const lineTotal = Math.round(quantity * unitPrice);
  return calculateITBIS(lineTotal, rate, included);
}

/**
 * Valida que una tasa de ITBIS sea válida según normativa RD
 */
export function validateITBISRate(rate: number): boolean {
  // Tasas válidas en RD: 0%, 16% (zonas francas), 18% (general)
  const validRates = [0, 0.16, 0.18];
  return validRates.includes(rate);
}

/**
 * Determina el tipo de ITBIS según el régimen de la empresa
 */
export function getITBISRateByRegimen(
  regimen: string,
  isFreeZone: boolean,
): number {
  if (isFreeZone) {
    return 0.16; // Zonas francas
  }
  switch (regimen) {
    case 'regimen_exento':
      return 0.0;
    case 'regimen_comun':
    default:
      return 0.18;
  }
}
