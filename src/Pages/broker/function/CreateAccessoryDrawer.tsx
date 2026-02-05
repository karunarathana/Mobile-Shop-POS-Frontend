import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { createAccessoryProduct } from '../../../service/ManageAccessory.service';
import { showNotification } from '../components/Notification';

interface createproductProps {
    refreshTable: () => void;
}

const CreateAccessoryDrawer: React.FC<createproductProps> = ({ refreshTable }) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = async (values: any) => {
        console.log('Form Values:', values);
        const AccessoryDto = {
            productName: values.name,
            purchasePrice: values.costPrice,
            sellingPrice: values.sellPrice,
            stock: values.quantity,
            status: values.status,
            discountPercentage: values.discountPercentage,
            type: "Battery",
            accessoryDto: {
                rackId: values.rackId,
                brand: values.brand,
                color: values.color,
                compatibleWith: values.compatibleWith,
                categoryId: 1,
                createBy: "admin",
            },
        };
        try {
            const response = await createAccessoryProduct(AccessoryDto);
            console.log(response);
            if (response.data.msg === "Save Product Successfully" && response.data.statusCode === "201") {
                showNotification(
                    "success",
                    "සාර්ථක පණිවිඩය",
                    "උපාංගය සාර්ථකව යාවත්කාලීන කරනු ලදි!!"
                );
                refreshTable();
                setOpen(false);
            }
            if (response.data.statusCode === "400" && response.data.msg === "Already Product In System") {
                showNotification(
                    "error",
                    "දෝශ පණිවිඩය",
                    "උපාංගය දැනටමත් පද්දතියට යොමුකර ඇත!"
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
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                උපාංග ඇතුලත් කරන්න
            </Button>
            <Drawer
                title="නව උපාංග ඇතුලත් කිරීම"
                width={720}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                    </Space>
                }
            >
                <Form layout="vertical" onFinish={onFinish}>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="උපාංග නාමය"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="status"
                                label="උපාංග තත්වය"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    options={[
                                        { value: "ACTIVE", label: "ACTIVE" },
                                        { value: "INACTIVE", label: "INACTIVE" }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="brand"
                                label="Brand"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="rackId"
                                label="Rack ID"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Accessory Type"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="compatibleWith"
                                label="Compatible With"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="costPrice"
                                label="Purchase Price"
                                rules={[{ required: true }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="sellPrice"
                                label="Sell Price"
                                rules={[{ required: true }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="categoryId"
                                label="Category ID"
                                rules={[{ required: true }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="quantity"
                                label="Stock Quantity"
                                rules={[{ required: true }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="discountPercentage"
                                label="Discount Percentage"
                                rules={[{ required: true }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="color"
                                label="Color"
                                rules={[{ required: true }]}
                            >
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Form.Item label={null}>
                            <Button className='mt-4 w-[210px]' type="primary" htmlType="submit">
                                Create Accessory
                            </Button>
                        </Form.Item>
                    </Row>

                </Form>
            </Drawer>

        </>
    );
};

export default CreateAccessoryDrawer;