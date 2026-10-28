import React, { useState, useEffect } from 'react';
import { Building2, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { db } from '../db';
import type { Company, User as UserType } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: UserType, company: Company) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    const list = await db.companies.toArray();
    setCompanies(list);
    if (list.length > 0) {
      setSelectedCompanyId(list[0].id);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const targetCompany = companies.find(c => c.id === selectedCompanyId);
      if (!targetCompany) {
        setErrorMsg('Selecciona una empresa válida.');
        setIsLoading(false);
        return;
      }

      // Buscar usuario perteneciente estrictamente a la empresa seleccionada
      const foundUser = await db.users
        .where('companyId')
        .equals(selectedCompanyId)
        .and(u => u.username.toLowerCase() === username.toLowerCase().trim())
        .first();

      if (!foundUser) {
        setErrorMsg(`El usuario "@${username}" no existe en ${targetCompany.name}.`);
        setIsLoading(false);
        return;
      }

      if (!foundUser.active) {
        setErrorMsg('Esta cuenta de usuario ha sido desactivada por el administrador.');
        setIsLoading(false);
        return;
      }

      // Validar contraseña (por defecto '123' si no se especifica)
      const expectedPassword = foundUser.password || '123';
      if (password !== expectedPassword) {
        setErrorMsg('Contraseña incorrecta.');
        setIsLoading(false);
        return;
      }

      // Login exitoso
      onLoginSuccess(foundUser, targetCompany);
    } catch (err) {
      setErrorMsg('Error al conectar con la base de datos local.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center p-6 text-slate-100 select-none overflow-hidden relative">
      {/* Barra superior estética macOS */}
      <div className="w-full flex justify-between items-center text-xs text-white/60">
        <span className="font-bold flex items-center gap-1.5 text-white">
          <span className="text-sm"></span> Orix ERP/CRM • República Dominicana
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Base de Datos Local Lista</span>
        </div>
      </div>

      {/* Tarjeta Glassmorphism de Inicio de Sesión */}
      <div className="w-full max-w-md bg-slate-900/75 border border-white/20 rounded-3xl p-8 backdrop-blur-3xl shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-300">
        {/* Encabezado */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-sky-500/25 mb-3">
            <ShieldCheck className="h-9 w-9 stroke-[1.8]" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Orix ERP / CRM</h2>
          <p className="text-xs text-white/50">Inicio de Sesión Seguro por Empresa (DGII)</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-2xl flex items-center gap-2.5 text-rose-300 text-xs animate-shake">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {/* Selector de Empresa */}
          <div>
            <label className="text-white/70 font-semibold block mb-1.5 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-sky-400" /> Empresa a la que perteneces:
            </label>
            <select
              value={selectedCompanyId}
              onChange={(e) => { setSelectedCompanyId(e.target.value); setErrorMsg(''); }}
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/15 rounded-2xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-400/50 backdrop-blur-md text-xs font-medium cursor-pointer"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.name} (RNC: {c.rnc})
                </option>
              ))}
            </select>
            {selectedCompany && (
              <p className="text-[10px] text-white/40 mt-1 font-mono">
                RNC Fiscal: {selectedCompany.rnc}
              </p>
            )}
          </div>

          {/* Nombre de Usuario */}
          <div>
            <label className="text-white/70 font-semibold block mb-1.5 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-sky-400" /> Usuario:
            </label>
            <input
              required
              type="text"
              placeholder="Ej. admin, cajera1, contador1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/15 rounded-2xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-400/50 backdrop-blur-md text-xs font-mono placeholder-white/30"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="text-white/70 font-semibold block mb-1.5 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-sky-400" /> Contraseña:
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/15 rounded-2xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-400/50 backdrop-blur-md text-xs font-mono placeholder-white/30"
            />
          </div>

          {/* Botón de Entrada */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 active:scale-[0.98] text-white font-bold rounded-2xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 text-xs uppercase tracking-wider disabled:opacity-50"
          >
            <span>{isLoading ? 'Verificando...' : 'Acceder al Sistema'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Acceso Rápido de Demostración */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <p className="text-[10px] uppercase font-bold text-white/40 text-center tracking-wider">
            Usuarios de Prueba (Contraseña: 123)
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => { setUsername('admin'); setPassword('123'); }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-white/70 text-center transition"
            >
              👑 Admin (Todo)
            </button>
            <button
              type="button"
              onClick={() => { setUsername('cajera1'); setPassword('123'); }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-white/70 text-center transition"
            >
              🛒 Cajera (Solo POS)
            </button>
            <button
              type="button"
              onClick={() => { setUsername('almacen1'); setPassword('123'); }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-white/70 text-center transition"
            >
              📦 Almacén
            </button>
          </div>
        </div>
      </div>

      {/* Pie de pantalla */}
      <div className="text-center text-[11px] text-white/40">
        Orix ERP/CRM v1.0 • Aislamiento Empresarial Estricto & NCF DGII
      </div>
    </div>
  );
};
