import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ProductForm from "./ProductForm";

interface ProductDrawerProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function ProductDrawer({ open, onClose, onCreated }: ProductDrawerProps) {
  const [keepOpen, setKeepOpen] = useState(false);

  const handleSuccess = () => {
    onCreated();
    if (!keepOpen) onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[800px]">
        <SheetHeader>
          <SheetTitle>Agregar producto</SheetTitle>
        </SheetHeader>

        {/* Formulario */}
        <ProductForm onSuccess={handleSuccess} />

        {/* Mantener abierto */}
        <div className="mt-4 flex items-center space-x-2">
          <input
            id="keepOpen"
            type="checkbox"
            checked={keepOpen}
            onChange={(e) => setKeepOpen(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="keepOpen" className="text-sm text-gray-700">
            Mantener abierto
          </label>
        </div>
      </SheetContent>
    </Sheet>
  );
}
