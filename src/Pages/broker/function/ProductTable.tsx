import React from 'react';
import { Table, Space, Tag } from 'antd';
import type { TableProps } from 'antd';
import ConfirmDelete from '../components/Confirmation';
import UpdateProductDrawer from '../subviews/UpdateProductDrawer';
import { ProductType } from '../../../model/BaseCreateProduct';
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

const ProductTable: React.FC<CustomerTableProps> = ({
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
            title: "Product",
            dataIndex: "productName",
            key: "productName"
        },
        {
            title: "Brand",
            dataIndex: ["phone", "brand"],
            key: "brand"
        },
        {
            title: "Model",
            dataIndex: ["phone", "model"],
            key: "model"
        },
        {
            title: "IMEI",
            dataIndex: ["phone", "imeiNumber"],
            key: "imeiNumber"
        },
        {
            title: "Color",
            dataIndex: ["phone", "color"],
            key: "color"
        },
        {
            title: "Storage",
            dataIndex: ["phone", "storageCapacity"],
            key: "storageCapacity"
        },
        {
            title: "Condition",
            dataIndex: ["phone", "condition"],
            key: "condition",
            render: (condition) => (
                <Tag color={condition === "NEW" ? "green" : "orange"}>
                    {condition}
                </Tag>
            )
        },
        {
            title: "Purchase (Rs)",
            dataIndex: "purchasePrice",
            key: "purchasePrice"
        },
        {
            title: "Selling (Rs)",
            dataIndex: "sellingPrice",
            key: "sellingPrice"
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            render: (qty) => (
                <Tag color={qty > 3 ? "blue" : "red"}>
                    {qty}
                </Tag>
            )
        },
        {
            title: "Discount %",
            dataIndex: "discountPercentage",
            key: "discountPercentage",
            render: (d) => d ? `${d}%` : "-"
        },
        {
            title: "Category",
            dataIndex: ["phone", "categoryId", "name"],
            key: "name"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "ACTIVE" ? "green" : "red"}>
                    {status}
                </Tag>
            )
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt"
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <UpdateProductDrawer
                        productId={record.productId}
                        phoneId={record.phone?.phoneId}
                        productName={record.productName}
                        brand={record.phone?.brand}
                        model={record.phone?.model}
                        purchasePrice={record.purchasePrice}
                        sellingPrice={record.sellingPrice}
                        categoryId={record.phone?.categoryId.categoryId}
                        discountPercentage={record.discountPercentage}
                        status={record.status}
                        color={record.phone?.color}
                        imeiNumber={record.phone?.imeiNumber}
                        condition={record.phone?.condition}
                        storageCapacity={record.phone?.storageCapacity}
                        quantityInStock={record.stock}
                        refreshTable={refreshTable}
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

export default ProductTable;

