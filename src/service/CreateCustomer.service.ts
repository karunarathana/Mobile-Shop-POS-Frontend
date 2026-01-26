import axios, { AxiosResponse } from "axios";
import API_ENDPOINTS from "../constant/backend-endpoints";
import CreateCustomerResponse from "../model/CustomerCreateResponse";

export const createCustomer = async (
  values: any
): Promise<AxiosResponse<CreateCustomerResponse>> => {
  try {
    const response = await axios.post<CreateCustomerResponse>(
      API_ENDPOINTS.CREATE_CUSTOMER,
      values
    );

    console.log("**********************************");
    console.log("API Call Started In CreateCustomer");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In CreateCustomer");
    console.log("**********************************");

    return response;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const deleteCustomer = async (
  customerId: number,
): Promise<AxiosResponse<CreateCustomerResponse>> => {
  console.log(customerId);

  try {
    const response = await axios.delete(
      API_ENDPOINTS.DELTE_CUSTOMERS,
      {
        params: {
          customerId: customerId,
        },
      }
    );
    console.log("**********************************")
    console.log("API Call Started In Customer Delete");
    console.log("**********************************")
    console.log("API Response:", response);
    console.log("API Call Finished In Customer Delete");
    console.log("**********************************")

    return response;
    
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const updateCustomer = async (
  values: any
): Promise<AxiosResponse<CreateCustomerResponse>> => {
  try {
    const response = await axios.post<CreateCustomerResponse>(
      API_ENDPOINTS.UPDATE_CUSTOMERS,
      values
    );

    console.log("**********************************");
    console.log("API Call Started In UpdateCustomer");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In UpdateCustomer");
    console.log("**********************************");

    return response;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};
