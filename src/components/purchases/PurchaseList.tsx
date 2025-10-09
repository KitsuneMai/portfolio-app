// src/components/purchases/PurchaseList.tsx
import React from "react";
import type { Product } from "../../types/types";

export type PurchaseItem = {
  productId: number;
  quantity: number;
  price: number;
  product?: Product;
};

export type Purchase = {
  id: number;
  user: { id: number; name: string; email: string };
  items: PurchaseItem[];
  supplier?: string;
  notes?: string;
};

interface PurchaseListProps {
  purchases: Purchase[];
}

const PurchaseList: React.FC<PurchaseListProps> = ({ purchases }) => {
  return (
    <div className="space-y-4">
      {purchases.map((purchase) => {
        // Calcular el total de la compra
        const total = purchase.items.reduce((sum, item) => {
          return sum + (Number(item.quantity) * Number(item.price));
        }, 0);

        return (
          <div key={purchase.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-white">
              Compra #{purchase.id} - {purchase.user.name}
            </h3>
            <p className="text-gray-300">Proveedor: {purchase.supplier || "N/A"}</p>
            <ul className="mt-2 space-y-1">
              {purchase.items.map((item, idx) => (
                <li key={idx} className="flex justify-between text-gray-200">
                  <span>{item.product?.name || `Producto ID ${item.productId}`}</span>
                  <span>
                    {item.quantity} x ${Number(item.price).toFixed(2)} = ${(Number(item.quantity) * Number(item.price)).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-gray-600 flex justify-between text-white font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {purchase.notes && <p className="mt-2 text-gray-400 italic">Notas: {purchase.notes}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default PurchaseList;