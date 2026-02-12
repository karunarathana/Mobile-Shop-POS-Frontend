import React, { useState } from "react";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from "antd";
import { RepaireType } from "../../../model/BaseRepaireResponse";
import { showNotification } from "../components/Notification";
import { createRepaire } from "../../../service/ManageRepaire.service";


interface CreateRepairDrawerProps {
    repair: RepaireType;
    refreshTable: () => void;
}

const { TextArea } = Input;

const UpdateRepairDrawer: React.FC<CreateRepairDrawerProps> = ({ refreshTable,repair}) => {
    const [open, setOpen] = useState(false);

    const onFinish = async (values: any) => {
        const updateDto = {
            repairId: repair.repairId,
            customerId: values.customerId,
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

        console.log("Update DTO => ", updateDto);

        try {
            const res = await createRepaire(updateDto);

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

    return (
        <>
            <button onClick={() => setOpen(true)} className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                View Details →
            </button>

            <Drawer
                title="Repair Job එකක් යාවත්කාලීන කිරීම"
                width={520}
                onClose={() => setOpen(false)}
                open={open}
                extra={
                    <Space>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </Space>
                }
            >
                <Form layout="vertical" onFinish={onFinish}
                    initialValues={{
                        customerId: repair.customer.customerID,
                        customerName: repair.customer.customerName,
                        deviceModel: repair.deviceModel,
                        imei: repair.imei,
                        issueDescription: repair.issueDescription,
                        estimatedCost: repair.estimatedCost,
                        actualCost: repair.actualCost,
                        status: repair.status,
                        startDate: "",
                        completionDate: "",
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="customerId"
                                label="Customer ID"
                                rules={[{ required: true }]}
                            >
                                <Input type="number" disabled />
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
                        Update Repair Job
                    </Button>
                </Form>
            </Drawer >
        </>
    );
};

export default UpdateRepairDrawer;
