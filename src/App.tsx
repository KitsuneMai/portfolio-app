// export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashborad";
import ProductsPage from "./pages/products_page";
import SalesPage from "./pages/SalesPage";
import SalesCharts from "./pages/SalesCharts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardMetrics from "./pages/DashboardMetrics";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} /> {/*temporalmente el login será la raíz */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/sales" element={<SalesPage/>} />
        <Route path="charts" element={<SalesCharts/>} />
        <Route path="dashboardcharts" element={<DashboardMetrics/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
