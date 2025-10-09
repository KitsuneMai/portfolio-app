import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // mock data mientras conectamos backend
    setData([
      { month: '2025-01', revenue: 5000 },
      { month: '2025-02', revenue: 7000 },
      { month: '2025-03', revenue: 6500 },
      { month: '2025-04', revenue: 8000 },
    ]);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md h-64">
      <h2 className="text-xl font-semibold mb-2">Crecimiento Mensual</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#fff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
