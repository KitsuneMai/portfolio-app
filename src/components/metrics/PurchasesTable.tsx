import { useEffect, useState } from "react";

interface PurchaseMetric {
  productId: string;
  avgPrice: number;
  totalQuantity: number;
}

export default function PurchasesTable() {
  const [data, setData] = useState<PurchaseMetric[]>([]);
  const [totals, setTotals] = useState({ totalSpent: 0, totalStockAdded: 0 });

  useEffect(() => {
    fetch("http://localhost:3000/purchases/metrics")
      .then(res => res.json())
      .then(res => {
        setData(res.profitability);
        setTotals({ totalSpent: res.totalSpent, totalStockAdded: res.totalStockAdded });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Compras y Stock</h2>
      <div className="mb-4 text-green-400">
        <span className="mr-6">Total Gastado: ${totals.totalSpent.toFixed(2)}</span>
        <span>Total Stock Añadido: {totals.totalStockAdded}</span>
      </div>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-700 text-left">
            <th className="px-4 py-2">Producto ID</th>
            <th className="px-4 py-2">Precio Promedio</th>
            <th className="px-4 py-2">Cantidad Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map(p => (
            <tr key={p.productId} className="even:bg-gray-700 odd:bg-gray-600">
              <td className="px-4 py-2">{p.productId}</td>
              <td className="px-4 py-2">${p.avgPrice.toFixed(2)}</td>
              <td className="px-4 py-2">{p.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
