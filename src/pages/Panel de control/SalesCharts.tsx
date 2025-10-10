import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  basePrice: number;
  profitPercentage?: number;
}

interface SaleItem {
  id: number;
  product: Product | null;
  quantity: number;
  price: number;
  finalPrice: number;
  profitPercentage?: number;
  subtotal: number;
  total: number;
}

interface User {
  id: string;
  name: string;
}

interface Sale {
  id: number;
  date: string;
  customerName?: string;
  subtotal: number;
  ivaTotal: number;
  total: number;
  user: User | null;
  items: SaleItem[];
}

const PAGE_SIZE = 15;

const SalesCharts: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await fetch('http://localhost:3000/sales', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Error al cargar las ventas');
        const data: Sale[] = await res.json();
        setSales(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSales();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando ventas...</p>;

  const currency = (v: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    }).format(v);

  const toggleRow = (id: number) => {
    const newSet = new Set(expandedRows);
    if (expandedRows.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedRows(newSet);
  };

  const totalPages = Math.ceil(sales.length / PAGE_SIZE);
  const visibleSales = sales.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setExpandedRows(new Set()); // Colapsar todas al cambiar de página
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ventas Registradas</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Cliente</th>
              <th className="py-2 px-4 border-b">Usuario</th>
              <th className="py-2 px-4 border-b">Subtotal</th>
              <th className="py-2 px-4 border-b">Ganancia Estimada</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {visibleSales.map(sale => {
              const totalProfit =
                sale.items?.reduce((acc, item) => {
                  const unitProfit = (item.finalPrice - item.price) * item.quantity;
                  return acc + unitProfit;
                }, 0) ?? 0;
              const isExpanded = expandedRows.has(sale.id);

              return (
                <React.Fragment key={sale.id}>
                  {/* Fila principal */}
                  <tr
                    className={`text-center cursor-pointer transition-colors ${
                      isExpanded
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'hover:bg-blue-100'
                    }`}
                    onClick={() => toggleRow(sale.id)}
                  >
                    <td className="py-2 px-4 border-b">{sale.id}</td>
                    <td className="py-2 px-4 border-b">{new Date(sale.date).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">{sale.customerName || '-'}</td>
                    <td className="py-2 px-4 border-b">{sale.user?.name || '-'}</td>
                    <td className="py-2 px-4 border-b">{currency(sale.subtotal)}</td>
                    <td className="py-2 px-4 border-b text-green-700 font-semibold">{currency(totalProfit)}</td>
                    <td className="py-2 px-4 border-b font-bold">{currency(sale.total)}</td>
                  </tr>

                  {/* Fila expandida tipo factura */}
                  {isExpanded && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="p-4">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-1 px-2 border-b text-left">Producto</th>
                              <th className="py-1 px-2 border-b text-right">Unidades</th>
                              <th className="py-1 px-2 border-b text-right">Precio Unitario</th>
                              <th className="py-1 px-2 border-b text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sale.items.map(item => (
                              <tr key={item.id}>
                                <td className="py-1 px-2 border-b">{item.product?.name || 'Producto no encontrado'}</td>
                                <td className="py-1 px-2 border-b text-right">{item.quantity}</td>
                                <td className="py-1 px-2 border-b text-right">{currency(item.price)}</td>
                                <td className="py-1 px-2 border-b text-right">{currency(item.total)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            « Anterior
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1 ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente »
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesCharts;
