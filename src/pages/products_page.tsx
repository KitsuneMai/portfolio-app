import React, { useState, useEffect } from 'react';
import type { Product } from '../types/types';
import { VehicleTypes, PartTypes } from '../types/types';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, String(value));
      });
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error creando producto');
      setForm({});
      setImageFile(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      {/* Formulario */}
      <div className="mb-8 p-4 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3">Añadir Producto</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nombre"
            value={form.name || ''}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="description"
            placeholder="Descripción"
            value={form.description || ''}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="basePrice"
            placeholder="Precio base"
            value={form.basePrice || ''}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="profitPercentage"
            placeholder="Porcentaje de ganancia"
            value={form.profitPercentage || ''}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock || ''}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border rounded"
          />
          <select
            name="vehicleType"
            value={form.vehicleType || ''}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          >
            <option value="">Tipo de vehículo</option>
            {VehicleTypes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select
            name="partType"
            value={form.partType || ''}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          >
            <option value="">Tipo de parte</option>
            {PartTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Crear Producto
          </button>
        </form>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded shadow p-4 bg-white flex flex-col">
            {p.imageUrl && (
              <img
                src={`http://localhost:3000${p.imageUrl}`} // ajustamos al servidor
                alt={p.name}
                className="mb-2 w-full h-32 object-cover rounded"
              />
            )}
            <h3 className="font-semibold">{p.name}</h3>
            {p.description && <p className="text-sm mb-1">{p.description}</p>}
            <p className="text-sm">Precio: ${p.basePrice}</p>
            <p className="text-sm">IVA: {p.ivaPercentage || 0}%</p>
            <p className="text-sm">Stock: {p.stock || 0}</p>
            <p className="text-sm">
              Vehículo: {p.vehicleType} | Tipo: {p.partType}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
