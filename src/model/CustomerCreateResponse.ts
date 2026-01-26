interface DataType {
    customerID: number;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    phoneNumber: string;
    status: string;
    registeredAt: string;
}

interface CreateCustomerResponse{
    data: DataType;
    msg: string;
    statusCode: string;
}

export default CreateCustomerResponse;