import React, { useEffect, useState } from 'react';
import type { PurchaseItem, Purchase } from '@/types/purchases';

const PurchasesCharts: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch('http://localhost:3000/purchases', { credentials: 'include' });
        if (!res.ok) throw new Error('Error al cargar las compras');
        const data: Purchase[] = await res.json();
        setPurchases(data);
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
            {purchases.map(p => {
              const total = p.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
              const isExpanded = expandedRows.has(p.id);

              return (
                <React.Fragment key={p.id}>
                  {/* Fila principal */}
                  <tr
                    className="text-center hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleRow(p.id)}
                  >
                    <td className="py-2 px-4 border-b">{p.id}</td>
                    <td className="py-2 px-4 border-b">{p.user.name}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(p.date).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border-b">{p.supplier || '-'}</td>
                    <td className="py-2 px-4 border-b font-bold">{currency(total)}</td>
                  </tr>

                  {/* Fila expandida con items */}
                  {isExpanded && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="p-4 text-left">
                        <h4 className="font-semibold mb-2">Items comprados:</h4>
                        <ul className="space-y-1">
                          {p.items.map((item: PurchaseItem, idx: number) => (
                            <li key={idx}>
                              {item.product?.name || `Producto ${item.productId}`} x {item.quantity} (
                              {currency(item.price * item.quantity)})
                            </li>
                          ))}
                        </ul>
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
    </div>
  );
};

export default PurchasesCharts;
