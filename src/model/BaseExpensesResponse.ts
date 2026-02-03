interface ExpensesType {
    expensesId: number,
    price: string;
    description: string;
    date: string;
    createdAt: string;
}

export interface BaseExpensesResponse {
    data: ExpensesType[];
    msg: string;
    status: string;
}

export interface ExpensesResponseType {
    expensesId: number,
    price: string;
    description: string;
    date: string;
    createdAt: string;
}
