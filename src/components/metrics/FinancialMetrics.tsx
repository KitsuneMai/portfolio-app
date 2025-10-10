import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import CountUp from 'react-countup';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import clsx from 'clsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

type MetricRange = 'today' | 'week' | 'month' | 'year';

interface MetricData {
  totalSpent: number;
  totalRevenue: number;
  totalProfit: number;
  dailyRevenue: Record<string, number>;
  dailySpent: Record<string, number>;
  dailyProfit: Record<string, number>;
}

const FinancialMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<MetricRange>('today');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [salesRes, purchasesRes] = await Promise.all([
          fetch('http://localhost:3000/sales/metrics', { credentials: 'include' }),
          fetch('http://localhost:3000/purchases/metrics', { credentials: 'include' }),
        ]);

        const salesData = await salesRes.json();
        const purchaseData = await purchasesRes.json();

        const dailyRevenue: Record<string, number> = salesData.dailyRevenue || {};
        const dailySpent: Record<string, number> = purchaseData.dailySpent || {};

        const totalRevenue = salesData.totalRevenue || 0;
        const totalSpent = purchaseData.totalSpent || 0;

        // Unificar todas las fechas
        const allKeys = new Set([...Object.keys(dailyRevenue), ...Object.keys(dailySpent)]);
        const dailyProfit: Record<string, number> = {};
        allKeys.forEach((key) => {
          dailyProfit[key] = (dailyRevenue[key] || 0) - (dailySpent[key] || 0);
        });

        setMetrics({
          totalRevenue,
          totalSpent,
          totalProfit: totalRevenue - totalSpent,
          dailyRevenue,
          dailySpent,
          dailyProfit,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading || !metrics) return <p className="text-white">Cargando métricas...</p>;

  const currency = (v: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(v);

  // Función para generar fechas continuas
  const generateDateRange = (range: MetricRange): string[] => {
    const today = new Date();
    const dates: string[] = [];
    let days = 0;

    if (range === 'today') days = 1;
    else if (range === 'week') days = 7;
    else if (range === 'month') days = 30;
    else if (range === 'year') days = 365;

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  const filterAndFill = (range: MetricRange, data: Record<string, number>) => {
    const dates = generateDateRange(range);
    const filled: Record<string, number> = {};
    dates.forEach((d) => {
      filled[d] = data[d] || 0;
    });
    return filled;
  };

  const calculateChange = (data: Record<string, number>) => {
    const values = Object.values(data);
    if (values.length < 2) return 0;
    // Tomar los últimos 2 valores reales no cero
    const nonZeroValues = values.filter((v) => v !== 0);
    if (nonZeroValues.length < 2) return 0;
    const last = nonZeroValues[nonZeroValues.length - 1];
    const prev = nonZeroValues[nonZeroValues.length - 2];
    return ((last - prev) / (prev || 1)) * 100;
  };

  const renderCard = (
    title: string,
    value: number,
    revenueData: Record<string, number>,
    spentData: Record<string, number>,
    profitData: Record<string, number>,
    gradient: string
  ) => {
    const filteredRevenue = filterAndFill(range, revenueData);
    const filteredSpent = filterAndFill(range, spentData);
    const filteredProfit = filterAndFill(range, profitData);

    const chartData = {
      labels: Object.keys(filteredRevenue),
      datasets: [
        {
          label: 'Ingresos',
          data: Object.values(filteredRevenue),
          borderColor: 'rgba(59, 130, 246, 0.8)',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          tension: 0.4,
          fill: true,
          pointRadius: 0,
        },
        {
          label: 'Gastos',
          data: Object.values(filteredSpent),
          borderColor: 'rgba(239, 68, 68, 0.8)',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          tension: 0.4,
          fill: true,
          pointRadius: 0,
        },
        {
          label: 'Ganancia',
          data: Object.values(filteredProfit),
          borderColor: 'rgba(16, 185, 129, 0.8)',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          tension: 0.4,
          fill: true,
          pointRadius: 0,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: { x: { display: false }, y: { display: false } },
    };

    const change = calculateChange(filteredProfit);

    return (
      <div
        className={clsx(
          `relative rounded-xl p-4 shadow-xl hover:scale-105 transform transition-transform duration-300 cursor-pointer overflow-hidden`,
          gradient
        )}
      >
        <h3 className="text-sm text-white font-medium">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">
          <CountUp end={value} duration={1.5} separator="," prefix="$" />
        </p>
        <div className="flex items-center space-x-1 text-white text-sm mt-1">
          {change >= 0 ? <FaArrowUp className="text-green-300" /> : <FaArrowDown className="text-red-300" />}
          <span>{Math.abs(change).toFixed(1)}%</span>
        </div>
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
          <div className="w-full h-full bg-black/20 backdrop-blur-sm" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-end space-x-2">
        {(['today', 'week', 'month', 'year'] as MetricRange[]).map((r) => (
          <button
            key={r}
            className={clsx(
              'px-3 py-1 rounded font-medium transition-colors',
              r === range ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            )}
            onClick={() => setRange(r)}
          >
            {r === 'today' ? 'Hoy' : r === 'week' ? 'Semana' : r === 'month' ? 'Mes' : 'Año'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {renderCard(
          'Ganancia',
          metrics.totalProfit,
          metrics.dailyRevenue,
          metrics.dailySpent,
          metrics.dailyProfit,
          'from-green-500 to-green-700'
        )}
        {renderCard(
          'Gastos',
          metrics.totalSpent,
          metrics.dailyRevenue,
          metrics.dailySpent,
          metrics.dailyProfit,
          'from-red-500 to-red-700'
        )}
        {renderCard(
          'Ingresos',
          metrics.totalRevenue,
          metrics.dailyRevenue,
          metrics.dailySpent,
          metrics.dailyProfit,
          'from-blue-500 to-blue-700'
        )}
      </div>
    </div>
  );
};

export default FinancialMetrics;
