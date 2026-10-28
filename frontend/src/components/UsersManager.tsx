import React, { useState, useEffect } from 'react';
import { 
  UserPlus, Shield, Check, X
} from 'lucide-react';
import { db } from '../db';
import type { User, Company, ModuleKey } from '../types';

interface UsersManagerProps {
  currentCompany: Company;
  currentUser: User;
  onUserUpdated?: () => void;
}

const AVAILABLE_MODULES: { key: ModuleKey; label: string; icon: string; desc: string }[] = [
  { key: 'pos', label: 'Punto de Venta / NCF', icon: '🛒', desc: 'Emisión de facturas fiscales y tickets' },
  { key: 'inventory', label: 'Catálogo & Inventario', icon: '📦', desc: 'Crear productos, costos, precios y stock' },
  { key: 'crm', label: 'CRM & Clientes', icon: '👥', desc: 'Directorio, RNC, créditos y cuentas por cobrar' },
  { key: 'accounting', label: 'Contabilidad General', icon: '📖', desc: 'Libro diario, catálogo de cuentas y balances' },
  { key: 'users', label: 'Gestión de Usuarios', icon: '🛡️', desc: 'Crear usuarios y asignar permisos' },
  { key: 'settings', label: 'Configuración Fiscal', icon: '⚙️', desc: 'Secuencias NCF y datos de la empresa' }
];

