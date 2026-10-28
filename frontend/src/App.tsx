import { useState, useEffect } from 'react';
import { 
  ShoppingCart, Package, BookOpen, Users, 
  Wifi, Sliders, ShieldCheck, Battery, Sparkles,
  Building2, ChevronDown, Lock
} from 'lucide-react';
import { PosTerminal } from './components/PosTerminal';
import { InventoryManager } from './components/InventoryManager';
import { AccountingViewer } from './components/AccountingViewer';
import { CrmManager } from './components/CrmManager';
import { UsersManager } from './components/UsersManager';
import { CompanySelectorModal } from './components/CompanySelector';
import { initMultiTenantData, db } from './db';
import type { Company, User, ModuleKey } from './types';
import { formatCurrencyRD } from './utils/fiscal';

export function App() {
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<ModuleKey>('pos');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [totalSales, setTotalSales] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    initMultiTenantData().then(() => {
      loadInitialContext();
    });

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  async function loadInitialContext() {
    const comps = await db.companies.toArray();
    if (comps.length > 0) {
      const selectedComp = comps[0];
      setCurrentCompany(selectedComp);
      await loadUsersForCompany(selectedComp.id);
    }
  }

  async function loadUsersForCompany(companyId: string) {
    const users = await db.users.where('companyId').equals(companyId).toArray();
    setCompanyUsers(users);
    if (users.length > 0) {
      // Por defecto entra como el Admin de la empresa
      const admin = users.find(u => u.role === 'ADMIN') || users[0];
      switchUser(admin);
    }
    refreshStats(companyId);
  }

  function switchUser(user: User) {
    setCurrentUser(user);
    setShowUserDropdown(false);
    // Si la pestaña actual no está permitida para este usuario, cámbialo a la primera que tenga
    if (!user.allowedModules.includes(activeTab)) {
      if (user.allowedModules.length > 0) {
        setActiveTab(user.allowedModules[0]);
      }
    }
  }

  async function refreshStats(compId?: string) {
    const cId = compId || currentCompany?.id;
    if (!cId) return;
    const invs = await db.invoices.where('companyId').equals(cId).toArray();
    const sum = invs.reduce((acc, curr) => acc + curr.total, 0);
    setTotalSales(sum);
  }

  const handleSelectCompany = (comp: Company) => {
    setCurrentCompany(comp);
    loadUsersForCompany(comp.id);
  };

  const timeFormatted = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateFormatted = currentTime.toLocaleDateString('es-DO', { weekday: 'short', month: 'short', day: 'numeric' });

  if (!currentCompany || !currentUser) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-slate-950 font-sans">
        <div className="flex items-center gap-3 animate-pulse">
          <Sparkles className="h-6 w-6 text-sky-400" />
          <span>Cargando entorno empresarial multi-tenant...</span>
        </div>
      </div>
    );
  }

  const hasAccess = (mod: ModuleKey) => currentUser.allowedModules.includes(mod);

  return (
    <div className="flex flex-col h-screen overflow-hidden text-slate-100 select-none">
      {/* 1. Barra de Menú Superior Estilo macOS */}
      <header className="h-8 bg-black/40 backdrop-blur-2xl border-b border-white/10 px-4 flex items-center justify-between text-[11px] font-medium text-white/90 z-50">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-tight text-white flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition">
            <span className="text-sm"></span> ERP RD
          </span>

          {/* Selector de Empresa Activa */}
          <button
            onClick={() => setShowCompanyModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition font-medium"
          >
            <Building2 className="h-3 w-3 text-sky-400" />
            <span>{currentCompany.name}</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>
        </div>

        <div className="flex items-center gap-3.5 text-white/80">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px]">
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
            <span>{isOnline ? 'Cloud Sync' : 'Offline POS'}</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">{formatCurrencyRD(totalSales)}</span>
          <Wifi className="h-3.5 w-3.5" />
          <Battery className="h-3.5 w-3.5" />
          <Sliders className="h-3.5 w-3.5" />
          <span className="text-white font-medium">{dateFormatted} {timeFormatted}</span>

          {/* Menú de Usuario Actual */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-1.5 pl-2 py-0.5 rounded-lg hover:bg-white/10 transition"
            >
              <span className="text-base">{currentUser.avatar || '👤'}</span>
              <span className="font-semibold text-white">{currentUser.name.split(' ')[0]}</span>
              <span className="text-[9px] font-mono bg-sky-500/20 text-sky-300 px-1 rounded">
                {currentUser.role}
              </span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-3xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2.5 border-b border-white/10">
                  <p className="font-bold text-xs text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-white/50 font-mono">@{currentUser.username} • {currentCompany.name}</p>
                </div>

                <div className="py-1">
                  <p className="text-[10px] uppercase font-bold text-white/40 px-2 py-1">Cambiar Usuario de esta Empresa:</p>
                  {companyUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => switchUser(u)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition ${
                        u.id === currentUser.id 
                          ? 'bg-sky-500/20 text-white font-semibold' 
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{u.avatar || '👤'}</span>
                        <span className="truncate">{u.name}</span>
                      </div>
                      <span className="text-[9px] font-mono opacity-60">{u.role}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. Área de Trabajo con Ventana Estilo macOS */}
      <div className="flex-1 p-4 md:p-6 flex items-center justify-center overflow-hidden pb-24">
        <div className="w-full max-w-[1560px] h-full mac-window-dark rounded-3xl flex overflow-hidden shadow-2xl relative border border-white/15">
          {/* Barra Lateral Izquierda */}
          <aside className="w-60 mac-sidebar-dark flex flex-col justify-between p-4 shrink-0">
            <div className="space-y-6">
              {/* Semáforo de ventana */}
              <div className="flex items-center gap-2 pl-1 pt-1">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:opacity-80 transition" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:opacity-80 transition" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:opacity-80 transition" />
                <span className="ml-3 text-[11px] font-semibold text-white/50 tracking-wider uppercase font-mono">
                  {currentCompany.rnc}
                </span>
              </div>

              {/* Módulos Disponibles con Validación de Permisos */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase px-2.5">Módulos Asignados</span>
                  <nav className="mt-2 space-y-1">
                    {/* POS */}
                    {hasAccess('pos') ? (
                      <button
                        onClick={() => { setActiveTab('pos'); refreshStats(); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                          activeTab === 'pos'
                            ? 'bg-white/20 text-white font-semibold shadow-sm border border-white/20 backdrop-blur-md'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4 text-sky-400" />
                        <span>Punto de Venta / NCF</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between px-3 py-2 text-white/25 text-xs">
                        <span className="flex items-center gap-2.5 line-through">
                          <ShoppingCart className="h-4 w-4 opacity-30" />
                          <span>Punto de Venta</span>
                        </span>
                        <Lock className="h-3 w-3 opacity-30" />
                      </div>
                    )}

                    {/* Inventario */}
                    {hasAccess('inventory') ? (
                      <button
                        onClick={() => { setActiveTab('inventory'); refreshStats(); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                          activeTab === 'inventory'
                            ? 'bg-white/20 text-white font-semibold shadow-sm border border-white/20 backdrop-blur-md'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Package className="h-4 w-4 text-emerald-400" />
                        <span>Catálogo & Stock</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between px-3 py-2 text-white/25 text-xs">
                        <span className="flex items-center gap-2.5 line-through">
                          <Package className="h-4 w-4 opacity-30" />
                          <span>Catálogo & Stock</span>
                        </span>
                        <Lock className="h-3 w-3 opacity-30" />
                      </div>
                    )}

                    {/* CRM */}
                    {hasAccess('crm') ? (
                      <button
                        onClick={() => { setActiveTab('crm'); refreshStats(); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                          activeTab === 'crm'
                            ? 'bg-white/20 text-white font-semibold shadow-sm border border-white/20 backdrop-blur-md'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Users className="h-4 w-4 text-purple-400" />
                        <span>Clientes & CRM</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between px-3 py-2 text-white/25 text-xs">
                        <span className="flex items-center gap-2.5 line-through">
                          <Users className="h-4 w-4 opacity-30" />
                          <span>Clientes & CRM</span>
                        </span>
                        <Lock className="h-3 w-3 opacity-30" />
                      </div>
                    )}

                    {/* Contabilidad */}
                    {hasAccess('accounting') ? (
                      <button
                        onClick={() => { setActiveTab('accounting'); refreshStats(); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                          activeTab === 'accounting'
                            ? 'bg-white/20 text-white font-semibold shadow-sm border border-white/20 backdrop-blur-md'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <BookOpen className="h-4 w-4 text-amber-400" />
                        <span>Contabilidad Diario</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between px-3 py-2 text-white/25 text-xs">
                        <span className="flex items-center gap-2.5 line-through">
                          <BookOpen className="h-4 w-4 opacity-30" />
                          <span>Contabilidad Diario</span>
                        </span>
                        <Lock className="h-3 w-3 opacity-30" />
                      </div>
                    )}

                    {/* Gestión de Usuarios (Solo Admin o con permiso 'users') */}
                    {hasAccess('users') && (
                      <button
                        onClick={() => { setActiveTab('users'); refreshStats(); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                          activeTab === 'users'
                            ? 'bg-white/20 text-white font-semibold shadow-sm border border-white/20 backdrop-blur-md'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <ShieldCheck className="h-4 w-4 text-sky-400" />
                        <span>Gestión de Usuarios</span>
                      </button>
                    )}
                  </nav>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase px-2.5">Empresa Activa</span>
                  <div className="mt-2 space-y-1.5 px-2 text-[11px] text-white/60">
                    <p className="font-semibold text-white line-clamp-1">{currentCompany.name}</p>
                    <div className="flex justify-between py-1 border-b border-white/5 font-mono">
                      <span>RNC:</span>
                      <strong className="text-sky-300">{currentCompany.rnc}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Rol Activo:</span>
                      <strong className="text-emerald-400 font-mono">{currentUser.role}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie del Sidebar */}
            <div className="pt-3 border-t border-white/10 text-[10px] text-white/40 flex items-center justify-between">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="h-3 w-3" /> Multi-Empresa RD
              </span>
              <span>macOS Edition</span>
            </div>
          </aside>

          {/* Área Principal */}
          <main className="flex-1 flex flex-col h-full overflow-hidden bg-black/20">
            {/* Cabecera */}
            <div className="h-14 border-b border-white/10 px-6 flex items-center justify-between backdrop-blur-md bg-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-bold text-white tracking-tight">
                  {activeTab === 'pos' && 'Punto de Venta / Emisión Fiscal NCF (Estilo Mónica)'}
                  {activeTab === 'inventory' && 'Control de Stock & Catálogo de Artículos (Estilo Odoo)'}
                  {activeTab === 'crm' && 'Directorio de Clientes, Cédula/RNC y Cuentas por Cobrar'}
                  {activeTab === 'accounting' && 'Libro Diario de Contabilidad por Partida Doble'}
                  {activeTab === 'users' && `Administración de Usuarios y Permisos — ${currentCompany.name}`}
                </h2>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={() => setShowCompanyModal(true)}
                  className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-[11px] transition flex items-center gap-1.5"
                >
                  <Building2 className="h-3.5 w-3.5 text-sky-400" />
                  Cambiar Empresa
                </button>
              </div>
            </div>

            {/* Renderizado del Módulo si el Usuario tiene Permiso */}
            <div className="flex-1 overflow-y-auto p-5">
              {hasAccess(activeTab) ? (
                <>
                  {activeTab === 'pos' && <PosTerminal currentCompanyId={currentCompany.id} />}
                  {activeTab === 'inventory' && <InventoryManager currentCompanyId={currentCompany.id} />}
                  {activeTab === 'accounting' && <AccountingViewer currentCompanyId={currentCompany.id} />}
                  {activeTab === 'crm' && <CrmManager currentCompanyId={currentCompany.id} />}
                  {activeTab === 'users' && (
                    <UsersManager 
                      currentCompany={currentCompany} 
                      currentUser={currentUser}
                      onUserUpdated={() => loadUsersForCompany(currentCompany.id)}
                    />
                  )}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-xl">
                    <Lock className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Acceso Denegado</h3>
                  <p className="text-xs text-white/50 max-w-sm">
                    El usuario <strong>{currentUser.name}</strong> no tiene permisos otorgados por el administrador para acceder al módulo de <strong>{activeTab.toUpperCase()}</strong>.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* 3. Dock Inferior Flotante Estilo macOS */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
        <div className="mac-dock px-4 py-2.5 rounded-3xl flex items-center gap-3 shadow-2xl backdrop-blur-3xl border border-white/25">
          {hasAccess('pos') && (
            <button
              onClick={() => { setActiveTab('pos'); refreshStats(); }}
              title="Punto de Venta"
              className={`p-2.5 rounded-2xl transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 relative group ${
                activeTab === 'pos' ? 'bg-sky-500/30 border border-sky-400/50 shadow-lg shadow-sky-500/30' : 'hover:bg-white/15'
              }`}
            >
              <ShoppingCart className="h-6 w-6 text-sky-300" />
              {activeTab === 'pos' && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-sm" />}
            </button>
          )}

          {hasAccess('inventory') && (
            <button
              onClick={() => { setActiveTab('inventory'); refreshStats(); }}
              title="Inventario"
              className={`p-2.5 rounded-2xl transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 relative group ${
                activeTab === 'inventory' ? 'bg-emerald-500/30 border border-emerald-400/50 shadow-lg shadow-emerald-500/30' : 'hover:bg-white/15'
              }`}
            >
              <Package className="h-6 w-6 text-emerald-300" />
              {activeTab === 'inventory' && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-sm" />}
            </button>
          )}

          {hasAccess('crm') && (
            <button
              onClick={() => { setActiveTab('crm'); refreshStats(); }}
              title="Clientes"
              className={`p-2.5 rounded-2xl transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 relative group ${
                activeTab === 'crm' ? 'bg-purple-500/30 border border-purple-400/50 shadow-lg shadow-purple-500/30' : 'hover:bg-white/15'
              }`}
            >
              <Users className="h-6 w-6 text-purple-300" />
              {activeTab === 'crm' && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-sm" />}
            </button>
          )}

          {hasAccess('accounting') && (
            <button
              onClick={() => { setActiveTab('accounting'); refreshStats(); }}
              title="Contabilidad"
              className={`p-2.5 rounded-2xl transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 relative group ${
                activeTab === 'accounting' ? 'bg-amber-500/30 border border-amber-400/50 shadow-lg shadow-amber-500/30' : 'hover:bg-white/15'
              }`}
            >
              <BookOpen className="h-6 w-6 text-amber-300" />
              {activeTab === 'accounting' && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-sm" />}
            </button>
          )}

          {hasAccess('users') && (
            <button
              onClick={() => { setActiveTab('users'); refreshStats(); }}
              title="Usuarios & Permisos"
              className={`p-2.5 rounded-2xl transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 relative group ${
                activeTab === 'users' ? 'bg-sky-500/30 border border-sky-400/50 shadow-lg shadow-sky-500/30' : 'hover:bg-white/15'
              }`}
            >
              <ShieldCheck className="h-6 w-6 text-sky-300" />
              {activeTab === 'users' && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-sm" />}
            </button>
          )}

          <div className="w-[1px] h-6 bg-white/20 mx-1" />

          <button
            onClick={() => setShowCompanyModal(true)}
            title="Cambiar Empresa"
            className="p-2.5 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-125 hover:-translate-y-2 text-white/70 hover:text-white"
          >
            <Building2 className="h-6 w-6 text-indigo-300" />
          </button>
        </div>
      </div>

      {/* Modal Multi-Empresas */}
      <CompanySelectorModal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        currentCompany={currentCompany}
        onSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
