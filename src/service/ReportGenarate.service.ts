import axios, { AxiosResponse } from "axios";
import API_ENDPOINTS from "../constant/backend-endpoints";

export const genarateBill = async (): Promise<AxiosResponse<string>> => {
  try {
    const response = await axios.get<string>(
      API_ENDPOINTS.GENARATE_BILL
    );

    console.log("**********************************");
    console.log("API Call Started In genarateBill");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In genarateBill");
    console.log("**********************************");

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};