import axios, { AxiosResponse } from "axios";
import API_ENDPOINTS from "../constant/backend-endpoints";
import BaseReloadResponse from "../model/BaseReloadResponse";

export const viewAllTodayReload = async (): Promise<AxiosResponse<BaseReloadResponse>> => {
  try {
    const response = await axios.get<BaseReloadResponse>(
      API_ENDPOINTS.ALL_TODAY_RELOAD_DETIALS,
    );

    console.log("**********************************");
    console.log("API Call Started In viewAllTodayReload");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In viewAllTodayReload");
    console.log("**********************************");

    return response;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export const createReload = async (descs:string,price:string,simType:string,staus:string): Promise<AxiosResponse<BaseReloadResponse>> => {
  try {
    const response = await axios.post<BaseReloadResponse>(
      API_ENDPOINTS.CREATE_RELOAD,
       null,
      {
        params: {
          description: descs,
          price:price,
          simType:simType,
          status:staus
        },
      }
    );

    console.log("**********************************");
    console.log("API Call Started In createReload");
    console.log("**********************************");
    console.log("API Response:", response.data);
    console.log("API Call Finished In createReload");
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

export const deleteReload = async (
  reloadId: number,
): Promise<AxiosResponse<BaseReloadResponse>> => {
  console.log(reloadId);

  try {
    const response = await axios.delete(
      API_ENDPOINTS.DELETE_RELOAD,
      {
        params: {
          reloadId: reloadId,
        },
      }
    );
    console.log("**********************************")
    console.log("API Call Started In deleteReload");
    console.log("**********************************")
    console.log("API Response:", response);
    console.log("API Call Finished In deleteReload");
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

