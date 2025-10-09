import React from "react";
import PurchaseForm from "@/components/purchases/PurchaseForm";
import PurchaseList from "@/components/purchases/PurchaseList";
import type { Purchase } from "@/components/purchases/PurchaseList";

const Purchases: React.FC = () => {
  const [purchases, setPurchases] = React.useState<Purchase[]>([]);

  const fetchPurchases = async () => {
    const res = await fetch("http://localhost:3000/purchases");
    const data = await res.json();
    setPurchases(data);
  };

  React.useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Compras</h1>

      <PurchaseForm onSuccess={fetchPurchases} />
      <PurchaseList purchases={purchases} />
    </div>
  );
};

export default Purchases;
