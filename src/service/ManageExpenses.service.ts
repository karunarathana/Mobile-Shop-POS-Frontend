import axios, { AxiosResponse } from "axios";
import API_ENDPOINTS from "../constant/backend-endpoints";
import BaseReloadResponse from "../model/BaseReloadResponse";
import { BaseExpensesResponse } from "../model/BaseExpensesResponse";

export const viewAllTodayExpenses = async (): Promise<AxiosResponse<BaseExpensesResponse>> => {
  try {
    const response = await axios.get<BaseExpensesResponse>(
      API_ENDPOINTS.VIEWALL_EXPENSES,
    );

    console.log("**********************************");
    console.log("API Call Started In viewAllTodayExpenses");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In viewAllTodayExpenses");
    console.log("**********************************");

    return response;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const createExpense = async (descs:string,price:string): Promise<AxiosResponse<BaseExpensesResponse>> => {
  try {
    const response = await axios.post<BaseExpensesResponse>(
      API_ENDPOINTS.CREATE_EXPENSES,
       null,
      {
        params: {
          description: descs,
          price:price,
        },
      }
    );

    console.log("**********************************");
    console.log("API Call Started In createExpense");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In createExpense");
    console.log("**********************************");

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const updateReload = async (rId:number,descs:string,price:string,simType:string,staus:string): Promise<AxiosResponse<BaseReloadResponse>> => {
  try {
    const response = await axios.post<BaseReloadResponse>(
      API_ENDPOINTS.UPDATE_RELOAD,
       null,
      {
        params: {
          rId:rId,
          description: descs,
          price:price,
          simType:simType,
          status:staus
        },
      }
    );

    console.log("**********************************");
    console.log("API Call Started In updateReload");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In updateReload");
    console.log("**********************************");

    return response;

  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const deleteExpenses = async (
  eId: number,
): Promise<AxiosResponse<BaseReloadResponse>> => {
  console.log(eId);

  try {
    const response = await axios.delete(
      API_ENDPOINTS.DELTE_EXPENSES,
      {
        params: {
          eId: eId,
        },
      }
    );
    console.log("**********************************")
    console.log("API Call Started In deleteExpenses");
    console.log("**********************************")
    console.log("API Response:", response);
    console.log("API Call Finished In deleteExpenses");
    console.log("**********************************")

    return response;
    
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const viewAllPreviousReload = async (date:string): Promise<AxiosResponse<BaseReloadResponse>> => {
  try {
    const response = await axios.get<BaseReloadResponse>(
      API_ENDPOINTS.VIEW_ALL_PREVIOUS_RELOAD,
      {
        params: {
          date: date,
        },
      }
    );

    console.log("**********************************");
    console.log("API Call Started In viewAllPreviousReload");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In viewAllPreviousReload");
    console.log("**********************************");

    return response;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

