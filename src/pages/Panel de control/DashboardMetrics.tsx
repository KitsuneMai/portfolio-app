import SalesChart from '../../components/metrics/SalesChart';
import ProductMetrics from '../../components/metrics/ProductMetrics';
import PurchasesTable from '../../components/metrics/PurchasesTable';

export default function DashboardMetrics() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Financiero</h1>
      <SalesChart />
      <ProductMetrics />
      <PurchasesTable />
    </div>
  );
}
