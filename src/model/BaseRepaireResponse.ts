export interface BaseRepaireResponse {
    data: RepaireType[];
    msg: string;
    statusCode: string;
}

export interface RepaireType {
    repairId: number;
    customerId: number;
    customer: Customer;
    deviceModel: string;
    imei: string;
    issueDescription: string;
    estimatedCost: number;
    actualCost: number;
    status: string;
    startDate: string;
    completionDate: string;
    createdAt: string;
}



export interface Customer {
  customerID: number;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;
  customerAddress: string;
}

export interface RepairItem {
  repairId: number;
  deviceModel: string;
  imei: string;
  issueDescription: string;
  estimatedCost: number;
  actualCost: number;
  status: string;
  startDate: string;
  completionDate: string;
  customer: Customer;
}