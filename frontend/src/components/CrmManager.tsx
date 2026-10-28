import React, { useState, useEffect } from 'react';
import { Users, Plus, Phone, Mail, MapPin } from 'lucide-react';
import { db } from '../db';
import type { Customer, NcfType } from '../types';
import { formatCurrencyRD } from '../utils/fiscal';

interface CrmManagerProps {
  currentCompanyId?: string;
}

export const CrmManager: React.FC<CrmManagerProps> = ({ currentCompanyId = 'comp-01' }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCust, setNewCust] = useState({
    name: '',
    rncOrCedula: '',
    phone: '',
    email: '',
    address: '',
    creditLimit: 0,
    ncfPreference: 'B02' as NcfType
  });

  useEffect(() => {
    loadCustomers();
  }, [currentCompanyId]);

  async function loadCustomers() {
    const list = await db.customers.where('companyId').equals(currentCompanyId).toArray();
    setCustomers(list);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.customers.add({
      id: crypto.randomUUID(),
      companyId: currentCompanyId,
      currentBalance: 0,
      ...newCust
    });
    setShowModal(false);
    setNewCust({
      name: '',
      rncOrCedula: '',
      phone: '',
      email: '',
      address: '',
      creditLimit: 0,
      ncfPreference: 'B02'
    });
    loadCustomers();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-emerald-400" />
            CRM & Cartera de Clientes (RD)
          </h2>
          <p className="text-xs text-slate-400 mt-1">Gestión de RNC/Cédula, límite de crédito y cuentas por cobrar (CxC)</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20"
        >
          <Plus className="h-4 w-4" /> Registrar Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm hover:border-slate-700 transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-white text-base">{c.name}</h3>
                <span className="font-mono text-xs text-emerald-400">RNC: {c.rncOrCedula}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-slate-300">
                {c.ncfPreference}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              {c.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-500" />
                  <span>{c.phone}</span>
                </div>
              )}
              {c.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-500" />
                  <span className="truncate">{c.email}</span>
                </div>
              )}
              {c.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span className="truncate">{c.address}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-xs">
              <div>
                <span className="text-[11px] text-slate-500">Límite Crédito</span>
                <p className="font-mono font-semibold text-slate-300">{formatCurrencyRD(c.creditLimit)}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500">Saldo Pendiente (CxC)</span>
                <p className={`font-mono font-bold ${c.currentBalance > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {formatCurrencyRD(c.currentBalance)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Nuevo Cliente Comercial</h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="text-slate-400 font-medium">Nombre Completo o Razón Social</label>
                <input
                  required
                  type="text"
                  placeholder="Empresa o Persona"
                  value={newCust.name}
                  onChange={(e) => setNewCust({ ...newCust, name: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium">RNC o Cédula (DGII)</label>
                <input
                  required
                  type="text"
                  placeholder="131-89472-1"
                  value={newCust.rncOrCedula}
                  onChange={(e) => setNewCust({ ...newCust, rncOrCedula: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium">NCF Preferido</label>
                <select
                  value={newCust.ncfPreference}
                  onChange={(e) => setNewCust({ ...newCust, ncfPreference: e.target.value as NcfType })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                >
                  <option value="B01">B01 - Crédito Fiscal</option>
                  <option value="B02">B02 - Consumidor Final</option>
                  <option value="B14">B14 - Regímenes Especiales</option>
                  <option value="B15">B15 - Gubernamental</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-medium">Teléfono</label>
                <input
                  type="text"
                  placeholder="809-555-0000"
                  value={newCust.phone}
                  onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium">Límite de Crédito (DOP)</label>
                <input
                  type="number"
                  min="0"
                  value={newCust.creditLimit}
                  onChange={(e) => setNewCust({ ...newCust, creditLimit: parseFloat(e.target.value) || 0 })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="col-span-2">
                <label className="text-slate-400 font-medium">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="facturacion@empresa.com"
                  value={newCust.email}
                  onChange={(e) => setNewCust({ ...newCust, email: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="col-span-2">
                <label className="text-slate-400 font-medium">Dirección</label>
                <input
                  type="text"
                  placeholder="Calle, Sector, Ciudad"
                  value={newCust.address}
                  onChange={(e) => setNewCust({ ...newCust, address: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-sm font-bold transition"
              >
                Guardar Cliente
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
