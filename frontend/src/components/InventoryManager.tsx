import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, AlertCircle } from 'lucide-react';
import { db } from '../db';
import type { Product } from '../types';
import { formatCurrencyRD } from '../utils/fiscal';

interface InventoryManagerProps {
  currentCompanyId?: string;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({ currentCompanyId = 'comp-01' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    code: '',
    name: '',
    category: 'General',
    price: 0,
    cost: 0,
    stock: 0,
    minStock: 5,
    taxRate: 0.18,
    unit: 'UND',
    barcode: ''
  });

  useEffect(() => {
    loadProducts();
  }, [currentCompanyId]);

  async function loadProducts() {
    const list = await db.products.where('companyId').equals(currentCompanyId).toArray();
    setProducts(list);
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.products.add({
      id: crypto.randomUUID(),
      companyId: currentCompanyId,
      ...newProduct
    });
    setShowAddModal(false);
    setNewProduct({
      code: '',
      name: '',
      category: 'General',
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 5,
      taxRate: 0.18,
      unit: 'UND',
      barcode: ''
    });
    loadProducts();
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.code.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Package className="h-6 w-6 text-emerald-400" />
            Catálogo & Control de Inventario
          </h2>
          <p className="text-xs text-slate-400 mt-1">Gestión de stock, precios, ITBIS y costo promedio</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20"
        >
          <Plus className="h-4 w-4" /> Nuevo Producto / Servicio
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por código, nombre o categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-500"
            />
          </div>
          <span className="text-xs text-slate-400">Total: <strong className="text-white">{filtered.length}</strong> artículos</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3 text-right">Costo (DOP)</th>
                <th className="px-4 py-3 text-right">Precio Venta (DOP)</th>
                <th className="px-4 py-3 text-center">ITBIS</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-850/50 transition">
                  <td className="px-4 py-3 font-mono font-medium text-emerald-400">{p.code}</td>
                  <td className="px-4 py-3 font-semibold text-slate-200">{p.name}</td>
                  <td className="px-4 py-3 text-slate-400">{p.category}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-400">{formatCurrencyRD(p.cost)}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-slate-100">{formatCurrencyRD(p.price)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      p.taxRate > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {p.taxRate * 100}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-white">{p.stock}</td>
                  <td className="px-4 py-3 text-center">
                    {p.stock <= p.minStock ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <AlertCircle className="h-3 w-3" /> Bajo Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Óptimo
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Agregar Producto */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Nuevo Artículo en Catálogo</h3>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-medium">Código</label>
                <input
                  required
                  type="text"
                  placeholder="PROD-004"
                  value={newProduct.code}
                  onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium">Categoría</label>
                <input
                  required
                  type="text"
                  placeholder="Abarrotes"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="col-span-2">
                <label className="text-slate-400 font-medium">Descripción del Producto / Servicio</label>
                <input
                  required
                  type="text"
                  placeholder="Nombre comercial"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium">Costo de Compra (DOP)</label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={newProduct.cost}
                  onChange={(e) => setNewProduct({ ...newProduct, cost: parseFloat(e.target.value) || 0 })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium">Precio de Venta (DOP)</label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 font-medium">Tasa de ITBIS (DGII)</label>
                <select
                  value={newProduct.taxRate}
                  onChange={(e) => setNewProduct({ ...newProduct, taxRate: parseFloat(e.target.value) })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                >
                  <option value={0.18}>18% - ITBIS Estándar</option>
                  <option value={0.16}>16% - Tasa Reducida</option>
                  <option value={0}>0% - Exento</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-medium">Stock Inicial</label>
                <input
                  type="number"
                  min="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl text-sm font-bold transition"
              >
                Guardar Artículo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
