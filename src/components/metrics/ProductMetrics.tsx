import { useEffect, useState } from 'react';

export default function ProductMetrics() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
      { product: 'Producto A', qtySold: 30, revenue: 1500, profit: 450 },
      { product: 'Producto B', qtySold: 10, revenue: 1000, profit: 300 },
      { product: 'Producto C', qtySold: 20, revenue: 500, profit: 150 },
    ]);
  }, []);

  return (
    <div className="overflow-x-auto bg-gray-800 rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2">Ventas por Producto</h2>
      <table className="min-w-full text-left text-gray-300">
        <thead className="border-b border-gray-600">
          <tr>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Cantidad Vendida</th>
            <th className="px-4 py-2">Ingresos</th>
            <th className="px-4 py-2">Ganancia</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="px-4 py-2">{item.product}</td>
              <td className="px-4 py-2">{item.qtySold}</td>
              <td className="px-4 py-2">${item.revenue}</td>
              <td className="px-4 py-2">${item.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
