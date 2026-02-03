import { useEffect, useState } from 'react';
import CategoryItem from '../components/CategoryItem';
import ProductItem from '../components/ProductItem';
import CompactCartItem from '../components/CartItem';
import CircularProgressWithLabel from '../components/PrograssBar';
import { Box } from '@mui/material';
import axios from 'axios';
import { Button, Form, Input, Space } from 'antd';
import { showNotification } from '../components/Notification';
import API_ENDPOINTS from '../../../constant/backend-endpoints';
import CreateExpensiveDrawer from '../function/CreateExpensiveDrawer';
import { ProductType } from '../../../model/BaseCreateProduct';

interface CartItem extends responseProductByCategory {
    quantity: number;
}

interface responseProductByCategory {
    productId: number,
    productName: string;
    sellingPrice: number
    onAddToCart?: () => void;
}

interface responseCategoryData {
    categoryId: number,
    name: string
}

const { Search } = Input;
export default function DashBoard() {
    const [form] = Form.useForm();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [categories, setCategories] = useState<responseCategoryData[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [filterProduct, setFilterProducts] = useState<ProductType[]>([]);
    const [phoneNumber, setphoneNumber] = useState<string>();
    const [customerId, setCustomerId] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch data from backend
    const fetchData = async (type: string) => {
        setLoading(true);
        try {
            const response = await axios.get(API_ENDPOINTS.VIEW_ALL_CATEGORY);
            const productResponse = await axios.get(
                API_ENDPOINTS.GET_ALL_PRODUCT_SINGLE_CATEGORY,
                {
                    params: {
                        type: type,
                    },
                }
            );
            setCategories(response.data.data);
            setProducts(productResponse.data.data);
            setFilterProducts(productResponse.data.data);
            console.log(productResponse.data.data);

        } catch (error) {
            console.error('Failed to fetch customers:', error);
        } finally {
            setLoading(false);
            console.log(loading);
        }
    };

    useEffect(() => {
        fetchData("PHONE");
    }, []);

    const loadProductItem = (categoryName: string) => {
        console.log(categoryName);
        fetchData(categoryName);

    }

    const handleIncrease = (id: number) => {
        setCartItems(items =>
            items.map(item =>
                item.productId === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrease = (id: number) => {
        setCartItems(items =>
            items.map(item =>
                item.productId === id
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    const handleRemove = (id: number | string) => {
        console.log("Removing ID:", id);
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.productId !== id)
        );
    };

    const handleAddToCart = (product: responseProductByCategory) => {
        setCartItems((prev) => {
            const existing = prev.find(item => item.productId === product.productId);

            if (existing) {
                return prev.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const [loadBar, setLoadBar] = useState(true);
    setInterval(() => {
        setLoadBar(false)
    }, 500);

    const handleFinish = (values: { search: string }) => {
        console.log("Search value:", values.search);
        showNotification(
            "success",
            "Success",
            "Product created successfully!"
        );
    };
    const checkCustomer = async () => {
        try {
            const customerResponse = await axios.get(
                API_ENDPOINTS.VIEW_SINGLE_CUSTOMER,
                {
                    params: {
                        customerId: phoneNumber?.trim(),
                    },
                }
            );
            console.log(customerResponse.data);
            setCustomerId(customerResponse.data.data.customerID)
            if (customerResponse.data.msg === "Customer Already Existing In System" && customerResponse.data.statusCode === "200") {
                showNotification(
                    "success",
                    "Success",
                    customerResponse.data.msg
                );
            } else {
                showNotification(
                    "error",
                    "Error",
                    customerResponse.data.msg
                );
            }


        } catch (error) {
            console.error('Failed to fetch customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async () => {

    }

    const handleSearch = (value: string) => {
        const searchValue = value.trim();
        if (!searchValue) return setFilterProducts(products);

        const result = products.filter(
            (item: any) => item.foodName.toLowerCase().includes(searchValue)
        );

        setFilterProducts(result);
    };

    return (
        <>
            <div className={(loadBar) ? 'flex mt-[16em] justify-center' : "hidden"}>
                <CircularProgressWithLabel />
            </div>
            <div className={(loadBar) ? "hidden" : ""}>
                <div className='load_item_wrapper flex h-[85vh]'>
                    <div className='w-[70%] bg-white m-[12px] rounded-[10px] p-[15px]'>
                        <div className='flex gap-2 justify-between items-center h-7'>
                            <div className='w-[100%]'>
                                <Box sx={{
                                    width: {
                                        xs: '100%',   // mobile
                                        sm: '80%',    // small tablets
                                        md: '70%',    // laptops & desktop
                                    }, mt: 4
                                }}>
                                    <Form form={form} onFinish={handleFinish}>
                                        <Space orientation="vertical" style={{ width: "100%" }}>
                                            <Form.Item
                                                name="search"
                                            >
                                                <Search
                                                    placeholder="Search item"
                                                    allowClear
                                                    enterButton="Search"
                                                    size="large"
                                                    onChange={(e) => handleSearch(e.target.value)}
                                                />
                                            </Form.Item>
                                        </Space>
                                    </Form>
                                </Box>
                            </div>
                            <div>
                                <CreateExpensiveDrawer />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-[1.7rem] mt-4 font-semibold">කාණ්ඩ (Category)</h2>
                            <div className="flex gap-2 mt-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                                {categories ? (
                                    categories.map((cat) => (
                                        <div
                                            key={cat.categoryId}
                                            onClick={() => loadProductItem(cat.name)}
                                            className="flex-shrink-0"
                                        >
                                            <CategoryItem name={cat.name} count={1} />
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <h2>No Data</h2>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-2">
                            <h2 className="text-[1.7rem] font-semibold">අපගේ උපාංග (Our Product)</h2>

                            <div className="max-h-[250px] overflow-y-auto pr-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 auto-rows-fr">

                                    {filterProduct.length === 0 && <h2>No Data</h2>}

                                    {filterProduct.map((product) => (
                                        <ProductItem
                                            key={product.productId}
                                            {...product}
                                            onAddToCart={() => handleAddToCart(product)}
                                        />
                                    ))}

                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="w-[25%] bg-white m-[12px] rounded-[10px] p-[15px]">
                        <h3 className="text-lg font-semibold mb-2">Cart</h3>
                        <div>
                            <Space.Compact style={{ width: '100%' }}>
                                <Input onChange={(e) => { setphoneNumber(e.target.value) }} placeholder='Check Phone Number' />
                                <Button onClick={() => { checkCustomer() }} type="primary">Submit</Button>
                            </Space.Compact>
                        </div>
                        <div className="h-[290px] overflow-y-auto pr-2">
                            {cartItems.map((item) => (
                                <CompactCartItem
                                    key={item.productId}
                                    id={item.productId}
                                    name={item.productName}
                                    price={item.sellingPrice}
                                    quantity={item.quantity}
                                    onIncrease={() => handleIncrease(item.productId)}
                                    onDecrease={() => handleDecrease(item.productId)}
                                    onRemove={() => handleRemove(item.productId)}
                                />
                            ))}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mt-4">Total: Rs.
                                {cartItems.reduce(
                                    (total, item) => total + item.sellingPrice * item.quantity,
                                    0
                                ).toFixed(2)}

                            </h3>
                        </div>
                        <div>
                            <button onClick={() => { placeOrder() }} className=" w-[100%] mt-2 bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium">Checkout</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
