import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import { Button, Form, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import CreateProductDrawer from '../function/CreateProductDrawer';
import ProductTable from '../function/ProductTable';
import { ReloadOutlined } from '@ant-design/icons';
import { viewAllProduct } from '../../../service/ManageAccessory.service';
import { ProductType } from '../../../model/BaseCreateProduct';

const { Search } = Input;

export default function ManageProduct() {
  const [form] = Form.useForm();
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<ProductType[]>([]);

  const handleFinish = (values: { search: string }) => {
    console.log("Search value:", values.search);
  };

  // Fetch data from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await viewAllProduct("Mobile Phone");
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch Product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    const searchValue = value.trim().toLowerCase();

    if (!searchValue) {
      setFilteredData(data);
      return;
    }

    const result = data.filter((item: ProductType) =>
      item.productName.toLowerCase().includes(searchValue)
    );

    setFilteredData(result);
  };

  return (
    <div className="p-[10px]">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">උපාංග (Product) කළමණාකරන පිටුව</h2>
      <div>
        <div>
          <Box sx={{
            width: {
              xs: '100%',   // mobile
              sm: '80%',    // small tablets
              md: '40%',    // laptops & desktop
            }, mt: 4
          }}>
            <Form form={form} onFinish={handleFinish}>
              <Space orientation="vertical" style={{ width: "100%" }}>
                <Form.Item
                  name="search"
                >
                  <Search
                    placeholder="ගණුදෙනුකරුගේ දුරකතන අංකය සදහන් කරන්න."
                    allowClear
                    enterButton="Search"
                    size="large"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Form.Item>
              </Space>
            </Form>
          </Box>
        </div>
        <div className='flex gap-1'>
          <CreateProductDrawer refreshTable={fetchData}/>
          <div>
            <Button
              className="no-hover-btn"
              type="default"
              icon={<ReloadOutlined />}
              onClick={() => { fetchData(); }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ProductTable tableData={filteredData} loadingData={loading} refreshTable={fetchData} />
      </div>
    </div>
  );
}
