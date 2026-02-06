import { Button, DatePicker, Input, Space } from "antd"
import { useEffect, useState } from "react";
import CreateRepaireDrawer from "../function/CreateRepaireDrawer";
import { RepaireType} from "../../../model/BaseRepaireResponse";
import { viewCustomerRepire } from "../../../service/ManageRepaire.service";
import RepairCard from "../components/RepireItem";

export default function ManageRepaire() {
    const [loading, setLoading] = useState<boolean>(false);
    const [repairs, setRepairs] = useState<RepaireType[]>([]);

    // Fetch data from backend
    const fetchData = async () => {

    };

    async function fetchSingleCustomerRepaireDetails() {
        const response = await viewCustomerRepire(1);
        setRepairs(response.data.data);
        console.log("Customer Repaire Details Response:", response);
    }

    useEffect(() => {
        // Initial data fetch or other setup can go here
        fetchData();
        fetchSingleCustomerRepaireDetails();
    }, []);

    return (
        <div className="p-[10px]">
            <div>
                <h2 className="text-[2rem] font-semibold font-sans">අලුත්වැඩියා ආයිතමයන් (Product)</h2>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col md:flex-row gap-4 items-baseline">
                    <div className="w-[100%] mt-1 md:w-[70%]">
                        <Space.Compact style={{
                            width: '100%',
                        }}>
                            <Input placeholder='ගණුදුනුකරුගේ නම ඇතුලත් කරන්න' />
                            <Button type="primary">Submit</Button>
                        </Space.Compact>
                    </div>
                    <CreateRepaireDrawer refreshTable={fetchData} />
                </div>
                <DatePicker size="middle" placeholder='දවස තෝරන්න' onChange={(date, dateString) => { }} />
            </div>
            <div className=" mt-2 overflow-y-auto max-h-[28rem]">
                {repairs.map((repair) => (
                    <RepairCard key={repair.repairId} repair={repair} />
                ))}
            </div>
        </div>
    )
}
