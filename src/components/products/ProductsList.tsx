import { useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/types";

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  return (
    <div>
      {/* Switch de vista */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setViewMode('cards')}
          className={`px-3 py-1 rounded ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Tarjetas
        </button>
        <button
          onClick={() => setViewMode('table')}
          className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Tabla
        </button>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr className="text-center">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Descripción</th>
                <th className="py-2 px-4 border-b">Precio Base</th>
                <th className="py-2 px-4 border-b">IVA %</th>
                <th className="py-2 px-4 border-b">Ganancia %</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Vehículo</th>
                <th className="py-2 px-4 border-b">Tipo Parte</th>
                <th className="py-2 px-4 border-b">Imagen</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{p.id}</td>
                  <td className="py-2 px-4 border-b">{p.name}</td>
                  <td className="py-2 px-4 border-b">{p.description || '-'}</td>
                  <td className="py-2 px-4 border-b">${p.basePrice}</td>
                  <td className="py-2 px-4 border-b">{p.ivaPercentage || 0}%</td>
                  <td className="py-2 px-4 border-b">{p.profitPercentage || 0}%</td>
                  <td className="py-2 px-4 border-b">{p.stock}</td>
                  <td className="py-2 px-4 border-b">{p.vehicleType}</td>
                  <td className="py-2 px-4 border-b">{p.partType}</td>
                  <td className="py-2 px-4 border-b">
                    {p.imageUrl ? (
                      <img
                        src={`http://localhost:3000${p.imageUrl}`}
                        alt={p.name}
                        className="h-12 mx-auto"
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
