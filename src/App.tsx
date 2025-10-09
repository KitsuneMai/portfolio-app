import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashborad";
import ProductsPage from "./pages/products_page";
import SalesPage from "./pages/Panel de control/SalesPage";
import SalesCharts from "./pages/Panel de control/SalesCharts";
import DashboardMetrics from "./pages/Panel de control/DashboardMetrics";
import AdminLayout from "./pages/Panel de control/AdminLayout";
import PublicLayout from "./pages/public/PublicLayout";
import Purchases from "./pages/Panel de control/Purchases";
import PurchasesCharts from "./components/purchases/PurchasesCharts";

function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>

        {/* Panel de control (rutas anidadas) */}
        <Route path="/panel" element={<AdminLayout />}>
          <Route path="dashboardcharts" element={<DashboardMetrics />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="charts" element={<SalesCharts />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="purchases_charts" element={<PurchasesCharts />} />
        </Route>

        <Route path="/dashboardcharts" element={<DashboardMetrics />} />
      </Routes>
    </Router>
  );
}

export default App;
