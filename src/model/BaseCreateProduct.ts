export interface PhoneType {
  phoneId: number;
  brand: string;
  model: string;
  imeiNumber: string;
  color: string;
  storageCapacity: string;
  condition: "NEW" | "USED";
  updatedAt: string;
  updatedBy: string;
  categoryId: {
    categoryId: number;
    name: string;
  };
}

export interface ProductType {
  productId: number;
  productName: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE";
  discountPercentage?: number;
  type: "PHONE" | "ACCESSORY";
  createdAt: string;

  phone?: PhoneType | null;       // only when type = PHONE
  accessoryId?: AccessoryType | null;
}

export interface AccessoryType {
  accessoryId: number;
  brand: string;
  rackId: string;
  type: string;
  compatibleWith?: string;
  color?: string;
  categoryId: {
    categoryId: number;
    name: string;
  };

  product?: ProductType; // optional because @JsonIgnore
}

interface BaseproductResponse {
  data: ProductType[];
  msg: string;
  statusCode: string;
}

export default BaseproductResponse;


export interface UpdatePhoneDrawerProps {
  productId: number;
  phoneId?: number;
  productName: string;
  brand?: string;
  model?: string;
  imeiNumber?: string;
  color?: string;
  storageCapacity?: string;
  condition?: "NEW" | "USED";
  purchasePrice: number;
  sellingPrice: number;
  categoryId?: number;
  discountPercentage?: number;
  status: "ACTIVE" | "INACTIVE";
  quantityInStock: number;
  refreshTable: () => void;
}


export interface UpdateProductAccessoryDrawerProps {
  productId: number;
  accessoryId?: number;
  productName: string;
  brand?: string;
  rackId?: string;
  type: string;
  compatibleWith?: string | null;
  purchasePrice: number;
  sellingPrice: number;
  categoryId: number | undefined;
  discountPercentage?: number;
  status: string;
  color?: string | null;
  quantityInStock: number;
  refreshTable: () => void; // ✅ optional
}
