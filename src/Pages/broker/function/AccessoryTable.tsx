import React from 'react';
import { Table, Space, Tag } from 'antd';
import type { TableProps } from 'antd';
import ConfirmDelete from '../components/Confirmation';
import UpdateProductDrawer from '../subviews/UpdateProductDrawer';
import {ProductType } from '../../../model/BaseCreateProduct';
import { deleteProduct } from '../../../service/ManageAccessory.service';
import { showNotification } from '../components/Notification';

interface CustomerTableProps {
    tableData: ProductType[];
    loadingData: boolean;
    refreshTable: () => void
}

async function handleDelete(key: number, refreshTable: () => void) {
    console.log("ProductID " + key);
    try {
        const response = await deleteProduct(key);
        if (response.data.msg === "Product Delete Successfully") {
            showNotification(
                "success",
                "සාර්ථක පණිවිඩය",
                "උපාංගය සාර්ථක මකා දමනු ලදි!"
            );
            refreshTable();
        }
    } catch (error: any) {
        console.error("API Error:", error);
        showNotification(
            "error",
            "දෝශ පණිවිඩය",
            error.response?.data?.message || "පද්ධතියේ දෝශයක් ඇත!"
        );
    }
}

const AccessoryTable: React.FC<CustomerTableProps> = ({
    tableData,
    loadingData,
    refreshTable
}) => {

    const columns: TableProps<ProductType>['columns'] = [
        {
            title: "ID",
            dataIndex: "productId",
            key: "productId",
            width: 80
        },
        {
            title: "Accessory",
            dataIndex: "productName",
            key: "productName"
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand"
        },
        {
            title: "Rack",
            dataIndex: "rackId",
            key: "rackId"
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "Compatible With",
            dataIndex: "compatibleWith",
            key: "compatibleWith",
            render: (value) => value || "-"
        },
        {
            title: "Cost Price",
            dataIndex: "purchasePrice",
            key: "purchasePrice",
            render: (price) => `Rs. ${price}`
        },
        {
            title: "Sell Price",
            dataIndex: "sellingPrice",
            key: "sellingPrice",
            render: (price) => `Rs. ${price}`
        },
        {
            title: "Qty",
            dataIndex: "stock",
            key: "stock",
            render: (qty) => (
                <Tag color={qty > 0 ? "blue" : "red"}>
                    {qty}
                </Tag>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "ACTIVE" ? "green" : "volcano"}>
                    {status}
                </Tag>
            )
        },
        {
            title: "Created At",
            dataIndex: "createAt",
            key: "createAt"
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <UpdateProductDrawer
                        productId={7}
                        productName={record.productName}
                        brand={record.accessoryId?.brand}
                        model={"test"}
                        purchasePrice={record.purchasePrice}
                        sellingPrice={record.sellingPrice}
                        categoryId={1}
                        discountPercentage={record.discountPercentage}
                        status={record.status}
                        color={record.accessoryId?.color}
                        imeiNumber={""}
                        condition={"NEW"}
                        storageCapacity={""}
                        quantityInStock={1}
                    />
                    <ConfirmDelete
                        onConfirm={() => handleDelete(record.productId, refreshTable)}
                        onCancel={() => console.log("Cancelled delete for", record.productId)}
                    />
                </Space>
            ),
        },
    ];

    return <Table<ProductType> rowKey="productId" columns={columns} dataSource={tableData} loading={loadingData} scroll={{ y: '40vh', x: 'max-content' }} />;
};

export default AccessoryTable;

