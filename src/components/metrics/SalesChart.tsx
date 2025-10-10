import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export default function SalesChart() {
  const [data, setData] = useState<MonthlyRevenue[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/sales/metrics")
      .then(res => res.json())
      .then(res => {
        // Obtenemos los datos o usamos un objeto vacío
        const monthlyRevenue = (res.monthlyRevenue || {}) as Record<string, number>;

        // Lista fija de meses en español o inglés
        const months = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        // Creamos un array asegurando que cada mes tenga un valor
        const revenueData = months.map((month, index) => ({
          month,
          revenue: Number(monthlyRevenue[index + 1] || 0), // si tu backend devuelve {1: 1000, 2: 500, ...}
        }));

        setData(revenueData);
      })
      .catch(err => console.error(err));
  }, []);




  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Ingresos Mensuales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#555" strokeDasharray="5 5" />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip formatter={(value: number) => `$${value}`} />
          <Line type="monotone" dataKey="revenue" stroke="#4ade80" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
