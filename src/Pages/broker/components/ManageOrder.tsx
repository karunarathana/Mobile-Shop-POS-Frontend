import { Button, Input, Space } from "antd"
import { useEffect, useState } from "react";
import axios from "axios";
import { showNotification } from "./Notification";
import notFound from '../../../assets/Logo/notfound.jpg'
import API_ENDPOINTS from "../../../constant/backend-endpoints";
import SaleCard from "./SaleItem";
import { SaleItem } from "../../../model/SaleResponse";

export default function ManageOrder() {
    const [phoneNumber, setphoneNumber] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [saleData, setSaleData] = useState<SaleItem[]>([]);

    // Fetch data from backend
    const fetchData = async () => {
        try {
            const response = await axios.get(
                API_ENDPOINTS.VIEW_ALL_SALE_ITEMS,
            );

            const items = response.data.saleItems || [];

            setSaleData(items);
            setLoading(items.length > 0);

            console.log("Fetched items:", items);
            console.log("Items count:", items.length);

        } catch (error) {
            console.error('Failed to fetch customers:', error);
            console.log(loading);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial data fetch or other setup can go here
        fetchData();
    }, []);


    const checkCustomer = async () => {
        if (phoneNumber) {
            fetchData();
        } else {
            showNotification(
                "error",
                "Check",
                "Input valid Phone Number"
            );
        }
    }
  
    const handleCancelOrder = (orderItemId: number) => {
        // Implement cancel order logic
        console.log('Cancel order:', orderItemId);
        alert(`Order ${orderItemId} cancelled!`);
    };

    const handleSellOrder = (orderItemId: number) => {
        // Implement sell order logic
        console.log('Sell order:', orderItemId);
        alert(`Order ${orderItemId} sold!`);
    };

    return (
        <div className="p-[10px]">
            <div>
                <h2 className="text-[2rem] font-semibold font-sans">Order Management</h2>
            </div>
            <div className="w-[100%] mt-1 md:w-[30%]">
                <Space.Compact style={{
                    width: '100%',
                }}>
                    <Input onChange={(e) => { setphoneNumber(e.target.value) }} placeholder='Check Phone Number' />
                    <Button onClick={() => { checkCustomer() }} type="primary">Submit</Button>
                </Space.Compact>
            </div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto max-h-[28rem]">
                {saleData.map(item => (
                    <SaleCard key={item.saleItemId} item={item} />
                ))}
            </div>
        </div>
    )
}
