import { Outlet } from "react-router-dom";
import { SideMenu } from "../../components/panel_control/SideMenu";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenedor de sidebar + contenido */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fijo */}
        <SideMenu collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Contenido principal */}
        <main
          className="flex-1 p-6 bg-gray-50 overflow-auto transition-all duration-300"
        >
          <Outlet />
        </main>
      </div>

      {/* Footer fijo abajo */}
      <Footer />
    </div>
  );
}

