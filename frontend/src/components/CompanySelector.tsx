import React, { useState, useEffect } from 'react';
import { 
  Building2, Plus, ChevronRight
} from 'lucide-react';
import { db } from '../db';
import type { Company } from '../types';

export const CompanySelectorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentCompany: Company;
  onSelectCompany: (company: Company) => void;
}> = ({ isOpen, onClose, currentCompany, onSelectCompany }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newComp, setNewComp] = useState({
    name: '',
    rnc: '',
    address: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    loadCompanies();
  }, [isOpen]);

  async function loadCompanies() {
    const list = await db.companies.toArray();
    setCompanies(list);
  }

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    const created: Company = {
      id: crypto.randomUUID(),
      name: newComp.name,
      rnc: newComp.rnc,
      address: newComp.address,
      phone: newComp.phone,
      email: newComp.email,
      createdAt: new Date().toISOString()
    };

    await db.companies.add(created);

    // Crear automáticamente al Admin para esta nueva empresa
    await db.users.add({
      id: crypto.randomUUID(),
      companyId: created.id,
      username: `admin_${created.rnc.slice(0, 4)}`,
      name: `Administrador (${created.name})`,
      role: 'ADMIN',
      allowedModules: ['pos', 'inventory', 'crm', 'accounting', 'users', 'settings'],
      active: true,
      avatar: '👨‍💼'
    });

    // Crear secuencias NCF iniciales
    await db.ncfSequences.bulkAdd([
      { id: crypto.randomUUID(), companyId: created.id, type: 'B01', prefix: 'B01', current: 0, max: 1000 },
      { id: crypto.randomUUID(), companyId: created.id, type: 'B02', prefix: 'B02', current: 0, max: 5000 },
      { id: crypto.randomUUID(), companyId: created.id, type: 'B14', prefix: 'B14', current: 0, max: 500 },
      { id: crypto.randomUUID(), companyId: created.id, type: 'B15', prefix: 'B15', current: 0, max: 200 }
    ]);

    setShowCreate(false);
    setNewComp({ name: '', rnc: '', address: '', phone: '', email: '' });
    loadCompanies();
    onSelectCompany(created);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-2xl flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-slate-900/95 border border-white/20 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl backdrop-blur-3xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Empresas Registradas</h3>
              <p className="text-[11px] text-white/50">Multi-Empresa: cambia de empresa o registra una nueva</p>
            </div>
          </div>

          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-semibold transition"
          >
            <Plus className="h-3.5 w-3.5" /> Nueva Empresa
          </button>
        </div>

        {showCreate ? (
          <form onSubmit={handleCreateCompany} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3 text-xs">
            <h4 className="font-bold text-white text-xs">Datos de la Nueva Empresa / Sucursal</h4>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="col-span-2">
                <label className="text-white/60">Nombre Comercial o Razón Social</label>
                <input
                  required
                  type="text"
                  placeholder="Ej. Distribuidora Nacional SRL"
                  value={newComp.name}
                  onChange={(e) => setNewComp({ ...newComp, name: e.target.value })}
                  className="w-full mt-1 bg-white/10 border border-white/15 rounded-xl p-2 text-white"
                />
              </div>
              <div>
                <label className="text-white/60">RNC (DGII)</label>
                <input
                  required
                  type="text"
                  placeholder="101-00000-0"
                  value={newComp.rnc}
                  onChange={(e) => setNewComp({ ...newComp, rnc: e.target.value })}
                  className="w-full mt-1 bg-white/10 border border-white/15 rounded-xl p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-white/60">Teléfono</label>
                <input
                  type="text"
                  placeholder="809-555-0000"
                  value={newComp.phone}
                  onChange={(e) => setNewComp({ ...newComp, phone: e.target.value })}
                  className="w-full mt-1 bg-white/10 border border-white/15 rounded-xl p-2 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="flex-1 py-2 bg-white/10 text-white rounded-xl font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl"
              >
                Guardar Empresa
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {companies.map((c) => {
              const isSelected = c.id === currentCompany.id;
              return (
                <div
                  key={c.id}
                  onClick={() => { onSelectCompany(c); onClose(); }}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all duration-200 ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{c.name}</span>
                      {isSelected && (
                        <span className="text-[10px] bg-sky-400/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
                          En uso
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/50 font-mono">
                      <span>RNC: {c.rnc}</span>
                      {c.phone && <span>• Tel: {c.phone}</span>}
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4 text-white/40" />
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
