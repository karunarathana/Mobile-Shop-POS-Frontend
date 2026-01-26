import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { showNotification } from '../components/Notification';
import { createCustomer } from '../../../service/CreateCustomer.service';
import CreateCustomerResponse from '../../../model/CustomerCreateResponse';

interface CustomerTableProps {
  reloadTable: () => void;
}
const CreateCustomerAccountDrawer: React.FC<CustomerTableProps> = ({reloadTable}) => {
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
      const backendResponse = await createCustomer(values);
      const response:CreateCustomerResponse = backendResponse.data;

      if (response.msg === "Customer Save Successfully" && response.statusCode === "201") {
        showNotification(
          "success",
          "සාර්ථක පණිවිඩය",
          "සාර්ථක එක්කරන ලදි!"
        );
        reloadTable();
      }
      if(response.statusCode === "400" && response.msg === "Already user have account"){
        showNotification(
          "error",
          "දෝශ පණිවිඩය",
          "ගණුදෙනුකරු දැනටමත් ලියාපදිංචි වී ඇත.!"
        );
      }
      if(response.statusCode === "500"){
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
        error.response?.data?.message || "පද්දතියේ දෝශයක් ඇත!"
      );
    }
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        නව ගණුදෙනුකරුවෙක් එකතු කරන්න
      </Button>
      <Drawer
        title="ගණුදෙනුකරුවෙක් එකතු කරන්න"
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
            <Button onClick={onClose}>ඉවත් වෙන්න</Button>
          </Space>
        }
      >
        <Form layout="vertical" requiredMark={true} onFinish={onFinish}>
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
              <Button type="primary" htmlType="submit">
                සාදන්න
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateCustomerAccountDrawer;