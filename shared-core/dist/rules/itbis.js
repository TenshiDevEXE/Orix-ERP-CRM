"use strict";
// Cálculos de ITBIS (Impuesto sobre Transferencia de Bienes Industrializados)
// República Dominicana
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateITBIS = calculateITBIS;
exports.calculateLineITBIS = calculateLineITBIS;
exports.validateITBISRate = validateITBISRate;
exports.getITBISRateByRegimen = getITBISRateByRegimen;
/**
 * Calcula el ITBIS para un monto
 * @param amount Monto base en centavos
 * @param rate Tasa de ITBIS (0.18 para 18%)
 * @param included Si el ITBIS está incluido en el precio
 */
function calculateITBIS(amount, rate, included) {
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
    }
    else {
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
function calculateLineITBIS(quantity, unitPrice, rate, included) {
    const lineTotal = Math.round(quantity * unitPrice);
    return calculateITBIS(lineTotal, rate, included);
}
/**
 * Valida que una tasa de ITBIS sea válida según normativa RD
 */
function validateITBISRate(rate) {
    // Tasas válidas en RD: 0%, 16% (zonas francas), 18% (general)
    const validRates = [0, 0.16, 0.18];
    return validRates.includes(rate);
}
/**
 * Determina el tipo de ITBIS según el régimen de la empresa
 */
function getITBISRateByRegimen(regimen, isFreeZone) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRiaXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcnVsZXMvaXRiaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDhFQUE4RTtBQUM5RSx1QkFBdUI7O0FBc0J2Qix3Q0EyQkM7QUFLRCxnREFRQztBQUtELDhDQUlDO0FBS0Qsc0RBY0M7QUExRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixjQUFjLENBQzVCLE1BQWMsRUFDZCxJQUFZLEVBQ1osUUFBaUI7SUFFakIsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNiLCtEQUErRDtRQUMvRCxzQ0FBc0M7UUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3QyxNQUFNLFdBQVcsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLE9BQU87WUFDTCxRQUFRLEVBQUUsSUFBSTtZQUNkLFdBQVc7WUFDWCxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUk7U0FDTCxDQUFDO0lBQ0osQ0FBQztTQUFNLENBQUM7UUFDTixpREFBaUQ7UUFDakQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDOUMsTUFBTSxLQUFLLEdBQUcsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUNuQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVztZQUNYLEtBQUs7WUFDTCxJQUFJO1NBQ0wsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FDaEMsUUFBZ0IsRUFDaEIsU0FBaUIsRUFDakIsSUFBWSxFQUNaLFFBQWlCO0lBRWpCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELE9BQU8sY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsSUFBWTtJQUM1Qyw4REFBOEQ7SUFDOUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixxQkFBcUIsQ0FDbkMsT0FBZSxFQUNmLFVBQW1CO0lBRW5CLElBQUksVUFBVSxFQUFFLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQyxDQUFDLGdCQUFnQjtJQUMvQixDQUFDO0lBQ0QsUUFBUSxPQUFPLEVBQUUsQ0FBQztRQUNoQixLQUFLLGdCQUFnQjtZQUNuQixPQUFPLEdBQUcsQ0FBQztRQUNiLEtBQUssZUFBZSxDQUFDO1FBQ3JCO1lBQ0UsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDw6FsY3Vsb3MgZGUgSVRCSVMgKEltcHVlc3RvIHNvYnJlIFRyYW5zZmVyZW5jaWEgZGUgQmllbmVzIEluZHVzdHJpYWxpemFkb3MpXG4vLyBSZXDDumJsaWNhIERvbWluaWNhbmFcblxuZXhwb3J0IGludGVyZmFjZSBJVEJJU1JhdGUge1xuICBjb2RlOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgcmF0ZTogbnVtYmVyOyAvLyAwLjE4IHBhcmEgMTglLCAwLjAwIHBhcmEgMCVcbiAgdHlwZTogJ2l0YmlzJyB8ICdpY28nIHwgJ3NlbGVjdGl2byc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRCSVNDYWxjdWxhdGlvbiB7XG4gIHN1YnRvdGFsOiBudW1iZXI7IC8vIEVuIGNlbnRhdm9zXG4gIGl0YmlzQW1vdW50OiBudW1iZXI7IC8vIEVuIGNlbnRhdm9zXG4gIHRvdGFsOiBudW1iZXI7IC8vIEVuIGNlbnRhdm9zXG4gIHJhdGU6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBDYWxjdWxhIGVsIElUQklTIHBhcmEgdW4gbW9udG9cbiAqIEBwYXJhbSBhbW91bnQgTW9udG8gYmFzZSBlbiBjZW50YXZvc1xuICogQHBhcmFtIHJhdGUgVGFzYSBkZSBJVEJJUyAoMC4xOCBwYXJhIDE4JSlcbiAqIEBwYXJhbSBpbmNsdWRlZCBTaSBlbCBJVEJJUyBlc3TDoSBpbmNsdWlkbyBlbiBlbCBwcmVjaW9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUlUQklTKFxuICBhbW91bnQ6IG51bWJlcixcbiAgcmF0ZTogbnVtYmVyLFxuICBpbmNsdWRlZDogYm9vbGVhbixcbik6IElUQklTQ2FsY3VsYXRpb24ge1xuICBpZiAoaW5jbHVkZWQpIHtcbiAgICAvLyBTaSBlbCBJVEJJUyBlc3TDoSBpbmNsdWlkbywgZWwgYW1vdW50IHlhIGNvbnRpZW5lIGVsIGltcHVlc3RvXG4gICAgLy8gRsOzcm11bGE6IGJhc2UgPSBhbW91bnQgLyAoMSArIHJhdGUpXG4gICAgY29uc3QgYmFzZSA9IE1hdGgucm91bmQoYW1vdW50IC8gKDEgKyByYXRlKSk7XG4gICAgY29uc3QgaXRiaXNBbW91bnQgPSBhbW91bnQgLSBiYXNlO1xuICAgIHJldHVybiB7XG4gICAgICBzdWJ0b3RhbDogYmFzZSxcbiAgICAgIGl0YmlzQW1vdW50LFxuICAgICAgdG90YWw6IGFtb3VudCxcbiAgICAgIHJhdGUsXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBTaSBlbCBJVEJJUyBubyBlc3TDoSBpbmNsdWlkbywgc2Ugc3VtYSBhbCBtb250b1xuICAgIGNvbnN0IGl0YmlzQW1vdW50ID0gTWF0aC5yb3VuZChhbW91bnQgKiByYXRlKTtcbiAgICBjb25zdCB0b3RhbCA9IGFtb3VudCArIGl0YmlzQW1vdW50O1xuICAgIHJldHVybiB7XG4gICAgICBzdWJ0b3RhbDogYW1vdW50LFxuICAgICAgaXRiaXNBbW91bnQsXG4gICAgICB0b3RhbCxcbiAgICAgIHJhdGUsXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGEgZWwgSVRCSVMgcGFyYSB1bmEgbMOtbmVhIGRlIGZhY3R1cmFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUxpbmVJVEJJUyhcbiAgcXVhbnRpdHk6IG51bWJlcixcbiAgdW5pdFByaWNlOiBudW1iZXIsXG4gIHJhdGU6IG51bWJlcixcbiAgaW5jbHVkZWQ6IGJvb2xlYW4sXG4pOiBJVEJJU0NhbGN1bGF0aW9uIHtcbiAgY29uc3QgbGluZVRvdGFsID0gTWF0aC5yb3VuZChxdWFudGl0eSAqIHVuaXRQcmljZSk7XG4gIHJldHVybiBjYWxjdWxhdGVJVEJJUyhsaW5lVG90YWwsIHJhdGUsIGluY2x1ZGVkKTtcbn1cblxuLyoqXG4gKiBWYWxpZGEgcXVlIHVuYSB0YXNhIGRlIElUQklTIHNlYSB2w6FsaWRhIHNlZ8O6biBub3JtYXRpdmEgUkRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSVRCSVNSYXRlKHJhdGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAvLyBUYXNhcyB2w6FsaWRhcyBlbiBSRDogMCUsIDE2JSAoem9uYXMgZnJhbmNhcyksIDE4JSAoZ2VuZXJhbClcbiAgY29uc3QgdmFsaWRSYXRlcyA9IFswLCAwLjE2LCAwLjE4XTtcbiAgcmV0dXJuIHZhbGlkUmF0ZXMuaW5jbHVkZXMocmF0ZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5hIGVsIHRpcG8gZGUgSVRCSVMgc2Vnw7puIGVsIHLDqWdpbWVuIGRlIGxhIGVtcHJlc2FcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElUQklTUmF0ZUJ5UmVnaW1lbihcbiAgcmVnaW1lbjogc3RyaW5nLFxuICBpc0ZyZWVab25lOiBib29sZWFuLFxuKTogbnVtYmVyIHtcbiAgaWYgKGlzRnJlZVpvbmUpIHtcbiAgICByZXR1cm4gMC4xNjsgLy8gWm9uYXMgZnJhbmNhc1xuICB9XG4gIHN3aXRjaCAocmVnaW1lbikge1xuICAgIGNhc2UgJ3JlZ2ltZW5fZXhlbnRvJzpcbiAgICAgIHJldHVybiAwLjA7XG4gICAgY2FzZSAncmVnaW1lbl9jb211bic6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAwLjE4O1xuICB9XG59XG4iXX0=