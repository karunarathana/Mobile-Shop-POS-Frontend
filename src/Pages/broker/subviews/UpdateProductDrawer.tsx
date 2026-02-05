import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { showNotification } from '../components/Notification';
import { updateAccessoryProduct} from '../../../service/ManageAccessory.service';
import { UpdateProductAccessoryDrawerProps } from '../../../model/BaseCreateProduct';

const UpdateProductDrawer: React.FC<UpdateProductAccessoryDrawerProps> = ({
    productId,
    accessoryId,
    productName,
    brand,
    purchasePrice,
    sellingPrice,
    categoryId,
    discountPercentage,
    status,
    color,
    rackId,
    type,
    compatibleWith,
    quantityInStock,
    refreshTable
}) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = async (values: any) => {
        console.log('Form Values:', values);
        try {
            const AccessoryDto = {
                productId: productId,
                productName: values.name,
                accessoryId: accessoryId,
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
            console.log(AccessoryDto);
            const response = await updateAccessoryProduct(AccessoryDto)
            console.log("API Response ",response);
            

            if (response.data.msg === "Accessory Updated successfully" && response.data.statusCode === "200") {
                showNotification(
                    "success",
                    "සාර්ථක පණිවිඩය",
                    "උපාංගය සාර්ථකව යාවත්කාලීන කරනු ලදි!!"
                );
                refreshTable();
            }
        } catch (error: any) {
            console.error("API Error:", error);
            showNotification(
                "error",
                "දෝශ පණිවිඩය",
                error.response?.data?.message || "පද්ධතියේ දෝශයක් ඇත!"
            );
        }
        form.resetFields();
        setOpen(false);
    };

    return (
        <>
            <a onClick={showDrawer}>
                <EditOutlined style={{ color: '#1890ff', fontSize: '18px', cursor: 'pointer' }} />
            </a>
            <Drawer
                title="උපාංග යාවත්කාලීන (Update) කිර්‍රිම."
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
                <Form layout="vertical" requiredMark={true} onFinish={onFinish}
                    initialValues={{
                        productId: productId,
                        categoryId: categoryId,
                        name: productName,
                        status: status,
                        brand: brand,
                        discountPercentage: discountPercentage,
                        color: color,
                        rackId: rackId,
                        compatibleWith: compatibleWith,
                        costPrice: purchasePrice,
                        sellPrice: sellingPrice,
                        quantity: quantityInStock,
                        type: type
                    }}
                >
                    <div>
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
                                    label="උපාංගයේ ලබාගත් මිල(Purchase price)"
                                    rules={[{ required: true, message: 'කරුණාකර උපාංගයේ ලබාගත් මිල ඇතුලත් කරන්න' }]}
                                >
                                    <Input type={"number"} placeholder="කරුණාකර උපාංගයේ ලබාගත් මිල සදහන් කරන්න" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="sellPrice"
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
                                    label="උපාංගයේ ගණන (Stock)"
                                    rules={[{ required: true, message: 'කරුණාකර උපාංගයේ ගණන ඇතුලත් කරන්න' }]}
                                >
                                    <Input type={"number"} placeholder="කරුණාකර උපාංගයේ ගණන සදහන් කරන්න" />
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
                    </div>
                    <Row gutter={16}>
                        <Form.Item label={null}>
                            <Button className='mt-4 w-[210px]' type="primary" htmlType="submit">
                                Update Accessory
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default UpdateProductDrawer;