import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import { Button, DatePicker, Form, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import CreateReloadDrawer from '../function/CreateReloadDrawer';
import ReloadTable from '../components/ReloadTable';
import ReloadType from '../../../model/ReloadDataType';
import { viewAllPreviousReload, viewAllTodayReload } from '../../../service/ManageReload.service';

const { Search } = Input;

export default function ReloadDashboard() {
    const [form] = Form.useForm();
    const [data, setData] = useState<ReloadType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filteredData, setFilteredData] = useState<ReloadType[]>([]);

    const [dialodPrice, setDialodPrice] = useState<number>(0);
    const [mobitelPrice, setMobitelPrice] = useState<number>(0);
    const [hutchPrice, setHutchPrice] = useState<number>(0);
    const [airtelPrice, setAirtelPrice] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);



    const calculateReloadPrice = (list: ReloadType[]) => {
        let dialog = 0;
        let mobitel = 0;
        let hutch = 0;
        let airtel = 0;

        list.forEach(item => {
            if (item.status !== "PAID") return;

            const price = Number(item.price);
            if (isNaN(price)) return;

            switch (item.simType.toLowerCase()) {
                case "dialog":
                    dialog += price;
                    break;
                case "mobitel":
                    mobitel += price;
                    break;
                case "hutch":
                    hutch += price;
                    break;
                case "airtel":
                    airtel += price;
                    break;
            }
        });
        setDialodPrice(dialog);
        setMobitelPrice(mobitel);
        setHutchPrice(hutch);
        setAirtelPrice(airtel);
        setTotalPrice(dialog + mobitel + hutch + airtel);

        console.log("Dialog:", dialog);
        console.log("Mobitel:", mobitel);
        console.log("Hutch:", hutch);
        console.log("Airtel:", airtel);
    };


    const handleFinish = (values: { search: string }) => {
        console.log("Search value:", values.search);
    };

    // Fetch data from backend
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await viewAllTodayReload();
            console.log(response.data);
            setData(response.data.data);
            setFilteredData(response.data.data);
            calculateReloadPrice(response.data.data);
        } catch (error) {
            console.error('Failed to fetch reload:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data from backend
    const fetchPreviouseReloadData = async (date: string) => {
        setLoading(true);
        try {
            const response = await viewAllPreviousReload(date);
            console.log(response.data);
            if (response.data.data == null) {
                fetchData();
            } else {
                setData(response.data.data);
                setFilteredData(response.data.data);
                calculateReloadPrice(response.data.data);
            }

        } catch (error) {
            console.error('Failed to fetch reload:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (value: string) => {
        const searchValue = value.trim();
        if (!searchValue) return setFilteredData(data);
        const result = data.filter(
            (item: any) => item.description.toLowerCase().includes(searchValue)
        );
        setFilteredData(result);
    };

    return (
        <div className="p-[10px] overflow-y-auto max-h-[35rem]">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-2">රිලෝඩ්(Reload's) කළමාණාකරණය.</h2>
            <div>
                <div className='flex justify-between items-center'>
                    <div>
                        <Box sx={{
                            width: {
                                xs: '100%',   // mobile
                                sm: '80%',    // small tablets
                                md: '100%',    // laptops & desktop
                            }, mt: 4
                        }}>
                            <Form form={form} onFinish={handleFinish}>
                                <Space orientation="vertical" style={{ width: "100%" }}>
                                    <Form.Item
                                        name="search"
                                    >
                                        <Search
                                            placeholder="ගණුදෙනුකරුගේ නම"
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
                    <div>
                        <div className="bg-white rounded-lg border border-gray-200 p-3">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-semibold text-gray-700">Telecom Bills</h4>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">4 Providers</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                                        <span className="text-white text-xs font-bold">D</span>
                                    </div>
                                    <span className="text-sm text-gray-700 mr-2">Dialog</span>
                                    <span className="text-sm font-bold text-blue-700">{`RS.${dialodPrice}`}</span>
                                </div>

                                <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
                                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-2">
                                        <span className="text-white text-xs font-bold">M</span>
                                    </div>
                                    <span className="text-sm text-gray-700 mr-2">Mobitel</span>
                                    <span className="text-sm font-bold text-red-700">{`RS.${mobitelPrice}`}</span>
                                </div>

                                <div className="flex items-center bg-purple-50 px-3 py-2 rounded-lg">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                                        <span className="text-white text-xs font-bold">H</span>
                                    </div>
                                    <span className="text-sm text-gray-700 mr-2">Hutch</span>
                                    <span className="text-sm font-bold text-purple-700">{`RS.${hutchPrice}`}</span>
                                </div>

                                <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                                        <span className="text-white text-xs font-bold">A</span>
                                    </div>
                                    <span className="text-sm text-gray-700 mr-2">Airtel</span>
                                    <span className="text-sm font-bold text-green-700">{`RS.${airtelPrice}`}</span>
                                </div>
                            </div>

                            {/* Total - Very Compact */}
                            <div className="mt-2 pt-2 border-t border-gray-100 text-right">
                                <span className="text-xs text-gray-500">Total: </span>
                                <span className="text-sm font-bold text-gray-900">Rs.{totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2 mt-[20px]'>
                    <CreateReloadDrawer reloadTable={fetchData} />
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
                    <DatePicker size="middle" placeholder='දවස තෝරන්න' onChange={(date, dateString) => {
                        console.log(date);
                        fetchPreviouseReloadData(dateString || "");
                    }} />
                </div>
            </div>

            <div className="mt-5">
                <ReloadTable tableData={filteredData} loadingData={loading} backendApi={fetchData} />
            </div>
        </div>
    );
}
