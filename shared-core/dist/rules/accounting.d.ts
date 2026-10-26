export interface JournalEntryLine {
    accountId: string;
    debit: number;
    credit: number;
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
    debitIncreases: boolean;
}
/**
 * Valida que un asiento contable cumpla con partida doble
 * Débito total debe igualar Crédito total
 */
export declare function validateDoubleEntry(lines: JournalEntryLine[]): {
    valid: boolean;
    totalDebit: number;
    totalCredit: number;
    error?: string;
};
/**
 * Genera un asiento contable a partir de un evento de dominio
 */
export declare function generateJournalEntryFromEvent(_eventType: string, mapping: {
    debitAccountId: string;
    creditAccountId: string;
    amount: number;
    description: string;
}): JournalEntry;
/**
 * Valida que un período contable esté abierto para modificar
 */
export declare function validatePeriodOpen(periodStatus: string): {
    valid: boolean;
    error?: string;
};
/**
 * Calcula el saldo de una cuenta basado en su tipo
 */
export declare function calculateAccountBalance(accountType: AccountType['type'], debitSum: number, creditSum: number): number;
//# sourceMappingURL=accounting.d.ts.map