import axios, { AxiosResponse } from "axios";
import CategoryResponse from "../model/CategoryResponse";
import API_ENDPOINTS from "../constant/backend-endpoints";

export const createCategory = async (
  values: any
): Promise<AxiosResponse<CategoryResponse>> => {
  console.log('Form Values:', values.categoryName);
  try {
    const response = await axios.post(
      API_ENDPOINTS.CREATE_CATEGORY,
      null,
      {
        params: {
          categoryName: values.categoryName,
        },
      }
    );

    console.log("**********************************")
    console.log("API Call Started In CreateCategory");
    console.log("**********************************")
    console.log("API Response:", response);
    console.log("API Call Finished In CreateCategory");
    console.log("**********************************")

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const updateCategory = async (
  values: any
): Promise<AxiosResponse<CategoryResponse>> => {
  console.log('Form Values:', values.categoryName);
  try {
    const response = await axios.post(
      API_ENDPOINTS.UPDATE_CATEGORY,
      null,
      {
        params: {
          categoryId: values.categoryId,
          categoryName: values.categoryName
        },
      }
    );
    console.log("**********************************");
    console.log("API Call Started In UpdateCategory");
    console.log("**********************************");
    console.log("API Response:", response);
    console.log("API Call Finished In UpdateCategory");
    console.log("**********************************");


    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const deleteCategory = async (
  key: number
): Promise<AxiosResponse<CategoryResponse>> => {
  console.log('Category Id:', key);
  console.log(key);

  try {
    const response = await axios.delete(
      API_ENDPOINTS.DELTE_CATEGORY,
      {
        params: {
          categoryId: key,
        },
      }
    );
    console.log("**********************************")
    console.log("API Call Started In Category Delete");
    console.log("**********************************")
    console.log("API Response:", response);
    console.log("API Call Finished In Category Delete");
    console.log("**********************************")

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;

  }
};

export const viewAllCategory = async (): Promise<AxiosResponse<CategoryResponse>> => {
  try {
    const response = await axios.get<CategoryResponse>(
      API_ENDPOINTS.VIEW_ALL_CATEGORY,
    );

    console.log("**********************************");
    console.log("API Call Started In viewAllCategory");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In viewAllCategory");
    console.log("**********************************");

    return response;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};