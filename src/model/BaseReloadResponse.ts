interface ReloadType {
    reloadId: number;
    price: string;
    description: string;
    date: string;
    createdAt: string;
    simType:string;
    status:string;
}

interface BaseReloadResponse {
    data: ReloadType[];
    msg: string;
    statusCode: string;
}

export default BaseReloadResponse;