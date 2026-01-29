import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { showNotification } from '../components/Notification';
import { createReload } from '../../../service/ManageReload.service';
import BaseReloadResponse from '../../../model/BaseReloadResponse';

interface CustomerTableProps {
  reloadTable: () => void;
}
const CreateReloadDrawer: React.FC<CustomerTableProps> = ({ reloadTable }) => {
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
      const backendResponse = await createReload(values.description, values.price,values.simType,values.staus);
      const response: BaseReloadResponse = backendResponse.data;

      if (response.msg === "Reload create successfully" && response.statusCode === "201 CREATED") {
        showNotification(
          "success",
          "සාර්ථක පණිවිඩය",
          "සාර්ථක එක්කරන ලදි!"
        );
        reloadTable();
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
        නව රිලෝඩයක් එකතු කරන්න
      </Button>
      <Drawer
        title="ගණුදෙනුකරුවෙකුගේ රිලෝඩයක් කරන්න"
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
                name="description"
                label="රිලෝඩ් විස්තරය (Reload Description)"
                style={{ width: '400px' }}
                rules={[
                  { required: false, message: 'කරුණාකර රිලෝඩ් විස්තරය ඇතුලත් කරන්න' },
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
                    { value: 'aitel', label: 'Aitel' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
           <Row>
            <Col>
              <Form.Item
                name="staus"
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
              <Button className='mt-4 w-[210px]' type="primary" htmlType="submit">
                ඇතුලත් කරන්න
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateReloadDrawer;