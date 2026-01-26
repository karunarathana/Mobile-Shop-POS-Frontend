import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { showNotification } from '../components/Notification';
import axios from 'axios';
import API_ENDPOINTS from '../../../constant/backend-endpoints';

interface CustomerTableProps {
  reloadTable: () => void;
}
const CreateExpensiveDrawer: React.FC<CustomerTableProps> = ({reloadTable}) => {
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
      const response = await axios.post(
        API_ENDPOINTS.CREATE_CUSTOMER,
        values
      );
      console.log("**********************************")
      console.log("API Call Started In CreateCustomerAccountDrawer");
      console.log("**********************************")
      console.log("API Response:", response.data);
       console.log("API Call Finished In CreateCustomerAccountDrawer");
      console.log("**********************************")

      if (response.data.msg === "Customer Save Successfully" && response.data.statusCode === "201") {
        showNotification(
          "success",
          "Success",
          "Customer created successfully!"
        );
        reloadTable();
      }
      if(response.data.statusCode === "400" && response.data.msg === "Already user have account"){
        showNotification(
          "error",
          "Error",
          "Customer already exists!"
        );
      }
      if(response.data.statusCode === "500"){
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
      <Button className='bg-red-500 text-white text-[1rem] hover:bg-red-700' onClick={showDrawer} icon={<PlusOutlined />}>
        වියදම් එකතුකරන්න
      </Button>
      <Drawer
        title="දවසේ වියදම් එකතු කරන්න."
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
                name="customerName"
                label="වියදම විස්තර කරන්න"
                style={{ width: '400px' }}
                rules={[
                  { required: true, message: 'කරුණාකර වියදම් විස්තරය එකතු කරන්න' },
                  { min: 5, message: "අවම වශයෙන් අකුරු 5 අවශය වේ." }
                ]}
              >
                <Input placeholder="වියදම සදහන් කරන්න." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="customerEmail"
                label="වැය වූ මුදල"
                style={{ width: '400px' }}
                rules={[
                  { required: true, message: 'කරුණාකර වැය වූ මුදල සදහන් කරන්න.' },
                  { type: "float", message: "ඇතුලත් කල හැක්කේ ඉලක්කම් පමණී.රු100.30" }
                ]}
              >
                <Input placeholder="වැය වූ මුදල සදහන් කරන්න" />
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

export default CreateExpensiveDrawer;