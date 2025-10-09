import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  BarChart3,
  Package,
  TrendingUp,
  LayoutDashboard,
  List,
  PlusCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface SideMenuProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SideMenu({ collapsed, setCollapsed }: SideMenuProps) {
  const [salesOpen, setSalesOpen] = useState(false); 
  const [purchasesOpen, setPurchasesOpen] = useState(false);

  return (
    <div
      className={`bg-white border-r shadow-sm transition-all duration-300 z-30 overflow-auto ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header del panel */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        {!collapsed && <h2 className="text-lg font-semibold text-gray-700">Panel</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      {/* Menú principal */}
      <ul className="mt-4 space-y-2 font-medium">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/panel/dashboardcharts"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition rounded-lg ${
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5 mr-3 text-gray-500" />
            {!collapsed && "Dashboard"}
          </NavLink>
        </li>

        {/* Ventas con submenú */}
        <li>
          <button
            onClick={() => setSalesOpen(!salesOpen)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition ${
              salesOpen ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-3 text-gray-500" />
              {!collapsed && "Ventas"}
            </div>
            {!collapsed &&
              (salesOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              ))}
          </button>

          {/* Submenú */}
          {salesOpen && !collapsed && (
            <ul className="ml-10 mt-1 space-y-1">
              <li>
                <NavLink
                  to="/panel/charts"
                  className={({ isActive }) =>
                    `flex items-center px-2 py-1.5 rounded-lg text-sm transition ${
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <List className="w-4 h-4 mr-2 text-gray-400" />
                  Listar ventas
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/panel/sales"
                  className={({ isActive }) =>
                    `flex items-center px-2 py-1.5 rounded-lg text-sm transition ${
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <PlusCircle className="w-4 h-4 mr-2 text-gray-400" />
                  Registrar venta
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Ventas con submenú */}
        <li>
          <button
            onClick={() => setPurchasesOpen(!purchasesOpen)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition ${
              purchasesOpen ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-3 text-gray-500" />
              {!collapsed && "Compras"}
            </div>
            {!collapsed && (purchasesOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />)}
          </button>

          {purchasesOpen && !collapsed && (
            <ul className="ml-10 mt-1 space-y-1">
              <li>
                <NavLink
                  to="/panel/purchases_charts"
                  className={({ isActive }) =>
                    `flex items-center px-2 py-1.5 rounded-lg text-sm transition ${
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <List className="w-4 h-4 mr-2 text-gray-400" />
                  Listar compras
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/panel/purchases"
                  className={({ isActive }) =>
                    `flex items-center px-2 py-1.5 rounded-lg text-sm transition ${
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <PlusCircle className="w-4 h-4 mr-2 text-gray-400" />
                  Registrar compra
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Productos */}
        <li>
          <NavLink
            to="/panel/products"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition rounded-lg ${
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Package className="w-5 h-5 mr-3 text-gray-500" />
            {!collapsed && "Productos"}
          </NavLink>
        </li>

        {/* Métricas */}
        <li>
          <NavLink
            to="/panel/metrics"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition rounded-lg ${
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <BarChart3 className="w-5 h-5 mr-3 text-gray-500" />
            {!collapsed && "Métricas"}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
