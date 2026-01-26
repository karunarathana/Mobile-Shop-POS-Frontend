interface DataType {
  customerID: number;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  phoneNumber: string;
  status: string;
  registeredAt: string;
}

interface CustomerTableProps {
  tableData: DataType[];
  loadingData: boolean;
  backendApi: () => void;
}

export default CustomerTableProps;