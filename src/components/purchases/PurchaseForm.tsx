// src/components/purchases/PurchaseForm.tsx
import React, { useEffect, useState } from "react";
import ProductDrawer from "../products/ProductDrawer";
import type { Product } from "../../types/types";

export type PurchaseItem = {
  productId: number;
  product?: Product;
  quantity: number;
  price: number;
};

interface PurchaseFormProps {
  onSuccess: () => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onSuccess }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [supplier, setSupplier] = useState("");
  const [notes, setNotes] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  // Traer productos existentes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch("http://localhost:3000/products", {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
          console.error("Error fetching products:", res.status);
          setError(`Error ${res.status}: No se pudieron cargar los productos`);
          return;
        }

        const data = await res.json();
        console.log("Fetched products:", data);
        setProducts(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error de conexión. Verifica que el servidor esté corriendo.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleAddItem = (product: Product) => {
    if (items.find((i) => i.productId === product.id)) return;
    setItems([...items, { productId: product.id, product, quantity: 1, price: product.basePrice }]);
  };

  const handleItemChange = (index: number, field: keyof PurchaseItem, value: any) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = async () => {
    if (items.length === 0) {
      alert("Agrega al menos un producto");
      return;
    }
    
    const payload = { items, supplier, notes };
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/purchases", {
        method: "POST",
        credentials: 'include',
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Error creating purchase:", res.status);
        alert(`Error ${res.status}: No se pudo registrar la compra`);
        return;
      }

      const data = await res.json();
      console.log("Purchase created:", data);

      setItems([]);
      setSupplier("");
      setNotes("");
      onSuccess();

    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error inesperado al registrar la compra.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error al cargar productos</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm underline"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg space-y-4 shadow">
      <h2 className="text-lg font-bold text-gray-800">Nueva Compra</h2>

      {loading && (
        <div className="text-blue-600 text-sm">Cargando...</div>
      )}

      {/* Selección de productos */}
      <div className="flex items-center gap-2">
        <select
          className="bg-gray-100 text-gray-800 p-2 rounded flex-1 border border-gray-300"
          onChange={(e) => {
            const prod = products.find((p) => p.id === Number(e.target.value));
            if (prod) handleAddItem(prod);
            e.target.value = ""; // Reset select
          }}
          disabled={loading || products.length === 0}
        >
          <option value="">
            {products.length === 0 
              ? "No hay productos disponibles" 
              : "Selecciona un producto..."}
          </option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
          onClick={() => setDrawerOpen(true)}
          disabled={loading}
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Lista de items agregados */}
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded border border-gray-200">
            <span className="flex-1 text-gray-800">{item.product?.name}</span>
            <input
              type="number"
              min={1}
              className="w-16 p-1 rounded border border-gray-300 text-gray-800"
              value={item.quantity}
              onChange={(e) => handleItemChange(idx, "quantity", Number(e.target.value))}
            />
            <input
              type="number"
              min={0}
              step={0.01}
              className="w-24 p-1 rounded border border-gray-300 text-gray-800"
              value={item.price}
              onChange={(e) => handleItemChange(idx, "price", Number(e.target.value))}
            />
            <button
              className="text-red-500 hover:text-red-600 px-2"
              onClick={() => handleRemoveItem(idx)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Campos generales */}
      <input
        type="text"
        placeholder="Proveedor"
        className="w-full p-2 rounded border border-gray-300 text-gray-800"
        value={supplier}
        onChange={(e) => setSupplier(e.target.value)}
      />
      <textarea
        placeholder="Notas"
        className="w-full p-2 rounded border border-gray-300 text-gray-800"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      {/* Submit */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading || items.length === 0}
      >
        {loading ? "Guardando..." : "Guardar Compra"}
      </button>

      {/* Drawer para nuevo producto */}
      <ProductDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreated={(newProduct?: Product) => {
          if (!newProduct) return;
          setProducts([...products, newProduct]);
          handleAddItem(newProduct);
        }}
      />
    </div>
  );
};

export default PurchaseForm;