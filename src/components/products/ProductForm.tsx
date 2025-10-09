import { useState } from "react";
import type { Product } from "../../types/types";
import { VehicleTypes, PartTypes } from "../../types/types";


interface ProductFormProps {
  onSuccess: () => void;
}

export default function ProductForm({ onSuccess }: ProductFormProps) {
  const [form, setForm] = useState<Partial<Product>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => v && formData.append(k, String(v)));
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:3000/products", { method: "POST", body: formData });

      // Solo chequea que no haya error HTTP
      if (!res.ok) {
        const text = await res.text(); // aunque devuelva HTML
        console.error("Error creating product:", res.status, text);
        return;
      }

      // No hacemos res.json() para evitar parseo de HTML
      console.log("Product created successfully");

      setForm({});
      setImageFile(null);
      onSuccess();
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <input name="name" placeholder="Nombre" value={form.name || ""} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="description" placeholder="Descripción" value={form.description || ""} onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="number" name="basePrice" placeholder="Precio base" value={form.basePrice || ""} onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="number" name="profitPercentage" placeholder="Porcentaje de ganancia" value={form.profitPercentage || ""} onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="number" name="stock" placeholder="stock" value={form.stock || ""} onChange={handleChange} className="w-full p-2 border rounded" />
      <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
      <select name="vehicleType" value={form.vehicleType || ""} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Tipo de vehículo</option>
        {VehicleTypes.map((v) => <option key={v}>{v}</option>)}
      </select>
      <select name="partType" value={form.partType || ""} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Tipo de parte</option>
        {PartTypes.map((p) => <option key={p}>{p}</option>)}
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Guardar</button>
    </form>
  );
}
