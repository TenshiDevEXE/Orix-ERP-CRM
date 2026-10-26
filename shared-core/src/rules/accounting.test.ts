import {
  validateDoubleEntry,
  generateJournalEntryFromEvent,
  validatePeriodOpen,
  calculateAccountBalance,
} from './accounting';

describe('Accounting Rules', () => {
  describe('validateDoubleEntry', () => {
    it('debe validar asiento correcto', () => {
      const lines = [
        { accountId: '1', debit: 10000, credit: 0 },
        { accountId: '2', debit: 0, credit: 10000 },
      ];
      const result = validateDoubleEntry(lines);
      expect(result.valid).toBe(true);
      expect(result.totalDebit).toBe(10000);
      expect(result.totalCredit).toBe(10000);
    });

    it('debe rechazar asiento con débito != crédito', () => {
      const lines = [
        { accountId: '1', debit: 10000, credit: 0 },
        { accountId: '2', debit: 0, credit: 9000 },
      ];
      const result = validateDoubleEntry(lines);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('no iguala');
    });

    it('debe rechazar asiento con menos de 2 líneas', () => {
      const lines = [{ accountId: '1', debit: 10000, credit: 10000 }];
      const result = validateDoubleEntry(lines);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('al menos 2 líneas');
    });

    it('debe rechazar líneas sin débito ni crédito', () => {
      const lines = [
        { accountId: '1', debit: 10000, credit: 0 },
        { accountId: '2', debit: 0, credit: 0 },
      ];
      const result = validateDoubleEntry(lines);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('débito o crédito');
    });

    it('debe validar asiento con múltiples líneas', () => {
      const lines = [
        { accountId: '1', debit: 5000, credit: 0 },
        { accountId: '2', debit: 5000, credit: 0 },
        { accountId: '3', debit: 0, credit: 7000 },
        { accountId: '4', debit: 0, credit: 3000 },
      ];
      const result = validateDoubleEntry(lines);
      expect(result.valid).toBe(true);
      expect(result.totalDebit).toBe(10000);
      expect(result.totalCredit).toBe(10000);
    });
  });

  describe('validatePeriodOpen', () => {
    it('debe permitir operaciones en período abierto', () => {
      const result = validatePeriodOpen('open');
      expect(result.valid).toBe(true);
    });

    it('debe rechazar operaciones en período cerrado', () => {
      const result = validatePeriodOpen('closed');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('cerrado');
    });
  });

  describe('calculateAccountBalance', () => {
    it('debe calcular saldo para activos (débito aumenta)', () => {
      const balance = calculateAccountBalance('asset', 15000, 5000);
      expect(balance).toBe(10000); // 15000 - 5000
    });

    it('debe calcular saldo para pasivos (crédito aumenta)', () => {
      const balance = calculateAccountBalance('liability', 5000, 15000);
      expect(balance).toBe(10000); // 15000 - 5000
    });

    it('debe calcular saldo para patrimonio (crédito aumenta)', () => {
      const balance = calculateAccountBalance('equity', 3000, 12000);
      expect(balance).toBe(9000); // 12000 - 3000
    });

    it('debe calcular saldo para ingresos (crédito aumenta)', () => {
      const balance = calculateAccountBalance('income', 2000, 20000);
      expect(balance).toBe(18000); // 20000 - 2000
    });

    it('debe calcular saldo para gastos (débito aumenta)', () => {
      const balance = calculateAccountBalance('expense', 8000, 1000);
      expect(balance).toBe(7000); // 8000 - 1000
    });
  });

  describe('generateJournalEntryFromEvent', () => {
    it('debe generar asiento desde mapeo', () => {
      const mapping = {
        debitAccountId: 'acc-1',
        creditAccountId: 'acc-2',
        amount: 10000,
        description: 'Venta de mercancía',
      };
      const entry = generateJournalEntryFromEvent('invoice.posted', mapping);

      expect(entry.description).toBe(mapping.description);
      expect(entry.lines).toHaveLength(2);
      expect(entry.lines[0].accountId).toBe(mapping.debitAccountId);
      expect(entry.lines[0].debit).toBe(mapping.amount);
      expect(entry.lines[1].accountId).toBe(mapping.creditAccountId);
      expect(entry.lines[1].credit).toBe(mapping.amount);
      expect(entry.status).toBe('draft');
    });
  });
});
