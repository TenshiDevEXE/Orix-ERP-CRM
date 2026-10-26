"use strict";
// Motor de partida doble (Double-entry bookkeeping)
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDoubleEntry = validateDoubleEntry;
exports.generateJournalEntryFromEvent = generateJournalEntryFromEvent;
exports.validatePeriodOpen = validatePeriodOpen;
exports.calculateAccountBalance = calculateAccountBalance;
/**
 * Valida que un asiento contable cumpla con partida doble
 * Débito total debe igualar Crédito total
 */
function validateDoubleEntry(lines) {
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
    if (lines.length < 2) {
        return {
            valid: false,
            totalDebit,
            totalCredit,
            error: 'Un asiento debe tener al menos 2 líneas',
        };
    }
    // Validar que cada línea tenga al menos un valor
    const invalidLines = lines.filter((line) => line.debit === 0 && line.credit === 0);
    if (invalidLines.length > 0) {
        return {
            valid: false,
            totalDebit,
            totalCredit,
            error: 'Todas las líneas deben tener débito o crédito',
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
function generateJournalEntryFromEvent(_eventType, mapping) {
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
function generateJournalNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ASI-${timestamp}-${random}`;
}
/**
 * Valida que un período contable esté abierto para modificar
 */
function validatePeriodOpen(periodStatus) {
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
function calculateAccountBalance(accountType, debitSum, creditSum) {
    const accountInfo = getAccountTypeInfo(accountType);
    if (accountInfo.debitIncreases) {
        // Activos y gastos: débito aumenta, crédito disminuye
        return debitSum - creditSum;
    }
    else {
        // Pasivos, patrimonio e ingresos: crédito aumenta, débito disminuye
        return creditSum - debitSum;
    }
}
function getAccountTypeInfo(type) {
    const types = {
        asset: { type: 'asset', debitIncreases: true },
        liability: { type: 'liability', debitIncreases: false },
        equity: { type: 'equity', debitIncreases: false },
        income: { type: 'income', debitIncreases: false },
        expense: { type: 'expense', debitIncreases: true },
    };
    return types[type];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9hY2NvdW50aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvREFBb0Q7O0FBMkJwRCxrREEyQ0M7QUFLRCxzRUE0QkM7QUFjRCxnREFVQztBQUtELDBEQWNDO0FBM0hEOzs7R0FHRztBQUNILFNBQWdCLG1CQUFtQixDQUFDLEtBQXlCO0lBTTNELE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdEUsSUFBSSxVQUFVLEtBQUssV0FBVyxFQUFFLENBQUM7UUFDL0IsT0FBTztZQUNMLEtBQUssRUFBRSxLQUFLO1lBQ1osVUFBVTtZQUNWLFdBQVc7WUFDWCxLQUFLLEVBQUUsaUJBQWlCLFVBQVUsOEJBQThCLFdBQVcsR0FBRztTQUMvRSxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNyQixPQUFPO1lBQ0wsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVO1lBQ1YsV0FBVztZQUNYLEtBQUssRUFBRSx5Q0FBeUM7U0FDakQsQ0FBQztJQUNKLENBQUM7SUFFRCxpREFBaUQ7SUFDakQsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQztJ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QyxJQUFJLENBQUMsQ0FBQztBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTW90b3IgZGUgcGFydGlkYSBkb2JsZSAoRG91YmxlLWVudHJ5IGJvb2trZWVwaW5nKVxuXG5leHBvcnQgaW50ZXJmYWNlIEpvdXJuYWxFbnRyeUxpbmUge1xuICBhY2NvdW50SWQ6IHN0cmluZztcbiAgZGViaXQ6IG51bWJlcjsgLy8gRW4gY2VudGF2b3NcbiAgY3JlZGl0OiBudW1iZXI7IC8vIEVuIGNlbnRhdm9zXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpvdXJuYWxFbnRyeSB7XG4gIGlkOiBzdHJpbmc7XG4gIG51bWJlcjogc3RyaW5nO1xuICBkYXRlOiBEYXRlO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBsaW5lczogSm91cm5hbEVudHJ5TGluZVtdO1xuICBzdGF0dXM6ICdkcmFmdCcgfCAncG9zdGVkJyB8ICd2b2lkZWQnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjY291bnRUeXBlIHtcbiAgdHlwZTogJ2Fzc2V0JyB8ICdsaWFiaWxpdHknIHwgJ2VxdWl0eScgfCAnaW5jb21lJyB8ICdleHBlbnNlJztcbiAgZGViaXRJbmNyZWFzZXM6IGJvb2xlYW47IC8vIHRydWUgcGFyYSBhY3Rpdm9zIHkgZ2FzdG9zLCBmYWxzZSBwYXJhIHBhc2l2b3MsIHBhdHJpbW9uaW8gZSBpbmdyZXNvc1xufVxuXG4vKipcbiAqIFZhbGlkYSBxdWUgdW4gYXNpZW50byBjb250YWJsZSBjdW1wbGEgY29uIHBhcnRpZGEgZG9ibGVcbiAqIETDqWJpdG8gdG90YWwgZGViZSBpZ3VhbGFyIENyw6lkaXRvIHRvdGFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZURvdWJsZUVudHJ5KGxpbmVzOiBKb3VybmFsRW50cnlMaW5lW10pOiB7XG4gIHZhbGlkOiBib29sZWFuO1xuICB0b3RhbERlYml0OiBudW1iZXI7XG4gIHRvdGFsQ3JlZGl0OiBudW1iZXI7XG4gIGVycm9yPzogc3RyaW5nO1xufSB7XG4gIGNvbnN0IHRvdGFsRGViaXQgPSBsaW5lcy5yZWR1Y2UoKHN1bSwgbGluZSkgPT4gc3VtICsgbGluZS5kZWJpdCwgMCk7XG4gIGNvbnN0IHRvdGFsQ3JlZGl0ID0gbGluZXMucmVkdWNlKChzdW0sIGxpbmUpID0+IHN1bSArIGxpbmUuY3JlZGl0LCAwKTtcblxuICBpZiAodG90YWxEZWJpdCAhPT0gdG90YWxDcmVkaXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgdG90YWxEZWJpdCxcbiAgICAgIHRvdGFsQ3JlZGl0LFxuICAgICAgZXJyb3I6IGBEw6liaXRvIHRvdGFsICgke3RvdGFsRGViaXR9KSBubyBpZ3VhbGEgQ3LDqWRpdG8gdG90YWwgKCR7dG90YWxDcmVkaXR9KWAsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChsaW5lcy5sZW5ndGggPCAyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgIHRvdGFsRGViaXQsXG4gICAgICB0b3RhbENyZWRpdCxcbiAgICAgIGVycm9yOiAnVW4gYXNpZW50byBkZWJlIHRlbmVyIGFsIG1lbm9zIDIgbMOtbmVhcycsXG4gICAgfTtcbiAgfVxuXG4gIC8vIFZhbGlkYXIgcXVlIGNhZGEgbMOtbmVhIHRlbmdhIGFsIG1lbm9zIHVuIHZhbG9yXG4gIGNvbnN0IGludmFsaWRMaW5lcyA9IGxpbmVzLmZpbHRlcigobGluZSkgPT4gbGluZS5kZWJpdCA9PT0gMCAmJiBsaW5lLmNyZWRpdCA9PT0gMCk7XG4gIGlmIChpbnZhbGlkTGluZXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWxpZDogZmFsc2UsXG4gICAgICB0b3RhbERlYml0LFxuICAgICAgdG90YWxDcmVkaXQsXG4gICAgICBlcnJvcjogJ1RvZGFzIGxhcyBsw61uZWFzIGRlYmVuIHRlbmVyIGTDqWJpdG8gbyBjcsOpZGl0bycsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdmFsaWQ6IHRydWUsXG4gICAgdG90YWxEZWJpdCxcbiAgICB0b3RhbENyZWRpdCxcbiAgfTtcbn1cblxuLyoqXG4gKiBHZW5lcmEgdW4gYXNpZW50byBjb250YWJsZSBhIHBhcnRpciBkZSB1biBldmVudG8gZGUgZG9taW5pb1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVKb3VybmFsRW50cnlGcm9tRXZlbnQoXG4gIF9ldmVudFR5cGU6IHN0cmluZyxcbiAgbWFwcGluZzoge1xuICAgIGRlYml0QWNjb3VudElkOiBzdHJpbmc7XG4gICAgY3JlZGl0QWNjb3VudElkOiBzdHJpbmc7XG4gICAgYW1vdW50OiBudW1iZXI7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgfSxcbik6IEpvdXJuYWxFbnRyeSB7XG4gIHJldHVybiB7XG4gICAgaWQ6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgbnVtYmVyOiBnZW5lcmF0ZUpvdXJuYWxOdW1iZXIoKSxcbiAgICBkYXRlOiBuZXcgRGF0ZSgpLFxuICAgIGRlc2NyaXB0aW9uOiBtYXBwaW5nLmRlc2NyaXB0aW9uLFxuICAgIGxpbmVzOiBbXG4gICAgICB7XG4gICAgICAgIGFjY291bnRJZDogbWFwcGluZy5kZWJpdEFjY291bnRJZCxcbiAgICAgICAgZGViaXQ6IG1hcHBpbmcuYW1vdW50LFxuICAgICAgICBjcmVkaXQ6IDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBhY2NvdW50SWQ6IG1hcHBpbmcuY3JlZGl0QWNjb3VudElkLFxuICAgICAgICBjcmVkaXQ6IG1hcHBpbmcuYW1vdW50LFxuICAgICAgICBkZWJpdDogMCxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBzdGF0dXM6ICdkcmFmdCcsXG4gIH07XG59XG5cbi8qKlxuICogR2VuZXJhIHVuIG7Dum1lcm8gZGUgYXNpZW50byDDum5pY29cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVKb3VybmFsTnVtYmVyKCk6IHN0cmluZyB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCkudG9TdHJpbmcoMzYpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA2KS50b1VwcGVyQ2FzZSgpO1xuICByZXR1cm4gYEFTSS0ke3RpbWVzdGFtcH0tJHtyYW5kb219YDtcbn1cblxuLyoqXG4gKiBWYWxpZGEgcXVlIHVuIHBlcsOtb2RvIGNvbnRhYmxlIGVzdMOpIGFiaWVydG8gcGFyYSBtb2RpZmljYXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUGVyaW9kT3BlbihcbiAgcGVyaW9kU3RhdHVzOiBzdHJpbmcsXG4pOiB7IHZhbGlkOiBib29sZWFuOyBlcnJvcj86IHN0cmluZyB9IHtcbiAgaWYgKHBlcmlvZFN0YXR1cyA9PT0gJ2Nsb3NlZCcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgZXJyb3I6ICdFbCBwZXLDrW9kbyBjb250YWJsZSBlc3TDoSBjZXJyYWRvIHkgbm8gYWRtaXRlIGNhbWJpb3MnLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHsgdmFsaWQ6IHRydWUgfTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhIGVsIHNhbGRvIGRlIHVuYSBjdWVudGEgYmFzYWRvIGVuIHN1IHRpcG9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUFjY291bnRCYWxhbmNlKFxuICBhY2NvdW50VHlwZTogQWNjb3VudFR5cGVbJ3R5cGUnXSxcbiAgZGViaXRTdW06IG51bWJlcixcbiAgY3JlZGl0U3VtOiBudW1iZXIsXG4pOiBudW1iZXIge1xuICBjb25zdCBhY2NvdW50SW5mbzogQWNjb3VudFR5cGUgPSBnZXRBY2NvdW50VHlwZUluZm8oYWNjb3VudFR5cGUpO1xuXG4gIGlmIChhY2NvdW50SW5mby5kZWJpdEluY3JlYXNlcykge1xuICAgIC8vIEFjdGl2b3MgeSBnYXN0b3M6IGTDqWJpdG8gYXVtZW50YSwgY3LDqWRpdG8gZGlzbWludXllXG4gICAgcmV0dXJuIGRlYml0U3VtIC0gY3JlZGl0U3VtO1xuICB9IGVsc2Uge1xuICAgIC8vIFBhc2l2b3MsIHBhdHJpbW9uaW8gZSBpbmdyZXNvczogY3LDqWRpdG8gYXVtZW50YSwgZMOpYml0byBkaXNtaW51eWVcbiAgICByZXR1cm4gY3JlZGl0U3VtIC0gZGViaXRTdW07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QWNjb3VudFR5cGVJbmZvKHR5cGU6IEFjY291bnRUeXBlWyd0eXBlJ10pOiBBY2NvdW50VHlwZSB7XG4gIGNvbnN0IHR5cGVzOiBSZWNvcmQ8QWNjb3VudFR5cGVbJ3R5cGUnXSwgQWNjb3VudFR5cGU+ID0ge1xuICAgIGFzc2V0OiB7IHR5cGU6ICdhc3NldCcsIGRlYml0SW5jcmVhc2VzOiB0cnVlIH0sXG4gICAgbGlhYmlsaXR5OiB7IHR5cGU6ICdsaWFiaWxpdHknLCBkZWJpdEluY3JlYXNlczogZmFsc2UgfSxcbiAgICBlcXVpdHk6IHsgdHlwZTogJ2VxdWl0eScsIGRlYml0SW5jcmVhc2VzOiBmYWxzZSB9LFxuICAgIGluY29tZTogeyB0eXBlOiAnaW5jb21lJywgZGViaXRJbmNyZWFzZXM6IGZhbHNlIH0sXG4gICAgZXhwZW5zZTogeyB0eXBlOiAnZXhwZW5zZScsIGRlYml0SW5jcmVhc2VzOiB0cnVlIH0sXG4gIH07XG4gIHJldHVybiB0eXBlc1t0eXBlXTtcbn1cbiJdfQ==