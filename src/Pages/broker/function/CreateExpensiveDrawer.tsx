import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { showNotification } from '../components/Notification';
import { createExpense } from '../../../service/ManageExpenses.service';


const CreateExpensiveDrawer: React.FC = () => {
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
      const response = await createExpense(values.desc,values.price)
      if (response.data.msg === "Expenses create successfully" && response.data.status === "200") {
        showNotification(
          "success",
          "සාර්ථක පණිවිඩය",
          "වියදම සාර්ථකව සාදන ලදි!"
        );
      }
    } catch (error: any) {
      console.error("API Error:", error);
      showNotification(
        "error",
       "දෝශ පණිවිඩය",
        error.response?.data?.message || "පද්දතිය තුල දෝශයක් පවතී!"
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
                name="desc"
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
                name="price"
                label="වැය වූ මුදල"
                style={{ width: '400px' }}
                rules={[
                  { required: true, message: 'කරුණාකර වැය වූ මුදල සදහන් කරන්න.' }
                ]}
              >
                <Input type={"number"} placeholder="වැය වූ මුදල සදහන් කරන්න" />
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