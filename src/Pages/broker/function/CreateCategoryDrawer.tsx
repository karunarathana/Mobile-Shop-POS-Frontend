import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { showNotification } from '../components/Notification';
import { createCategory } from '../../../service/CreateCategory.service';

interface CreateCategoryProps {
    backendApi: () => void;
}

const CreateCategoryDrawer: React.FC<CreateCategoryProps> = ({
    backendApi
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
        console.log('Form Values:', values.categoryName);
        try {
            const response = await createCategory(values);

            if (response.data.msg === "Successfully create new category" && response.data.statusCode === "201") {
                showNotification(
                    "success",
                    "සාර්ථක පණිවිඩය",
                    "සාර්ථක කාණ්ඩයක් (Category) එකතු කරනු ලදි!"
                );
                backendApi();
            }
            if (response.data.statusCode === "400" && response.data.msg === "Oops Already Existing CategoryName") {
                showNotification(
                    "error",
                    "දෝශ පණිවිඩය",
                    "දැනටමත් කාණ්ඩයක් (Category) එක්කර ඇත!"
                );
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
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                නිවැරදි කාණ්ඩයක් (Category) එක්කරන්න.
            </Button>
            <Drawer
                title="නිවැරදි කාණ්ඩයක් (Category) ඒක්කරන්න"
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
                <Form layout="vertical" requiredMark={true} onFinish={onFinish}>
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
                                ඇතුලත් කරන්න
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default CreateCategoryDrawer;