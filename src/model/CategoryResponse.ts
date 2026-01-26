interface CategoryType {
    categoryId: number;
    name: string;
}
interface CategoryResponse{
    statusCode:string;
    msg:string;
    data:CategoryType[];
}
export default CategoryResponse;