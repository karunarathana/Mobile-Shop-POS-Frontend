import axios, { AxiosResponse } from "axios";
import API_ENDPOINTS from "../constant/backend-endpoints";

export const createSale = async (saleDto: any): Promise<AxiosResponse<string>> => {
  try {
    const response = await axios.post<string>(
      API_ENDPOINTS.CREATE_SALE,
       saleDto,
    );

    console.log("**********************************");
    console.log("API Call Started In createSale");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In createSale");
    console.log("**********************************");

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};