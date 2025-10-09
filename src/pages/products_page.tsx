import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProductDrawer from "@/components/products/ProductDrawer";
import ProductsList from "@/components/products/ProductsList"; // Nuevo componente
import type { Product } from "@/types/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Button onClick={() => setDrawerOpen(true)}>Agregar producto</Button>
      </div>

      {/* Lista de productos (tarjetas o tabla) */}
      <ProductsList products={products} />

      {/* Panel lateral */}
      <ProductDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreated={fetchProducts}
      />
    </div>
  );
}
