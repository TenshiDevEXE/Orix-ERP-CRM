"use strict";
// Utilidades compartidas
Object.defineProperty(exports, "__esModule", { value: true });
exports.centsToDecimal = centsToDecimal;
exports.decimalToCents = decimalToCents;
exports.formatCurrency = formatCurrency;
exports.validateRNC = validateRNC;
exports.generateUUID = generateUUID;
/**
 * Convierte monto en centavos a formato decimal para display
 * @param cents Monto en centavos (entero)
 * @returns Monto en formato decimal (ej: 1500 -> 15.00)
 */
function centsToDecimal(cents) {
    return cents / 100;
}
/**
 * Convierte monto decimal a centavos
 * @param decimal Monto en formato decimal (ej: 15.00)
 * @returns Monto en centavos (entero)
 */
function decimalToCents(decimal) {
    return Math.round(decimal * 100);
}
/**
 * Formatea monto para display en moneda local
 * @param cents Monto en centavos
 * @param currency Código de moneda (default: DOP)
 */
function formatCurrency(cents, currency = 'DOP') {
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
function validateRNC(rnc) {
    // RNC puede ser 9 dígitos (personas jurídicas) o 11 (personas físicas con cédula)
    const cleaned = rnc.replace(/[^0-9]/g, '');
    return cleaned.length === 9 || cleaned.length === 11;
}
/**
 * Genera un UUID v4
 */
function generateUUID() {
    return crypto.randomUUID();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlCQUF5Qjs7QUFPekIsd0NBRUM7QUFPRCx3Q0FFQztBQU9ELHdDQU1DO0FBTUQsa0NBSUM7QUFLRCxvQ0FFQztBQTlDRDs7OztHQUlHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLEtBQWE7SUFDMUMsT0FBTyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLE9BQWU7SUFDNUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxLQUFhLEVBQUUsV0FBbUIsS0FBSztJQUNwRSxNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO1FBQ3BDLEtBQUssRUFBRSxVQUFVO1FBQ2pCLFFBQVE7S0FDVCxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixXQUFXLENBQUMsR0FBVztJQUNyQyxrRkFBa0Y7SUFDbEYsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0MsT0FBTyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQztBQUN2RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixZQUFZO0lBQzFCLE9BQU8sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBVdGlsaWRhZGVzIGNvbXBhcnRpZGFzXG5cbi8qKlxuICogQ29udmllcnRlIG1vbnRvIGVuIGNlbnRhdm9zIGEgZm9ybWF0byBkZWNpbWFsIHBhcmEgZGlzcGxheVxuICogQHBhcmFtIGNlbnRzIE1vbnRvIGVuIGNlbnRhdm9zIChlbnRlcm8pXG4gKiBAcmV0dXJucyBNb250byBlbiBmb3JtYXRvIGRlY2ltYWwgKGVqOiAxNTAwIC0+IDE1LjAwKVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2VudHNUb0RlY2ltYWwoY2VudHM6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBjZW50cyAvIDEwMDtcbn1cblxuLyoqXG4gKiBDb252aWVydGUgbW9udG8gZGVjaW1hbCBhIGNlbnRhdm9zXG4gKiBAcGFyYW0gZGVjaW1hbCBNb250byBlbiBmb3JtYXRvIGRlY2ltYWwgKGVqOiAxNS4wMClcbiAqIEByZXR1cm5zIE1vbnRvIGVuIGNlbnRhdm9zIChlbnRlcm8pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNpbWFsVG9DZW50cyhkZWNpbWFsOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5yb3VuZChkZWNpbWFsICogMTAwKTtcbn1cblxuLyoqXG4gKiBGb3JtYXRlYSBtb250byBwYXJhIGRpc3BsYXkgZW4gbW9uZWRhIGxvY2FsXG4gKiBAcGFyYW0gY2VudHMgTW9udG8gZW4gY2VudGF2b3NcbiAqIEBwYXJhbSBjdXJyZW5jeSBDw7NkaWdvIGRlIG1vbmVkYSAoZGVmYXVsdDogRE9QKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0Q3VycmVuY3koY2VudHM6IG51bWJlciwgY3VycmVuY3k6IHN0cmluZyA9ICdET1AnKTogc3RyaW5nIHtcbiAgY29uc3QgZGVjaW1hbCA9IGNlbnRzVG9EZWNpbWFsKGNlbnRzKTtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZXMtRE8nLCB7XG4gICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgY3VycmVuY3ksXG4gIH0pLmZvcm1hdChkZWNpbWFsKTtcbn1cblxuLyoqXG4gKiBWYWxpZGEgdW4gUk5DIGRvbWluaWNhbm9cbiAqIEBwYXJhbSBybmMgUk5DIGEgdmFsaWRhciAoOSBvIDExIGTDrWdpdG9zKVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVSTkMocm5jOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgLy8gUk5DIHB1ZWRlIHNlciA5IGTDrWdpdG9zIChwZXJzb25hcyBqdXLDrWRpY2FzKSBvIDExIChwZXJzb25hcyBmw61zaWNhcyBjb24gY8OpZHVsYSlcbiAgY29uc3QgY2xlYW5lZCA9IHJuYy5yZXBsYWNlKC9bXjAtOV0vZywgJycpO1xuICByZXR1cm4gY2xlYW5lZC5sZW5ndGggPT09IDkgfHwgY2xlYW5lZC5sZW5ndGggPT09IDExO1xufVxuXG4vKipcbiAqIEdlbmVyYSB1biBVVUlEIHY0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNyeXB0by5yYW5kb21VVUlEKCk7XG59XG4iXX0=