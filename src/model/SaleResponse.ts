// models/SaleResponse.ts
export interface CustomSaleItem {
  productName: string;
  qty: string;
  unitPrice: string;
  warrantyDays: string;
}

export interface Sale {
  customSaleItems: CustomSaleItem[];
  customerName: string;
  emailAddress: string;
  phoneNumber: string;
  payMoney: string | null;
  returnMoney: string;
  totalPayment: string;
}

export interface SaleResponse {
  msg: string;
  saleItems: Sale[];
  statusCode: string;
}