export const UsersManager: React.FC<UsersManagerProps> = ({ currentCompany, currentUser, onUserUpdated }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    role: 'CASHIER' as User['role'],
    allowedModules: ['pos'] as ModuleKey[],
    avatar: '👤'
  });

  useEffect(() => {
    loadUsers();
  }, [currentCompany.id]);

  async function loadUsers() {
    const list = await db.users.where('companyId').equals(currentCompany.id).toArray();
    setUsers(list);
  }

  const toggleModulePermission = (modKey: ModuleKey) => {
    if (formData.allowedModules.includes(modKey)) {
      setFormData({
        ...formData,
        allowedModules: formData.allowedModules.filter(m => m !== modKey)
      });
    } else {
      setFormData({
        ...formData,
        allowedModules: [...formData.allowedModules, modKey]
      });
    }
  };

  const handlePresetRole = (role: User['role']) => {
    let mods: ModuleKey[] = [];
    if (role === 'ADMIN') {
      mods = ['pos', 'inventory', 'crm', 'accounting', 'users', 'settings'];
    } else if (role === 'CASHIER') {
      mods = ['pos'];
    } else if (role === 'INVENTORY_MANAGER') {
      mods = ['inventory'];
    } else if (role === 'ACCOUNTANT') {
      mods = ['accounting', 'crm'];
    }
    setFormData({
      ...formData,
      role,
      allowedModules: mods
    });
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      await db.users.update(editingUser.id, {
        name: formData.name,
        role: formData.role,
        allowedModules: formData.allowedModules,
        avatar: formData.avatar
      });
    } else {
      await db.users.add({
        id: crypto.randomUUID(),
        companyId: currentCompany.id,
        username: formData.username.toLowerCase().trim(),
        name: formData.name,
        role: formData.role,
        allowedModules: formData.allowedModules,
        active: true,
        avatar: formData.avatar
      });
    }

    setShowAddModal(false);
    setEditingUser(null);
    setFormData({
      username: '',
      name: '',
      role: 'CASHIER',
      allowedModules: ['pos'],
      avatar: '👤'
    });
    loadUsers();
    if (onUserUpdated) onUserUpdated();
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      role: user.role,
      allowedModules: [...user.allowedModules],
      avatar: user.avatar || '👤'
    });
    setShowAddModal(true);
  };

  const toggleUserActive = async (userId: string, currentActive: boolean) => {
    if (userId === currentUser.id) {
      alert('No puedes desactivar tu propia cuenta activa.');
      return;
    }
    await db.users.update(userId, { active: !currentActive });
    loadUsers();
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-sky-400" />
            <h2 className="text-xl font-bold text-white">Gestión de Usuarios y Permisos</h2>
          </div>
          <p className="text-xs text-white/50 mt-1">
            Empresa: <strong className="text-sky-300">{currentCompany.name}</strong> • Define qué módulos puede ver cada colaborador
          </p>
        </div>

        <button
          onClick={() => {
            setEditingUser(null);
            setFormData({
              username: '',
              name: '',
              role: 'CASHIER',
              allowedModules: ['pos'],
              avatar: '👤'
            });
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-bold rounded-2xl text-xs transition shadow-lg shadow-sky-500/20 active:scale-95"
        >
          <UserPlus className="h-4 w-4" /> Crear Usuario
        </button>
      </div>

      {/* Grid de Usuarios de la Empresa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto flex-1 pr-1">
        {users.map((u) => {
          const isCurrentUser = u.id === currentUser.id;
          return (
            <div
              key={u.id}
              className={`relative bg-white/5 border rounded-3xl p-5 flex flex-col justify-between backdrop-blur-2xl transition duration-300 hover:shadow-xl ${
                isCurrentUser 
                  ? 'border-sky-400/40 bg-sky-500/5 shadow-sky-500/10' 
                  : 'border-white/10 hover:border-white/25'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-2xl shadow-inner">
                      {u.avatar || '👤'}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                        {u.name}
                        {isCurrentUser && (
                          <span className="text-[10px] font-mono bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded border border-sky-400/30">
                            Tú
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] font-mono text-white/50">@{u.username}</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    u.role === 'ADMIN'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-white/10 text-white/70 border border-white/10'
                  }`}>
                    {u.role}
                  </span>
                </div>

                {/* Módulos Permitidos */}
                <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-white/40 block">
                    Módulos autorizados ({u.allowedModules.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_MODULES.map((m) => {
                      const hasAccess = u.allowedModules.includes(m.key);
                      return (
                        <span
                          key={m.key}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium transition ${
                            hasAccess
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : 'bg-white/5 text-white/20 border border-white/5 line-through opacity-40'
                          }`}
                        >
                          <span>{m.icon}</span>
                          <span>{m.label}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <button
                  onClick={() => openEdit(u)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition border border-white/10"
                >
                  Editar Permisos
                </button>

                {!isCurrentUser && (
                  <button
                    onClick={() => toggleUserActive(u.id, u.active)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      u.active 
                        ? 'text-rose-400 hover:bg-rose-500/10' 
                        : 'text-emerald-400 hover:bg-emerald-500/10'
                    }`}
                  >
                    {u.active ? 'Desactivar' : 'Activar'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Crear / Editar Permisos */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-2xl flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
          <form onSubmit={handleCreateOrUpdate} className="bg-slate-900/95 border border-white/20 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl backdrop-blur-3xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingUser ? `Editar Permisos: ${editingUser.name}` : 'Crear Nuevo Usuario'}
                </h3>
                <p className="text-[11px] text-white/50">Asignar accesos modulares para {currentCompany.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-xl hover:bg-white/10 text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-white/60 font-medium">Nombre Completo</label>
                <input
                  required
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 bg-white/10 border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                />
              </div>

              <div>
                <label className="text-white/60 font-medium">Nombre de Usuario (Login)</label>
                <input
                  required
                  disabled={!!editingUser}
                  type="text"
                  placeholder="jperez"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full mt-1 bg-white/10 border border-white/15 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:opacity-50"
                />
              </div>

              {/* Roles predefinidos rápidos */}
              <div className="col-span-2">
                <label className="text-white/60 font-medium block mb-1">Plantilla de Rol Rápida</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['ADMIN', 'CASHIER', 'INVENTORY_MANAGER', 'ACCOUNTANT'] as User['role'][]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handlePresetRole(r)}
                      className={`p-2 rounded-xl border text-[11px] font-semibold transition ${
                        formData.role === r
                          ? 'bg-sky-500/30 border-sky-400 text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {r === 'ADMIN' && 'Administrador'}
                      {r === 'CASHIER' && 'Cajero POS'}
                      {r === 'INVENTORY_MANAGER' && 'Almacén'}
                      {r === 'ACCOUNTANT' && 'Contador'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector individual de módulos (Acceso Granular) */}
              <div className="col-span-2 space-y-2 pt-2">
                <label className="text-white/80 font-bold block text-xs">
                  Módulos Habilitados para este Usuario:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {AVAILABLE_MODULES.map((mod) => {
                    const isChecked = formData.allowedModules.includes(mod.key);
                    return (
                      <div
                        key={mod.key}
                        onClick={() => toggleModulePermission(mod.key)}
                        className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all select-none ${
                          isChecked
                            ? 'bg-sky-500/15 border-sky-400/50 text-white shadow-sm'
                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{mod.icon}</span>
                          <div>
                            <p className="font-semibold text-xs leading-none text-white">{mod.label}</p>
                            <p className="text-[10px] text-white/40 mt-0.5">{mod.desc}</p>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition ${
                          isChecked ? 'bg-sky-500 border-sky-400 text-white' : 'border-white/20'
                        }`}>
                          {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition border border-white/10"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-sky-500/25"
              >
                {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
