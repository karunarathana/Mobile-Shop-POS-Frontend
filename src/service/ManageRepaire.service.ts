import axios, { AxiosResponse } from "axios";
import API_ENDPOINTS from "../constant/backend-endpoints";
import { BaseRepaireResponse } from "../model/BaseRepaireResponse";

export const createRepaire = async (repairDto:any): Promise<AxiosResponse<BaseRepaireResponse>> => {
  try {
    const response = await axios.post<BaseRepaireResponse>(
      API_ENDPOINTS.CREATE_REPAIR,
      repairDto,
    );

    console.log("**********************************");
    console.log("API Call Started In createRepaire");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In createRepaire");
    console.log("**********************************");

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const viewCustomerRepire = async (customerID: number): Promise<AxiosResponse<BaseRepaireResponse>> => {
  try {
    const response = await axios.get<BaseRepaireResponse>(
      API_ENDPOINTS.VIEW_ALL_SINGLE_CUSTOMER_REPAIRS,
      {
        params: {
          cusId: customerID,
        },
      }
    );

    console.log("**********************************");
    console.log("API Call Started In viewCustomerRepire");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In viewCustomerRepire");
    console.log("**********************************");

    return response;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};
