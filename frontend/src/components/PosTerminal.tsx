import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, Banknote, 
  CheckCircle2, Printer, ShieldCheck
} from 'lucide-react';
import { db } from '../db';
import type { Product, Customer, InvoiceItem, NcfType } from '../types';
import { getNextNcf, calculateTotals, formatCurrencyRD } from '../utils/fiscal';

interface PosTerminalProps {
  currentCompanyId?: string;
}

export const PosTerminal: React.FC<PosTerminalProps> = ({ currentCompanyId = 'comp-01' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [ncfType, setNcfType] = useState<NcfType>('B02');
  const [cart, setCart] = useState<InvoiceItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer' | 'credit'>('cash');
  const [lastInvoice, setLastInvoice] = useState<any | null>(null);
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const prods = await db.products.where('companyId').equals(currentCompanyId).toArray();
    const custs = await db.customers.where('companyId').equals(currentCompanyId).toArray();
    setProducts(prods);
    setCustomers(custs);
    if (custs.length > 0) {
      setSelectedCustomer(custs[0]);
      setNcfType(custs[0].ncfPreference || 'B02');
    }
  }

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      (p.barcode && p.barcode.includes(search));
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.productId === product.id);
    if (existing) {
      setCart(cart.map(item => {
        if (item.productId === product.id) {
          const newQty = item.quantity + 1;
          const subtotal = newQty * item.price;
          const taxAmount = subtotal * item.taxRate;
          return {
            ...item,
            quantity: newQty,
            subtotal,
            taxAmount,
            total: subtotal + taxAmount
          };
        }
        return item;
      }));
    } else {
      const subtotal = product.price * 1;
      const taxAmount = subtotal * product.taxRate;
      setCart([
        ...cart,
        {
          productId: product.id,
          code: product.code,
          name: product.name,
          quantity: 1,
          price: product.price,
          taxRate: product.taxRate,
          taxAmount,
          subtotal,
          total: subtotal + taxAmount
        }
      ]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        const subtotal = newQty * item.price;
        const taxAmount = subtotal * item.taxRate;
        return {
          ...item,
          quantity: newQty,
          subtotal,
          taxAmount,
          total: subtotal + taxAmount
        };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const { subtotal, itbisTotal, total } = calculateTotals(cart);

  const handleCheckout = async () => {
    if (cart.length === 0 || !selectedCustomer) return;

    const ncf = await getNextNcf(ncfType);
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    const invoice = {
      id: crypto.randomUUID(),
      companyId: currentCompanyId,
      invoiceNumber,
      ncf,
      ncfType,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerRnc: selectedCustomer.rncOrCedula,
      items: cart,
      subtotal,
      itbisTotal,
      discount: 0,
      total,
      paymentMethod,
      status: 'PAID' as const,
      syncStatus: 'PENDING_SYNC' as const,
      createdAt: new Date().toISOString(),
      cashierName: 'Terminal Caja 01'
    };

    await db.invoices.add(invoice);

    for (const item of cart) {
      const prod = await db.products.get(item.productId);
      if (prod && prod.category !== 'Servicios') {
        await db.products.update(item.productId, {
          stock: Math.max(0, prod.stock - item.quantity)
        });
      }
    }

    await db.accountingEntries.add({
      id: crypto.randomUUID(),
      companyId: currentCompanyId,
      date: new Date().toISOString().split('T')[0],
      reference: `${invoiceNumber} (${ncf})`,
      description: `Venta POS macOS Style - ${selectedCustomer.name}`,
      lines: [
        {
          accountId: paymentMethod === 'cash' ? '1101' : '1102',
          accountCode: paymentMethod === 'cash' ? '1.1.01' : '1.1.02',
          accountName: paymentMethod === 'cash' ? 'Caja General' : 'Banco',
          debit: total,
          credit: 0
        },
        {
          accountId: '4101',
          accountCode: '4.1.01',
          accountName: 'Ingresos por Ventas',
          debit: 0,
          credit: subtotal
        },
        ...(itbisTotal > 0 ? [{
          accountId: '2105',
          accountCode: '2.1.05',
          accountName: 'ITBIS por Pagar a DGII',
          debit: 0,
          credit: itbisTotal
        }] : [])
      ],
      syncStatus: 'PENDING_SYNC'
    });

    setLastInvoice(invoice);
    setSuccessModal(true);
    setCart([]);
    loadData();
  };

  return (
    <div className="grid grid-cols-12 gap-5 h-full">
      {/* Catálogo de Artículos - macOS Grid */}
      <div className="col-span-12 xl:col-span-7 flex flex-col gap-4 h-full">
        {/* Barra de Filtro y Búsqueda Glassmorphism */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Buscar artículo, código de barra o servicio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400/50 backdrop-blur-xl transition duration-200"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-[280px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-white/30 text-white font-semibold shadow-sm border border-white/40 backdrop-blur-md'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Rejilla de Productos con tarjetas Glassmorphism estilo macOS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 overflow-y-auto pr-1 flex-1">
          {filteredProducts.map((p) => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              className="group relative flex flex-col justify-between p-4 bg-white/5 hover:bg-white/12 border border-white/10 hover:border-white/30 rounded-2xl text-left transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-0.5 backdrop-blur-md overflow-hidden"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider text-sky-400 font-bold uppercase bg-sky-400/10 px-2 py-0.5 rounded-md border border-sky-400/20">
                    {p.code}
                  </span>
                  <span className="text-[10px] text-white/50">{p.unit}</span>
                </div>
                <h4 className="font-semibold text-white/95 text-xs line-clamp-2 leading-relaxed group-hover:text-sky-300 transition-colors">
                  {p.name}
                </h4>
              </div>

              <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-white/50">Stock: <strong className="text-white/80">{p.stock}</strong></span>
                <span className="font-bold text-white text-sm font-mono tracking-tight group-hover:scale-105 transition-transform">
                  {formatCurrencyRD(p.price)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Caja Registradora / Terminal POS (Ventana Flotante macOS) */}
      <div className="col-span-12 xl:col-span-5 bg-black/40 border border-white/15 rounded-3xl flex flex-col h-full overflow-hidden shadow-2xl backdrop-blur-3xl">
        {/* Cabecera de la Ventana POS */}
        <div className="p-4 border-b border-white/10 bg-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-sky-500/25">
                <ShoppingCart className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Factura de Venta</h3>
                <p className="text-[10px] text-white/50 font-mono">Secuencia Fiscal DGII</p>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Offline Ready
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-medium text-white/60">Cliente</label>
              <select
                className="w-full mt-1 bg-white/10 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-400/50 backdrop-blur-md"
                value={selectedCustomer?.id || ''}
                onChange={(e) => {
                  const cust = customers.find(c => c.id === e.target.value);
                  if (cust) {
                    setSelectedCustomer(cust);
                    if (cust.ncfPreference) setNcfType(cust.ncfPreference);
                  }
                }}
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-medium text-white/60">Tipo NCF (DGII)</label>
              <select
                className="w-full mt-1 bg-white/10 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-400/50 font-mono backdrop-blur-md"
                value={ncfType}
                onChange={(e) => setNcfType(e.target.value as NcfType)}
              >
                <option value="B02" className="bg-slate-900 text-white">B02 - Consumidor Final</option>
                <option value="B01" className="bg-slate-900 text-white">B01 - Crédito Fiscal</option>
                <option value="B14" className="bg-slate-900 text-white">B14 - Regímenes Esp.</option>
                <option value="B15" className="bg-slate-900 text-white">B15 - Gubernamental</option>
              </select>
            </div>
          </div>
        </div>

        {/* Líneas de Detalle / Carrito */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/40 text-center px-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <ShoppingCart className="h-6 w-6 stroke-1 text-white/30" />
              </div>
              <p className="text-xs font-medium text-white/70">No hay productos en la orden</p>
              <p className="text-[11px] text-white/40 mt-1">Haz clic en los artículos del catálogo para agregarlos al ticket</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.productId} className="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors">
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                  <p className="text-[11px] text-white/50 font-mono mt-0.5">
                    {formatCurrencyRD(item.price)} x {item.quantity} {item.taxRate > 0 && <span className="text-sky-300 font-medium">(ITBIS 18%)</span>}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-black/40 border border-white/15 rounded-xl">
                    <button
                      onClick={() => updateQuantity(item.productId, -1)}
                      className="p-1 hover:text-sky-400 text-white/70 transition"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 text-xs font-mono font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, 1)}
                      className="p-1 hover:text-sky-400 text-white/70 transition"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <span className="w-20 text-right font-mono font-bold text-xs text-white">
                    {formatCurrencyRD(item.total)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1 text-white/40 hover:text-rose-400 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumen & Métodos de Pago */}
        <div className="p-4 border-t border-white/10 bg-black/30 space-y-3">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-white/60">
              <span>Subtotal Gravado</span>
              <span className="font-mono text-white/80">{formatCurrencyRD(subtotal)}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>ITBIS (18%)</span>
              <span className="font-mono text-white/80">{formatCurrencyRD(itbisTotal)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
              <span>Total a Pagar (DOP)</span>
              <span className="font-mono text-emerald-400 text-base">{formatCurrencyRD(total)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                paymentMethod === 'cash' 
                  ? 'bg-white/25 border-white/40 text-white shadow-md' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Banknote className="h-3.5 w-3.5" /> Efectivo
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                paymentMethod === 'card' 
                  ? 'bg-white/25 border-white/40 text-white shadow-md' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <CreditCard className="h-3.5 w-3.5" /> Tarjeta
            </button>
            <button
              onClick={() => setPaymentMethod('transfer')}
              className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                paymentMethod === 'transfer' 
                  ? 'bg-white/25 border-white/40 text-white shadow-md' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Transf.
            </button>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className="w-full py-3 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 text-xs uppercase tracking-wider"
          >
            <CheckCircle2 className="h-4 w-4" /> Emitir NCF e Imprimir Ticket
          </button>
        </div>
      </div>

      {/* Modal macOS Dialog de Factura Exitosa */}
      {successModal && lastInvoice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-slate-900/90 border border-white/20 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl backdrop-blur-2xl">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 mb-2 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Comprobante Fiscal Emitido</h3>
              <p className="text-[11px] text-white/50">Venta registrada en base de datos local y contabilidad</p>
            </div>

            <div className="bg-black/40 p-4 rounded-2xl border border-white/10 font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-white/50">NCF Asignado:</span>
                <span className="text-sky-400 font-bold">{lastInvoice.ncf}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">No. Factura:</span>
                <span className="text-white/90">{lastInvoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Cliente:</span>
                <span className="text-white/90">{lastInvoice.customerName}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm">
                <span className="text-white">Monto Total:</span>
                <span className="text-emerald-400">{formatCurrencyRD(lastInvoice.total)}</span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setSuccessModal(false)}
                className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition border border-white/10"
              >
                Cerrar
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-md shadow-sky-500/25"
              >
                <Printer className="h-4 w-4" /> Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
