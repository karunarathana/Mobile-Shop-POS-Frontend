import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { createProduct } from '../../../service/ManageAccessory.service';
import { showNotification } from '../components/Notification';

interface createproductProps {
    refreshTable: () => void;
}

const categories = [
    { categoryId: 2, name: "Battery" },
    { categoryId: 1, name: "Mobile Phone" }
];

const CreateProductDrawer: React.FC<createproductProps> = ({ refreshTable }) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = async (values: any) => {
        console.log('Form Values:', values);
        const phoneDto = {
            productName: values.name,
            purchasePrice: values.purchasePrice,
            sellingPrice: values.sellingPrice,
            stock: values.quantityInStock,
            status: values.staus,
            discountPercentage: values.discount,
            type: "Mobile Phone",
            phoneDto: {
                brand: values.brand,
                model: values.modal,
                imeiNumber: values.imeiNumber,
                color: values.color,
                storageCapacity: values.storageCapacity,
                condition: values.condition,
                categoryId: values.categoryId,
                createBy: "admin",
            },
        };
        console.log("Phone DTO ",phoneDto);
        
        try {
            const response = await createProduct(phoneDto);
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
                                name="name"
                                label="උපාංග නාමය"
                                rules={[{ required: true, message: 'කරුණාකර උපාංග නාමය ඇතුලත් කරන්න' }]}
                            >
                                <Input placeholder="කරුණාකර උපාංග නාමය සදහන් කරන්න" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="staus"
                                label="උපාංග තත්වය"
                                rules={[{ required: true, message: 'කරුණාකර උපාංග තත්වය කරන්න.' }]}
                            >
                                <Select
                                    placeholder="කාණ්ඩය උපාංග තත්වය තෝරන්න"
                                    options={[
                                        { value: 'ACTIVE', label: 'IN-STOCK' },
                                        { value: 'INACTIVE', label: 'OUT-STOCK' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="categoryId"
                                label="උපාංගයේ කාණ්ඩය"
                                rules={[{ required: true, message: 'කරුණාකර උපාංගයේ කාණ්ඩය ඇතුලත් කරන්න' }]}
                            >
                                <Select
                                    placeholder="කරුණාකර උපාංගයේ කාණ්ඩය සදහන් කරන්න"
                                    options={categories.map(cat => ({
                                        label: cat.name,     
                                        value: cat.categoryId   
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="brand"
                                label="උපාංගයේ වර්ගය"
                            >
                                <Input placeholder="කරුණාකර උපාංගයේ වර්ගය සදහන් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="discount"
                                label="උපාගයේ වට්ටම (Discount %)"
                            >
                                <Input type={"number"} placeholder="කරුණාකර උපාගයේ වට්ටම ඇතුලත් කරන්න" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="color"
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
                                name="others"
                                label="වෙනත් (Others)"
                            >
                                <Input type={"text"} placeholder="කරුණාකර උපාංගයේ වෙනත් සදහන් කරන්න" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="imeiNumber"
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
                                name="condition"
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
                                name="storageCapacity"
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
                                    name="purchasePrice"
                                    label="උපාංගයේ ලබාගත් මිල(Purchase price)"
                                    rules={[{ required: true, message: 'කරුණාකර උපාංගයේ ලබාගත් මිල ඇතුලත් කරන්න' }]}
                                >
                                    <Input type={"number"} placeholder="කරුණාකර උපාංගයේ ලබාගත් මිල සදහන් කරන්න" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="sellingPrice"
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
                                    name="modal"
                                    label="උපාංගයේ මොඩල් නම (Model)"
                                    rules={[{ required: true, message: 'කරුණාකර උපාංගයේ මොඩල් නම ඇතුලත් කරන්න' }]}
                                >
                                    <Input type={"text"} placeholder="කරුණාකර උපාංගයේ මොඩල් නම සදහන් කරන්න" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="quantityInStock"
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