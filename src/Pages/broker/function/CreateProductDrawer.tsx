import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { showNotification } from '../components/Notification';
import axios from 'axios';
import API_ENDPOINTS from '../../../constant/backend-endpoints';

interface DataType {
    categoryId: number;
    name: string;
}

const CreateProductDrawer: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_ENDPOINTS.VIEW_ALL_CATEGORY);
            setData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch category:', error);
        } finally {
            setLoading(false);
            console.log(loading);

        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const onFinish = async (values: any) => {
        console.log('Form Values:', values);
        const productDto = {
            "foodName": values.foodName,
            "foodPrice": values.foodPrice,
            "categoryId": values.categoryId,
            "size": values.size,
            "sizeOfPotion": null,
            "discountPercentage": values.discountPercentage | 0,
            "updatedBy": "Anuja"
        }
        try {
            const response = await axios.post(
                API_ENDPOINTS.CREATE_PRODUCT,
                productDto
            );
            console.log("**********************************")
            console.log("API Call Started In CreateProductDrawer");
            console.log("**********************************")
            console.log("API Response:", response.data);
            console.log("API Call Finished In CreateProductDrawer");
            console.log("**********************************")

            if (response.data.msg === "Save Product Successfully" && response.data.statusCode === "201") {
                showNotification(
                    "success",
                    "Success",
                    "Product created successfully!"
                );
            }
            if (response.data.statusCode === "400" && response.data.msg === "Already Product In System") {
                showNotification(
                    "error",
                    "Error",
                    "Product already exists!"
                );
            }
            if (response.data.statusCode === "500") {
                showNotification(
                    "error",
                    "Error",
                    "Please Change the email and phone number!"
                );
            }
        } catch (error: any) {
            console.error("API Error:", error);
            showNotification(
                "error",
                "Error",
                error.response?.data?.message || "Something went wrong!"
            );
        }
        form.resetFields();
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                උපාංග ඇතුලත් කරන්න
            </Button>
            <Drawer
                title="නව උපාංග ඇතුලත් කිර්‍රිම."
                size={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                    </Space>
                }
            >
                <Form layout="vertical" requiredMark={true} onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="foodName"
                                label="උපාංග නාමය"
                                rules={[{ required: true, message: 'කරුණාකර උපාංග නාමය ඇතුලත් කරන්න' }]}
                            >
                                <Input placeholder="කරුණාකර උපාංග නාමය සදහන් කරන්න" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="foodPrice"
                                label="උපාංගයේ මිල"
                                rules={[{ required: true, message: 'කරුණාකර උපාංගයේ මිල ඇතුලත් කරන්න' }]}
                            >
                                <Input placeholder="කරුණාකර උපාංගයේ මිල සදහන් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="categoryId"
                                label="උපාංග කාණ්ඩය"
                                rules={[{ required: true, message: 'කරුණාක උපාංග කාණ්ඩය තෝරන්න' }]}
                            >
                                <Select
                                    placeholder="කරුණාක උපාංග කාණ්ඩය තෝරන්න"
                                    options={data.map((category: DataType) => ({
                                        label: category.name,
                                        value: category.categoryId,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="foodPrice"
                                label="උපාංගයේ වර්ගය"
                            >
                                <Input placeholder="කරුණාකර උපාංගයේ වර්ගය සදහන් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="discountPercentage"
                                label="උපාගයේ වට්ටම (Discount %)"
                            >
                                <Input type={"number"} placeholder="කරුණාකර උපාගයේ වට්ටම ඇතුලත් කරන්න" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="foodPrice"
                                label="උපාංගයේ වර්ණය"
                                rules={[{ required: true, message: 'කරුණාකර උපාංගයේ වර්ණය ඇතුලත් කරන්න' }]}
                            >
                                <Input placeholder="කරුණාකර උපාංගයේ වර්ණය සදහන් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="foodPrice"
                                label="වෙනත් (Others)"
                            >
                                <Input type={"number"} placeholder="කරුණාකර උපාංගයේ වෙනත් සදහන් කරන්න" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="foodPrice"
                                label="උපාංගයේ IMEI"
                                rules={[{ required: true, message: 'කරුණාකර උපාංගයේ IMEI ඇතුලත් කරන්න' }]}
                            >
                                <Input type={"number"} placeholder="කරුණාකර උපාංගයේ IMEI සදහන් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="size"
                                label="උපාංගයේ තත්වය"
                                rules={[{ required: true, message: 'කරුණාකර උපාංගයේ තත්වය ඇතුලත් කරන්න' }]}
                            >
                                <Select
                                    placeholder="කරුණාකර උපාංගයේ තත්වය සදහන් කරන්න"
                                    options={[
                                        { label: 'Brand New', value: 'New' },
                                        { label: 'Used', value: 'Used' },
                                        { label: 'Others', value: 'Others' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="foodPrice"
                                label="උපාංගයේ ධාරිතාවය(Storage)"
                                rules={[{ required: true, message: 'කරුණාකර උපාංගයේ ධාරිතාවය ඇතුලත් කරන්න' }]}
                            >
                                <Input type={"number"} placeholder="කරුණාකර උපාංගයේ ධාරිතාවය සදහන් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="foodPrice"
                                    label="උපාංගයේ ලබාගත් මිල(Purchase price)"
                                    rules={[{ required: true, message: 'කරුණාකර උපාංගයේ ලබාගත් මිල ඇතුලත් කරන්න' }]}
                                >
                                    <Input type={"number"} placeholder="කරුණාකර උපාංගයේ ලබාගත් මිල සදහන් කරන්න" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="foodPrice"
                                    label="උපාංගයේ විකුණුම් මිල(Sell price)"
                                    rules={[{ required: true, message: 'කරුණාකර උපාංගයේ විකුණුම් මිල ඇතුලත් කරන්න' }]}
                                >
                                    <Input type={"number"} placeholder="කරුණාකර උපාංගයේ විකුණුම් මිල සදහන් කරන්න" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="foodPrice"
                                    label="උපාංගයේ විකුණුම් මිල(Sell price)"
                                    rules={[{ required: true, message: 'කරුණාකර උපාංගයේ විකුණුම් මිල ඇතුලත් කරන්න' }]}
                                >
                                    <Input type={"number"} placeholder="කරුණාකර උපාංගයේ විකුණුම් මිල සදහන් කරන්න" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="foodPrice"
                                    label="උපාංගයේ ගණන (Stock)"
                                    rules={[{ required: true, message: 'කරුණාකර උපාංගයේ ගණන ඇතුලත් කරන්න' }]}
                                >
                                    <Input type={"number"} placeholder="කරුණාකර උපාංගයේ ගණන සදහන් කරන්න" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <Row gutter={16}>
                        <Form.Item label={null}>
                            <Button className='mt-4 w-[210px]' type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default CreateProductDrawer;