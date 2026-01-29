interface DataType {
  reloadId: number;
  price: string;
  description: string;
  date: string;
  createdAt: string;
  simType:string;
  status:string;
}

interface ReloadTableProps {
  tableData: DataType[];
  loadingData: boolean;
  backendApi: () => void;
}

export default ReloadTableProps;