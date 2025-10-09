import { useEffect, useState } from 'react';

export default function PurchasesTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
      { product: 'Producto A', qty: 10, price: 50 },
      { product: 'Producto B', qty: 5, price: 100 },
      { product: 'Producto C', qty: 20, price: 25 },
    ]);
  }, []);

  const totalSpent = data.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="overflow-x-auto bg-gray-800 rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2">Compras Recientes</h2>
      <table className="min-w-full text-left text-gray-300">
        <thead className="border-b border-gray-600">
          <tr>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Precio Unitario</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-b border-gray-700">
              <td className="px-4 py-2">{item.product}</td>
              <td className="px-4 py-2">{item.qty}</td>
              <td className="px-4 py-2">${item.price}</td>
              <td className="px-4 py-2">${item.qty * item.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="px-4 py-2 font-bold" colSpan={3}>Total Gastado</td>
            <td className="px-4 py-2 font-bold">${totalSpent}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
