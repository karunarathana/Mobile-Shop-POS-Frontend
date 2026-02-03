export interface AccessoryType {
  accessoryId: number;
  name: string;
  brand: string;
  rackId: string;
  type: string;
  compatibleWith?: string;
  costPrice: number;
  sellPrice: number;
  quantity: number;
  status: "ACTIVE" | "INACTIVE";
  createAt: string;
}
