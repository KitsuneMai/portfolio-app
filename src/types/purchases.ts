export type PurchaseItem = {
  productId: number;
  quantity: number;
  price: number;
  product?: { id: number; name: string }; // opcional si quieres mostrar el nombre
};

export type Purchase = {
  id: number;
  user: { id: number; name: string; email: string };
  items: PurchaseItem[];
  supplier?: string;
  notes?: string;
  date: string;
};
