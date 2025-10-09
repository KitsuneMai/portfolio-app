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
        // Aseguramos que res.monthlyRevenue es un Record<string, number>
        const monthlyRevenue = res.monthlyRevenue as Record<string, number>;

        const revenueData = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
          month,
          revenue: Number(revenue), // convertimos a número
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
