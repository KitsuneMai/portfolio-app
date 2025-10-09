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

const SalesCharts: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await fetch('http://localhost:3000/sales', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Error al cargar las ventas');
        const data: Sale[] = await res.json();
        setSales(data);
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
              <th className="py-2 px-4 border-b">Items</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => {
              // Calcular ganancia total (profit) de la venta
              const totalProfit = sale.items?.reduce((acc, item) => {
                const unitProfit = (item.finalPrice - item.price) * item.quantity;
                return acc + unitProfit;
              }, 0) ?? 0;

              return (
                <tr key={sale.id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{sale.id}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(sale.date).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{sale.customerName || '-'}</td>
                  <td className="py-2 px-4 border-b">{sale.user?.name || '-'}</td>
                  <td className="py-2 px-4 border-b">{currency(sale.subtotal)}</td>
                  <td className="py-2 px-4 border-b text-green-700 font-semibold">
                    {currency(totalProfit)}
                  </td>
                  <td className="py-2 px-4 border-b font-bold">{currency(sale.total)}</td>
                  <td className="py-2 px-4 border-b">
                    {sale.items?.length ? (
                      sale.items.map((item) => (
                        <div key={item.id} className="mb-1 text-left">
                          {item.product?.name || 'Producto no encontrado'} x {item.quantity}{' '}
                          ({currency(item.total)})
                          {item.profitPercentage && (
                            <span className="text-xs text-gray-500">
                              {' '}
                              (+{item.profitPercentage}%)
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesCharts;
