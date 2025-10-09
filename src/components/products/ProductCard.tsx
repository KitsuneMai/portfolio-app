import React from "react";
import type { Product } from "@/types/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      {/* Imagen */}
      {product.imageUrl ? (
        <img
          src={`http://localhost:3000${product.imageUrl}`}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-500 text-sm">
          Sin imagen
        </div>
      )}

      {/* Info del producto */}
      <h2 className="text-lg font-semibold">{product.name}</h2>
      {product.description && (
        <p className="text-gray-600 text-sm mb-1">{product.description}</p>
      )}

      <p className="font-bold mt-2">
        ${product.basePrice.toLocaleString("es-CO")}
      </p>

      <div className="text-xs text-gray-500 mt-1">
        {product.vehicleType} • {product.partType}
      </div>
    </div>
  );
}
