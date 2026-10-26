// Motor de partida doble (Double-entry bookkeeping)

export interface JournalEntryLine {
  accountId: string;
  debit: number; // En centavos
  credit: number; // En centavos
  description?: string;
}

export interface JournalEntry {
  id: string;
  number: string;
  date: Date;
  description: string;
  lines: JournalEntryLine[];
  status: 'draft' | 'posted' | 'voided';
}

export interface AccountType {
  type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  debitIncreases: boolean; // true para activos y gastos, false para pasivos, patrimonio e ingresos
}

/**
 * Valida que un asiento contable cumpla con partida doble
 * Débito total debe igualar Crédito total
 */
export function validateDoubleEntry(lines: JournalEntryLine[]): {
  valid: boolean;
  totalDebit: number;
  totalCredit: number;
  error?: string;
} {
  if (lines.length < 2) {
    return {
      valid: false,
      totalDebit: 0,
      totalCredit: 0,
      error: 'Un asiento debe tener al menos 2 líneas',
    };
  }

  // Validar que cada línea tenga al menos un valor
  const invalidLines = lines.filter((line) => line.debit === 0 && line.credit === 0);
  if (invalidLines.length > 0) {
    return {
      valid: false,
      totalDebit: 0,
      totalCredit: 0,
      error: 'Todas las líneas deben tener débito o crédito',
    };
  }

  const totalDebit = lines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = lines.reduce((sum, line) => sum + line.credit, 0);

  if (totalDebit !== totalCredit) {
    return {
      valid: false,
      totalDebit,
      totalCredit,
      error: `Débito total (${totalDebit}) no iguala Crédito total (${totalCredit})`,
    };
  }

  return {
    valid: true,
    totalDebit,
    totalCredit,
  };
}

/**
 * Genera un asiento contable a partir de un evento de dominio
 */
export function generateJournalEntryFromEvent(
  _eventType: string,
  mapping: {
    debitAccountId: string;
    creditAccountId: string;
    amount: number;
    description: string;
  },
): JournalEntry {
  return {
    id: crypto.randomUUID(),
    number: generateJournalNumber(),
    date: new Date(),
    description: mapping.description,
    lines: [
      {
        accountId: mapping.debitAccountId,
        debit: mapping.amount,
        credit: 0,
      },
      {
        accountId: mapping.creditAccountId,
        credit: mapping.amount,
        debit: 0,
      },
    ],
    status: 'draft',
  };
}

/**
 * Genera un número de asiento único
 */
function generateJournalNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ASI-${timestamp}-${random}`;
}

/**
 * Valida que un período contable esté abierto para modificar
 */
export function validatePeriodOpen(
  periodStatus: string,
): { valid: boolean; error?: string } {
  if (periodStatus === 'closed') {
    return {
      valid: false,
      error: 'El período contable está cerrado y no admite cambios',
    };
  }
  return { valid: true };
}

/**
 * Calcula el saldo de una cuenta basado en su tipo
 */
export function calculateAccountBalance(
  accountType: AccountType['type'],
  debitSum: number,
  creditSum: number,
): number {
  const accountInfo: AccountType = getAccountTypeInfo(accountType);

  if (accountInfo.debitIncreases) {
    // Activos y gastos: débito aumenta, crédito disminuye
    return debitSum - creditSum;
  } else {
    // Pasivos, patrimonio e ingresos: crédito aumenta, débito disminuye
    return creditSum - debitSum;
  }
}

function getAccountTypeInfo(type: AccountType['type']): AccountType {
  const types: Record<AccountType['type'], AccountType> = {
    asset: { type: 'asset', debitIncreases: true },
    liability: { type: 'liability', debitIncreases: false },
    equity: { type: 'equity', debitIncreases: false },
    income: { type: 'income', debitIncreases: false },
    expense: { type: 'expense', debitIncreases: true },
  };
  return types[type];
}
