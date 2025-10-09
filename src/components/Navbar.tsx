import React, { useRef, useState, useEffect } from "react";
import { User } from "lucide-react";
import { createPortal } from "react-dom";

interface UserType {
  id: string;
  email: string;
  name?: string;
}

const Navbar: React.FC = () => {
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  

  const [user, setUser] = useState<UserType | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  // Consultar perfil al montar
  useEffect(() => {
    fetch("http://localhost:3000/auth/profile", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverRef.current || !navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const items = navRef.current.querySelectorAll("li");
    let targetPercent = 0;

    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      if (e.clientX >= itemRect.left && e.clientX <= itemRect.right) {
        const extra = 20;
        const endX = Math.min(itemRect.right + extra, rect.right) - rect.left;
        targetPercent = (endX / rect.width) * 100;
      }
    });

    hoverRef.current.style.width = `${targetPercent}%`;
  };

  const handleMouseLeave = () => {
    if (hoverRef.current) {
      hoverRef.current.style.transition =
        "width 1s cubic-bezier(0.77,0,0.175,1)";
      hoverRef.current.style.width = "0%";
    }
  };

  const handleToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 4, left: rect.left }); // 4px de margen
    }
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await fetch("/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/"; // redirige a inicio
  };

  return (
    <nav
      ref={navRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#0a0a0a] text-white py-6 px-8 overflow-hidden select-none flex items-center justify-between"
    >
      {/* Capa gris animada */}
      <div
        ref={hoverRef}
        className="absolute top-0 left-0 h-full bg-gray-600/30 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-none"
        style={{ width: "0%" }}
      />

      {/* Menú principal */}
      <ul className="relative flex gap-10 z-10">
        <li>
          <a
            href="/dashboard"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Inicio
          </a>
        </li>
        <li>
          <a
            href="/products"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Productos
          </a>
        </li>
        <li>
          <a
            href="/charts"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Servicios
          </a>
        </li>
        <li>
          <a
            href="#"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Contacto
          </a>
        </li>
      </ul>

      {/* Icono de perfil / dropdown */}
      {/* Icono de perfil / dropdown */}
      <div className="relative z-10">
        <button
          ref={buttonRef}
          onClick={handleToggle}
          className="ml-6 p-2 rounded-full hover:bg-gray-700 transition"
        >
          <User size={24} />
        </button>

        {dropdownOpen &&
          createPortal(
            <div
              style={{
                position: "absolute",
                top: dropdownPos.top,
                left: dropdownPos.left,
                transform: "translateX(-100%)",
                minWidth: "10rem",
              }}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden text-white z-50"
            >
              {user ? (
                <>
                  <a
                    href="/panel"
                    className="block px-4 py-2 hover:bg-gray-700 transition"
                  >
                    Panel de Control
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <a
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-700 transition"
                >
                  Login
                </a>
              )}
            </div>,
            document.body
          )}

      </div>


    </nav>
  );
};

export default Navbar;
