import React, { useState, useEffect } from 'react';
import type { Product } from '../types/types';

type SaleItemForm = {
  productId: number;
  quantity: number;
};

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 2,
});

const SalesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [saleItems, setSaleItems] = useState<SaleItemForm[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [totals, setTotals] = useState({ subtotal: 0, ivaTotal: 0, total: 0 });

  // Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = (productId: number) => {
    setSaleItems((prev) => {
      const exists = prev.find((i) => i.productId === productId);
      if (exists) return prev;
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setSaleItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const removeItem = (productId: number) => {
    setSaleItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Calcular totales para preview
  useEffect(() => {
    let subtotal = 0;
    let ivaTotal = 0;
    let total = 0;

    saleItems.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return;

      const price = product.basePrice;
      const iva = product.ivaPercentage || 0;
      const priceWithIva = price + price * (iva / 100);

      subtotal += price * item.quantity;
      ivaTotal += (priceWithIva - price) * item.quantity;
      total += priceWithIva * item.quantity;
    });

    setTotals({
      subtotal: +subtotal.toFixed(2),
      ivaTotal: +ivaTotal.toFixed(2),
      total: +total.toFixed(2),
    });
  }, [saleItems, products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName) {
      alert('Ingresa el nombre del cliente');
      return;
    }

    if (saleItems.length === 0) {
      alert('Agrega al menos un producto');
      return;
    }

    const body = { customerName, items: saleItems };

    try {
        const res = await fetch('http://localhost:3000/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include', // envía la cookie JWT automáticamente
        });


      if (!res.ok) throw new Error('Error creando venta');

      alert('Venta registrada con éxito!');
      setCustomerName('');
      setSaleItems([]);
      setTotals({ subtotal: 0, ivaTotal: 0, total: 0 });
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al registrar la venta');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Registrar Venta</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => addProduct(p.id)}
              className="p-2 border rounded hover:bg-gray-100 transition"
            >
              {p.name} - {currencyFormatter.format(p.basePrice)} | Stock: {p.stock}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Items de la venta</h2>
          {saleItems.length === 0 && <p>No hay productos agregados</p>}
          {saleItems.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            return (
              <div key={item.productId} className="flex items-center justify-between p-2 border-b">
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm">
                    Precio unitario: {currencyFormatter.format(product.basePrice)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={product.stock}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, Math.min(product.stock, +e.target.value))
                    }
                    className="w-16 p-1 border rounded text-center"
                  />
                  <span className="w-24 text-right">
                    {currencyFormatter.format(product.basePrice * item.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 border rounded bg-gray-50 space-y-1">
          <p>Subtotal: {currencyFormatter.format(totals.subtotal)}</p>
          <p>IVA: {currencyFormatter.format(totals.ivaTotal)}</p>
          <p className="font-bold text-lg">Total: {currencyFormatter.format(totals.total)}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Registrar Venta
        </button>
      </form>
    </div>
  );
};

export default SalesPage;
