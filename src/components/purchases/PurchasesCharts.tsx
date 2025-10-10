import React, { useEffect, useState } from 'react';
import type { PurchaseItem, Purchase } from '@/types/purchases';

const PAGE_SIZE = 15; // máximo 15 compras por página

const PurchasesCharts: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch('http://localhost:3000/purchases', { credentials: 'include' });
        if (!res.ok) throw new Error('Error al cargar las compras');
        const data: Purchase[] = await res.json();
        setPurchases(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando compras...</p>;

  const currency = (v: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(v);

  const toggleRow = (id: number) => {
    const newSet = new Set(expandedRows);
    if (expandedRows.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedRows(newSet);
  };

  // Paginación
  const totalPages = Math.ceil(purchases.length / PAGE_SIZE);
  const visiblePurchases = purchases.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setExpandedRows(new Set()); // colapsar todas al cambiar de página
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Compras Registradas</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Usuario</th>
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Proveedor</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {visiblePurchases.map(p => {
              const total = p.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
              const isExpanded = expandedRows.has(p.id);

              return (
                <React.Fragment key={p.id}>
                  {/* Fila principal */}
                  <tr
                    className={`text-center cursor-pointer transition-colors ${
                      isExpanded
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : 'hover:bg-blue-100'
                    }`}
                    onClick={() => toggleRow(p.id)}
                  >
                    <td className="py-2 px-4 border-b">{p.id}</td>
                    <td className="py-2 px-4 border-b">{p.user.name}</td>
                    <td className="py-2 px-4 border-b">{new Date(p.date).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">{p.supplier || '-'}</td>
                    <td className="py-2 px-4 border-b font-bold">{currency(total)}</td>
                  </tr>

                  {/* Fila expandida tipo factura */}
                  {isExpanded && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="p-4">
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
                            {p.items.map((item: PurchaseItem, idx: number) => (
                              <tr key={idx}>
                                <td className="py-1 px-2 border-b">{item.product?.name || `Producto ${item.productId}`}</td>
                                <td className="py-1 px-2 border-b text-right">{item.quantity}</td>
                                <td className="py-1 px-2 border-b text-right">{currency(item.price)}</td>
                                <td className="py-1 px-2 border-b text-right">{currency(item.price * item.quantity)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {p.notes && <p className="mt-2 text-gray-500 italic">Notas: {p.notes}</p>}
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

export default PurchasesCharts;
