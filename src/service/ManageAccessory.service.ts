import axios, { AxiosResponse } from "axios";
import BaseproductResponse from "../model/BaseCreateProduct";
import API_ENDPOINTS from "../constant/backend-endpoints";


export const createProduct = async (values: any): Promise<AxiosResponse<BaseproductResponse>> => {
  console.log('Form Values:', values);
  try {
    const response = await axios.post<BaseproductResponse>(
      API_ENDPOINTS.CREATE_PRODUCT,
      values,
    );

    console.log("**********************************");
    console.log("API Call Started In createProduct");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In createProduct");
    console.log("**********************************");

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const updateProduct = async (values: any): Promise<AxiosResponse<BaseproductResponse>> => {
  console.log('Form Values:', values);
  try {
    const response = await axios.post<BaseproductResponse>(
      API_ENDPOINTS.UPDATE_PRODUCT,
      values,
    );

    console.log("**********************************");
    console.log("API Call Started In updateProduct");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In updateProduct");
    console.log("**********************************");

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const viewAllProduct = async (): Promise<AxiosResponse<BaseproductResponse>> => {
  try {
    const response = await axios.get<BaseproductResponse>(
      API_ENDPOINTS.GET_ALL_PRODUCT_SINGLE_CATEGORY,
      {
        params: {
          type: "Back Covers",
        },
      }
    );

    console.log("**********************************");
    console.log("API Call Started In viewAllProduct");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In viewAllProduct");
    console.log("**********************************");

    return response;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const deleteProduct = async (
  productId: number,
): Promise<AxiosResponse<BaseproductResponse>> => {
  console.log(productId);

  try {
    const response = await axios.delete(
      API_ENDPOINTS.DELTE_PRODUCT,
      {
        params: {
          ProductId: productId,
        },
      }
    );
    console.log("**********************************")
    console.log("API Call Started In deleteProduct");
    console.log("**********************************")
    console.log("API Response:", response);
    console.log("API Call Finished In deleteProduct");
    console.log("**********************************")

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};