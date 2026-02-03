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


export interface UpdateProductDrawerProps {
  productId: number;
  productName: string;
  brand: string | undefined;
  model: string;
  purchasePrice: number;
  sellingPrice: number;
  categoryId: number;
  discountPercentage?: number;
  status: string;
  color: string | undefined;
  imeiNumber: string;
  condition: "NEW" | "USED";
  storageCapacity: string;
  quantityInStock: number;
}