import { Button, DatePicker, Input, Space } from "antd"
import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../../constant/backend-endpoints";
import SaleCard from "./SaleItem";
import { Sale } from "../../../model/SaleResponse";

export default function ManageOrder() {
    const [loading, setLoading] = useState<boolean>(false);
    const [saleData, setSaleData] = useState<Sale[]>([]);

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

    return (
        <div className="p-[10px]">
            <div>
                <h2 className="text-[2rem] font-semibold font-sans">විකුණුම් ආයිතමයන් (Product)</h2>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="w-[100%] mt-1 md:w-[30%]">
                    <Space.Compact style={{
                        width: '100%',
                    }}>
                        <Input placeholder='ගණුදුනුකරුගේ නම ඇතුලත් කරන්න' />
                        <Button type="primary">Submit</Button>
                    </Space.Compact>
                </div>
                <DatePicker size="middle" placeholder='දවස තෝරන්න' onChange={(date, dateString) => { 
                    console.log(date);
                    console.log(dateString);
                    
                    
                }} />
            </div>
            <div className="overflow-y-auto max-h-[28rem]">
                {saleData.map((item, index) => (
                    <SaleCard key={index} sale={item} />
                ))}
            </div>
        </div>
    )
}
