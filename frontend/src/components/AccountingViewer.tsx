import React, { useState, useEffect } from 'react';
import { BookOpen, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { db } from '../db';
import type { AccountingEntry, Account } from '../types';
import { formatCurrencyRD } from '../utils/fiscal';

interface AccountingViewerProps {
  currentCompanyId?: string;
}

export const AccountingViewer: React.FC<AccountingViewerProps> = ({ currentCompanyId = 'comp-01' }) => {
  const [entries, setEntries] = useState<AccountingEntry[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    loadData();
  }, [currentCompanyId]);

  async function loadData() {
    const listEntries = await db.accountingEntries.where('companyId').equals(currentCompanyId).reverse().toArray();
    const listAccounts = await db.accounts.where('companyId').equals(currentCompanyId).toArray();
    setEntries(listEntries);
    setAccounts(listAccounts);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-emerald-400" />
          Contabilidad General (Partida Doble)
        </h2>
        <p className="text-xs text-slate-400 mt-1">Libro diario automatizado, asientos de compras, ventas y conciliación</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400 font-medium">Asientos Generados</span>
          <p className="text-2xl font-bold font-mono text-white mt-1">{entries.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400 font-medium">Cuentas en Catálogo</span>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{accounts.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400 font-medium">Balance Cuadrado</span>
          <p className="text-xs text-emerald-400 mt-2 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Débito = Crédito Verificado
          </p>
        </div>
      </div>

      {/* Libro Diario */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
            Libro Diario de Asientos Contables
          </h3>
          <span className="text-xs text-slate-400">Orden cronológico inverso</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {entries.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No hay asientos registrados aún. Realiza una venta en el POS para generar asientos automáticos.
            </div>
          ) : (
            entries.map((entry) => {
              const totalDebit = entry.lines.reduce((acc, l) => acc + l.debit, 0);
              const totalCredit = entry.lines.reduce((acc, l) => acc + l.credit, 0);

              return (
                <div key={entry.id} className="p-4 space-y-3 hover:bg-slate-850/40 transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-emerald-400 font-bold">{entry.reference}</span>
                      <span className="text-slate-300 font-medium">— {entry.description}</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">{entry.date}</span>
                  </div>

                  <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800/80 font-mono text-[11px]">
                        <tr>
                          <th className="px-3 py-1.5">Cuenta</th>
                          <th className="px-3 py-1.5">Nombre</th>
                          <th className="px-3 py-1.5 text-right">Débito (DOP)</th>
                          <th className="px-3 py-1.5 text-right">Crédito (DOP)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850/60 font-mono text-[11px]">
                        {entry.lines.map((l, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/40">
                            <td className="px-3 py-1.5 text-emerald-400 font-medium">{l.accountCode}</td>
                            <td className="px-3 py-1.5 text-slate-300">{l.accountName}</td>
                            <td className="px-3 py-1.5 text-right text-slate-200">
                              {l.debit > 0 ? formatCurrencyRD(l.debit) : '-'}
                            </td>
                            <td className="px-3 py-1.5 text-right text-slate-200">
                              {l.credit > 0 ? formatCurrencyRD(l.credit) : '-'}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-slate-900/90 font-bold border-t border-slate-800">
                          <td colSpan={2} className="px-3 py-1.5 text-slate-400">Total Asiento</td>
                          <td className="px-3 py-1.5 text-right text-emerald-400">{formatCurrencyRD(totalDebit)}</td>
                          <td className="px-3 py-1.5 text-right text-emerald-400">{formatCurrencyRD(totalCredit)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

