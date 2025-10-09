import { useEffect, useState } from "react";

interface ProductMetric {
  productId: number;
  productName: string;
  totalSoldQty: number;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  avgProfitMargin: number;
}

export default function ProductMetrics() {
  const [metrics, setMetrics] = useState<ProductMetric[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/sales/metrics")
      .then(res => res.json())
      .then(res => setMetrics(res.productMetrics))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Métricas por Producto</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-700 text-left">
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Vendidos</th>
            <th className="px-4 py-2">Ingresos</th>
            <th className="px-4 py-2">Costo</th>
            <th className="px-4 py-2">Ganancia</th>
            <th className="px-4 py-2">Margen</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map(p => (
            <tr key={p.productId} className="even:bg-gray-700 odd:bg-gray-600">
              <td className="px-4 py-2">{p.productName}</td>
              <td className="px-4 py-2">{p.totalSoldQty}</td>
              <td className="px-4 py-2">${p.totalRevenue.toFixed(2)}</td>
              <td className="px-4 py-2">${p.totalCost.toFixed(2)}</td>
              <td className="px-4 py-2">${p.totalProfit.toFixed(2)}</td>
              <td className="px-4 py-2">{(p.avgProfitMargin * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
