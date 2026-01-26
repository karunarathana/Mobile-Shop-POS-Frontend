import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { showNotification } from '../components/Notification';
import { updateCategory } from '../../../service/CreateCategory.service';

const UpdateCategoryDrawer: React.FC<{ categoryName: string, categoryId: number,reloadTable:()=>void }> = (props) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = async (values: any) => {
        console.log('Form Values:', values.categoryName);
        try {
            const response = await updateCategory(values);
            if (response.data.msg === "Update Successfully" && response.data.statusCode === "200") {
                showNotification(
                    "success",
                    "සාර්ථක පණිවිඩය",
                    "සාර්ථක යාවත්කාලීන කරනු ලදි!"
                );
                props.reloadTable();
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
                title="කාණ්ඩ යාවත්කාලීන කරන්න."
                size={450}
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
                        categoryId: props.categoryId,
                        categoryName: props.categoryName
                    }}
                >
                    <div className='hidden'>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="categoryId"
                                    label="Category Name"
                                    style={{ width: '400px' }}
                                    rules={[
                                        { required: true, message: 'Please enter category name' },
                                    ]}
                                >
                                    <Input placeholder="Enter category name" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="categoryName"
                                label="කාණ්ඩයක (Category) නාමයක්"
                                style={{ width: '400px' }}
                                rules={[
                                    { required: true, message: 'කරුණාකර කාණ්ඩයක නාමයක් සදහන් කරන්න.' },
                                ]}
                            >
                                <Input placeholder="කරුණාකර කාණ්ඩයක නාමයක් ඇතුලත් කරන්න." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                යාවත්කාලීන කරන්න
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default UpdateCategoryDrawer;