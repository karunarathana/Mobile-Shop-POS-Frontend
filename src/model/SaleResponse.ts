export interface SaleResponse {
  msg: string;
  statusCode: string;
  saleItems: SaleItem[];
}

export interface SaleItem {
  saleItemId: number;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  warrantyDuration: number;
  product: Product;
  sale: Sale;
}

export interface Product {
  brand: string;
  model: string;
  imeiNumber: string;
  color: string;
  storageCapacity: string;
}

export interface Sale {
  saleId: number;
  totalAmount: number;
  paymentMethod: "CASH" | "CARD" | "MOBILE_PAYMENT";
  paymentStatus: "PAID" | "PENDING" | "PARTIALLY_PAID";
  saleDate: string;
  customer: Customer;
}

export interface Customer {
  customerName: string;
  phoneNumber: string;
  customerAddress: string;
}
