interface DataType {
  reloadId: number;
  price: string;
  description: string;
  date: string;
  createdAt: string;
  status:string;
}

interface ReloadResponse {
  tableData: DataType[];
  loadingData: boolean;
  backendApi: () => void;
}

export default ReloadResponse;

