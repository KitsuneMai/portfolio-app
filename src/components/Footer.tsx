import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-[#0a0a0a] to-gray-800 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Izquierda */}
        <div>
          <h4 className="text-lg font-bold mb-2">Mi Distribuidora</h4>
          <p className="text-sm text-gray-400">Todos los derechos reservados © 2025</p>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Acerca de</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Soporte</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
