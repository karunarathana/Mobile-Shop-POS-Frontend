import React, {useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from "antd";
import { showNotification } from "../components/Notification";
import { getSingleCustomer } from "../../../service/CreateCustomer.service";
import { createRepaire} from "../../../service/ManageRepaire.service";


interface CreateRepairDrawerProps {
    refreshTable: () => void;
}

const { TextArea } = Input;

const CreateRepairDrawer: React.FC<CreateRepairDrawerProps> = ({ refreshTable }) => {
    const [open, setOpen] = useState(false);
    const [phoneNumber, setphoneNumber] = useState<string>();
    const [cusId, setCusId] = useState<number>();

    const onFinish = async (values: any) => {
        const repairDto = {
            customerId: cusId,
            customerName: values.customerName,
            deviceModel: values.deviceModel,
            imei: values.imei,
            issueDescription: values.issueDescription,
            estimatedCost: values.estimatedCost,
            actualCost: values.actualCost,
            status: values.status,
            startDate: values.startDate?.format("YYYY-MM-DD"),
            completionDate: values.completionDate?.format("YYYY-MM-DD"),
        };

        console.log("Repair DTO => ", repairDto);

        try {
             const res = await createRepaire(repairDto);

             console.log(res);
             

            showNotification(
                "success",
                "සාර්ථකයි",
                "Repair Job එක සාර්ථකව ඇතුළත් කරන ලදි"
            );
            refreshTable();
            setOpen(false);
        } catch (error: any) {
            showNotification(
                "error",
                "Error",
                error.response?.data?.message || "Something went wrong"
            );
        }
    };


    async function checkCustomer() {
        console.log(phoneNumber);
        const response = await getSingleCustomer(phoneNumber?.trim() || "");
        console.log(response);

        if (response.data.msg === "Customer Already Existing In System") {
            showNotification(
                "success",
                "සාර්තකයි (Success)",
                "ඔබට අලුත්වැඩියාවක් සිදුකල හැකිය (You can proceed to the repair job creation)"
            );
            setCusId(response.data.data.customerID);
            console.log("Customer ID:", response.data.data.customerID);
        } else {
            showNotification(
                "error",
                "දෝෂයක් (Error)",
                "මෙම ගනුදෙනුකරු සොයාගත නොහැක (Customer not found in the system)"
            );
        }
    }

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                Repair Add
            </Button>

            <Drawer
                title="නව Repair Job එකක් ඇතුළත් කිරීම"
                width={520}
                onClose={() => setOpen(false)}
                open={open}
                extra={
                    <Space>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </Space>
                }
            >
                <Form layout="vertical" onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="customerId"
                                label="Customer ID"
                                rules={[{ required: true }]}
                            >
                                <Space.Compact style={{ width: '100%' }}>
                                    <Input onChange={(e) => { setphoneNumber(e.target.value) }} placeholder='දුරකතන අංකය ඇතුලත් කරන්න' />
                                    <Button onClick={() => { checkCustomer() }} type="primary">Check</Button>
                                </Space.Compact>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="customerName"
                                label="Customer Name"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="deviceModel"
                                label="Device Model"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="imei"
                                label="IMEI Number"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="issueDescription"
                        label="Issue Description"
                        rules={[{ required: true }]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="estimatedCost"
                                label="Estimated Cost"
                                rules={[{ required: true }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="actualCost"
                                label="Actual Cost"
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="status"
                                label="Repair Status"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    placeholder="Status Select"
                                    options={[
                                        { value: "PENDING", label: "Pending" },
                                        { value: "IN_REPAIR", label: "IN REPAIR" },
                                        { value: "COMPLETED", label: "Completed" },
                                        { value: "CANCELLED", label: "Cancelled" },
                                    ]}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="startDate"
                                label="Start Date"
                                rules={[{ required: true }]}
                            >
                                <DatePicker className="w-full" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="completionDate"
                                label="Completion Date"
                            >
                                <DatePicker className="w-full" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit" className="mt-4">
                        Save Repair
                    </Button>
                </Form>
            </Drawer>
        </>
    );
};

export default CreateRepairDrawer;
