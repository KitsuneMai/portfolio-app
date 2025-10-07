// tipos para TS
export type VehicleType = 'carro' | 'moto';
export type PartType = 'original' | 'generico';

export type Product = {
  id: number;
  name: string;
  description?: string;
  basePrice: number;
  ivaPercentage: number;
  stock: number;
  imageUrl?: string;
  vehicleType: VehicleType;
  partType: PartType;
};

// arrays para runtime (para iterar en selects)
export const VehicleTypes: VehicleType[] = ['carro', 'moto'];
export const PartTypes: PartType[] = ['original', 'generico'];
