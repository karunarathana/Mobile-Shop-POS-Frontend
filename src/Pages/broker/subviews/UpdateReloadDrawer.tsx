import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { showNotification } from '../components/Notification';
import { updateReload } from '../../../service/ManageReload.service';

const UpdateReloadDrawer: React.FC<{ rId: number, description: string, price: string, fetchFunc: () => void, simType: string, status: string }> = (props) => {
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
            const response = await updateReload(values.rId,values.rDecs, values.price,values.simType,values.status);
            if (response.data.msg === "Reload update successfully") {
                showNotification(
                    "success",
                    "සාර්ථක පණිවිඩය",
                    "රිලෝඩය සාර්ථක යාවත්කාලීන කරනු ලදි!"
                );
                props.fetchFunc();
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
                title="ගණුදෙනුකරුන්ගේ රිලෝඩ් යාවත්කාලීන කිර්‍රිම"
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
                        rId: props.rId,
                        rDecs: props.description,
                        price: props.price,
                        simType: props.simType,
                        status: props.status
                    }}
                >
                    <div className='hidden'>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="rId"
                                    label="Reload Id"
                                    style={{ width: '400px' }}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="rDecs"
                                label="රිලෝඩ් විස්තරය (Reload Description)"
                                style={{ width: '400px' }}
                                rules={[
                                    { required: true, message: 'කරුණාකර රිලෝඩ් විස්තරය ඇතුලත් කරන්න' },
                                    { min: 3, message: "අවම වශයෙන් අකුරු 5 අවශය වේ." }
                                ]}
                            >
                                <Input placeholder="ගණුදෙනුකරුගේ රිලෝඩ් විස්තරය ඇතුලත් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="රිලෝඩ් වටිනාකම (Reload Price)"
                                style={{ width: '400px' }}
                                rules={[
                                    { required: true, message: 'කරුණාකර ගණුදෙනුකරුගේ රිලෝඩ් වටිනාක ඇතුලත් කරන්න' },
                                ]}
                            >
                                <Input placeholder="ගණුදෙනුකරුගේ රිලෝඩ් වටිනාක ඇතුලත් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item
                                name="simType"
                                label="සිම් වර්ගය"
                                style={{ width: '400px' }}
                                rules={[{ required: true, message: 'කරුණාකර සිම් වර්ගය ඇතුලත් කරන්න.' }]}
                            >
                                <Select
                                    placeholder="සිම් වර්ගය තෝරන්න"
                                    options={[
                                        { value: 'dialog', label: 'Dialog' },
                                        { value: 'hutch', label: 'Hutch' },
                                        { value: 'mobitel', label: 'Mobitel' },
                                        { value: 'airtel', label: 'Airtel' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item
                                name="status"
                                label="කාණ්ඩය"
                                style={{ width: '400px' }}
                                rules={[{ required: true, message: 'කරුණාකර කාණ්ඩය ඇතුලත් කරන්න.' }]}
                            >
                                <Select
                                    placeholder="කාණ්ඩය තෝරන්න"
                                    options={[
                                        { value: 'PAID', label: 'PAID' },
                                        { value: 'PENDING', label: 'PENDING' },
                                    ]}
                                />
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

export default UpdateReloadDrawer;