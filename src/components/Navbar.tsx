import React, { useRef } from "react";

const Navbar: React.FC = () => {
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverRef.current || !navRef.current) return;

    const rect = navRef.current.getBoundingClientRect();
    const items = navRef.current.querySelectorAll("li");

    let targetPercent = 0;

    items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        if (e.clientX >= itemRect.left && e.clientX <= itemRect.right) {
        const extra = 20; // 👈 ese “toquesito” extra (en píxeles)
        const endX = Math.min(itemRect.right + extra, rect.right) - rect.left;
        targetPercent = (endX / rect.width) * 100;
        }
    });

    hoverRef.current.style.width = `${targetPercent}%`;
    };



    const handleMouseLeave = () => {
    if (hoverRef.current) {
        hoverRef.current.style.transition = "width 1s cubic-bezier(0.77,0,0.175,1)";
        hoverRef.current.style.width = "0%";
    }
    };


  return (
    <nav
      ref={navRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#0a0a0a] text-white py-6 px-8 overflow-hidden select-none"
    >
      {/* Capa gris animada */}
      <div
        ref={hoverRef}
        className="absolute top-0 left-0 h-full bg-gray-600/30 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-none"
        style={{ width: "0%" }}
      />

      {/* Contenido del navbar */}
      <ul className="relative flex gap-10 z-10">
        <li>
          <a
            href="dashboard"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Inicio
          </a>
        </li>
        <li>
          <a
            href="products"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Productos
          </a>
        </li>
        <li>
          <a
            href="charts"
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
    </nav>
  );
};

export default Navbar;
