export interface ITBISRate {
    code: string;
    name: string;
    rate: number;
    type: 'itbis' | 'ico' | 'selectivo';
}
export interface ITBISCalculation {
    subtotal: number;
    itbisAmount: number;
    total: number;
    rate: number;
}
/**
 * Calcula el ITBIS para un monto
 * @param amount Monto base en centavos
 * @param rate Tasa de ITBIS (0.18 para 18%)
 * @param included Si el ITBIS está incluido en el precio
 */
export declare function calculateITBIS(amount: number, rate: number, included: boolean): ITBISCalculation;
/**
 * Calcula el ITBIS para una línea de factura
 */
export declare function calculateLineITBIS(quantity: number, unitPrice: number, rate: number, included: boolean): ITBISCalculation;
/**
 * Valida que una tasa de ITBIS sea válida según normativa RD
 */
export declare function validateITBISRate(rate: number): boolean;
/**
 * Determina el tipo de ITBIS según el régimen de la empresa
 */
export declare function getITBISRateByRegimen(regimen: string, isFreeZone: boolean): number;
//# sourceMappingURL=itbis.d.ts.map