export interface ProductType {
  productId: number;
  productName: string;
  brand: string;
  model: string;
  imeiNumber: string;
  color: string;
  storageCapacity: string;
  condition: "NEW" | "USED";
  purchasePrice: number;
  sellingPrice: number;
  quantityInStock: number;
  status: "ACTIVE" | "INACTIVE";
  discountPercentage?: number;
  categoryId: {
    categoryId: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
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
    brand: string;
    model: string;
    purchasePrice: number;
    sellingPrice: number;
    categoryId: number;
    discountPercentage?: number;
    status: string;
    color: string;
    imeiNumber: string;
    condition: "NEW" | "USED";
    storageCapacity: string;
    quantityInStock: number;
}