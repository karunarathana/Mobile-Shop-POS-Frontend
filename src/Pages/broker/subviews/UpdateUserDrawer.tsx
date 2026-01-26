import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { showNotification } from '../components/Notification';
import { updateCustomer } from '../../../service/CreateCustomer.service';

const UpdateCustomerDrawer: React.FC<{ cId: number, name: string,address:string, email: string, phone: string, fetchFunc: () => void }> = (props) => {
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
            const response = await updateCustomer(values);
            if (response.data.msg === "Customer Save Successfully" && response.data.statusCode === "201") {
                showNotification(
                    "success",
                    "සාර්ථක පණිවිඩය",
                    "සාර්ථක යාවත්කාලීන කරනු ලදි!"
                );
                props.fetchFunc();
            }
            if (response.data.statusCode === "400" && response.data.msg === "Already user have account") {
                showNotification(
                    "error",
                    "දෝශ පණිවිඩය",
                    "ගණුදෙනුකරු දැනටමත් ලියාපදිංචි වී ඇත.!"
                );
            }
            if (response.data.statusCode === "500") {
                showNotification(
                    "error",
                    "දෝශ පණිවිඩය",
                    "කරුණාකර ර්-මේලය වෙනස් කරන්න!"
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
            <a onClick={showDrawer}>
                <EditOutlined style={{ color: '#1890ff', fontSize: '18px', cursor: 'pointer' }} />
            </a>
            <Drawer
                title="ගණුදෙනුකරුන්ගේ ගිණුම් යාවත්කාලීන කිර්‍රිම"
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
                        customerId: props.cId,
                        customerName: props.name,
                        customerAddress:props.address,
                        customerEmail: props.email,
                        phoneNumber: props.phone
                    }}
                >
                    <div className='hidden'>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="customerId"
                                    label="Cutomer Name"
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
                                name="customerName"
                                label="ගණුදෙනුකරුගේ නම (Customer Name)"
                                style={{ width: '400px' }}
                                rules={[
                                    { required: true, message: 'කරුණාකර නම ඇතුලත් කරන්න' },
                                    { min: 5, message: "අවම වශයෙන් අකුරු 5 අවශය වේ." }
                                ]}
                            >
                                <Input placeholder="ගණුදෙනුකරුගේ නම ඇතුලත් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="customerAddress"
                                label="ගණුදෙනුකරුගේ ලිපිනය (Customer Address)"
                                style={{ width: '400px' }}
                                rules={[
                                    { required: true, message: 'කරුණාකර ගණුදෙනුකරුගේ ලිපිනය ඇතුලත් කරන්න' },
                                    { min: 5, message: "අවම වශයෙන් අකුරු 5 අවශය වේ." }
                                ]}
                            >
                                <Input placeholder="ගණුදෙනුකරුගේ ලිපිනය ඇතුලත් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="customerEmail"
                                label="ගණුදෙනුකරුගේ ඊ-මේලය (Email)"
                                style={{ width: '400px' }}
                                rules={[
                                    { required: true, message: 'කරුණාකර ගණුදෙනුකරුගේ ඊ-මේලය (Email) සදහන් කරන්න.' },
                                    { type: "email", message: "කරුණාකර නිවැරදි ඊ-මේලය (Email) සදහන් කරන්න." }
                                ]}
                            >
                                <Input placeholder="ගණුදෙනුකරුගේ ඊ-මේලය (Email) ලිපිනය ඇතුලත් කරන්න" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="phoneNumber"
                                label="ගණුදෙනුකරුගේ දුරකතන අංකය (Phone number)"
                                style={{ width: '400px' }}
                                rules={[
                                    { required: true, message: 'ගණුදෙනුකරුගේ දුරකතන අංකය සදහන් කරන්න.' },
                                    { min: 10, message: "කරුණාකර නිවැරදි දුරකතන අංකයක් සදහන් කරන්න." },
                                    {
                                        pattern: /^(070|071|072|074|075|076|077|078)\d{7}$/,
                                        message: "කරුණාකර නිවැරදි ශ්‍රී ලාංකීය දුරකතන අංකය ඇතුලත් කරන්න."
                                    }
                                ]}
                            >
                                <Input placeholder="ගණුදෙනුකරුගේ දුරකතන අංකය සදහන් කරන්න." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Form.Item label={null}>
                            <Button className='mt-4 bg-slate-900 w-[210px]' type="primary" htmlType="submit">
                                යාවත්කාලීන කරන්න
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default UpdateCustomerDrawer;