import {
  calculateITBIS,
  calculateLineITBIS,
  validateITBISRate,
  getITBISRateByRegimen,
} from './itbis';

describe('ITBIS Rules', () => {
  describe('calculateITBIS', () => {
    it('debe calcular ITBIS incluido correctamente', () => {
      const result = calculateITBIS(11800, 0.18, true);
      expect(result.subtotal).toBe(10000);
      expect(result.itbisAmount).toBe(1800);
      expect(result.total).toBe(11800);
      expect(result.rate).toBe(0.18);
    });

    it('debe calcular ITBIS no incluido correctamente', () => {
      const result = calculateITBIS(10000, 0.18, false);
      expect(result.subtotal).toBe(10000);
      expect(result.itbisAmount).toBe(1800);
      expect(result.total).toBe(11800);
      expect(result.rate).toBe(0.18);
    });

    it('debe manejar tasa 0% correctamente', () => {
      const result = calculateITBIS(10000, 0.0, false);
      expect(result.subtotal).toBe(10000);
      expect(result.itbisAmount).toBe(0);
      expect(result.total).toBe(10000);
    });

    it('debe redondear correctamente', () => {
      const result = calculateITBIS(10001, 0.18, false);
      expect(result.itbisAmount).toBe(1800); // 10001 * 0.18 = 1800.18 -> 1800
    });
  });

  describe('calculateLineITBIS', () => {
    it('debe calcular ITBIS por línea con cantidad', () => {
      const result = calculateLineITBIS(2, 5000, 0.18, false);
      expect(result.subtotal).toBe(10000);
      expect(result.itbisAmount).toBe(1800);
      expect(result.total).toBe(11800);
    });

    it('debe calcular ITBIS incluido por línea', () => {
      const result = calculateLineITBIS(1, 11800, 0.18, true);
      expect(result.subtotal).toBe(10000);
      expect(result.itbisAmount).toBe(1800);
      expect(result.total).toBe(11800);
    });
  });

  describe('validateITBISRate', () => {
    it('debe aceptar tasas válidas', () => {
      expect(validateITBISRate(0.0)).toBe(true);
      expect(validateITBISRate(0.16)).toBe(true);
      expect(validateITBISRate(0.18)).toBe(true);
    });

    it('debe rechazar tasas inválidas', () => {
      expect(validateITBISRate(0.15)).toBe(false);
      expect(validateITBISRate(0.20)).toBe(false);
      expect(validateITBISRate(0.10)).toBe(false);
    });
  });

  describe('getITBISRateByRegimen', () => {
    it('debe retornar 18% para régimen común', () => {
      const rate = getITBISRateByRegimen('regimen_comun', false);
      expect(rate).toBe(0.18);
    });

    it('debe retornar 0% para régimen exento', () => {
      const rate = getITBISRateByRegimen('regimen_exento', false);
      expect(rate).toBe(0.0);
    });

    it('debe retornar 16% para zonas francas', () => {
      const rate = getITBISRateByRegimen('regimen_comun', true);
      expect(rate).toBe(0.16);
    });
  });
});
