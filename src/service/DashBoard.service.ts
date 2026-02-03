import axios, { AxiosResponse } from "axios";
import API_ENDPOINTS from "../constant/backend-endpoints";

export interface DashboardResponse {
    allProduct: number;
    completedOrders: number;
    pendingOrders: number;
    totalRevenue: number;
    activeCustomers: number;
    todayOrders: number;
}

export interface DashboardStats {
    totalOrders: number;
    completedOrders: number;
    pendingOrders: number;
    totalRevenue: number;
    activeCustomers: number;
    todayOrders: number;
}

export const callDashBoard = async (): Promise<DashboardStats> => {
    try {
        const response = await axios.get<DashboardResponse>(
            API_ENDPOINTS.ALL_DASHBOARD_DETIALS
        );

        console.log("**********************************");
        console.log("API Call Started In callDashBoard");
        console.log("**********************************");
        console.log("API Response:", response.data);
        console.log("API Call Finished In callDashBoard");
        console.log("**********************************");

        const statsObj: DashboardStats = {
            totalOrders: response.data.allProduct,
            completedOrders: response.data.completedOrders,
            pendingOrders: response.data.pendingOrders,
            totalRevenue: response.data.totalRevenue,
            activeCustomers: response.data.activeCustomers,
            todayOrders: response.data.todayOrders,
        };
        return statsObj;
    } catch (error: any) {
        console.error("API Error in callDashBoard:", error);
        throw error;
    }
};