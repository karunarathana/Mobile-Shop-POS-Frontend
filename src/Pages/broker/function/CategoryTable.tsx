import React from 'react';
import { Table, Space } from 'antd';
import type { TableProps } from 'antd';
import UpdateCategoryDrawer from '../subviews/UpdateCategoryDrawer';
import ConfirmDelete from '../components/Confirmation';
import axios from 'axios';
import { showNotification } from '../components/Notification';
import API_ENDPOINTS from '../../../constant/backend-endpoints';
import { deleteCategory } from '../../../service/CreateCategory.service';

interface DataType {
    categoryId: number;
    name: string;
}

interface CustomerTableProps {
    tableData: DataType[];
    loadingData: boolean;
    backendApi: () => void;
}

const CategoryTable: React.FC<CustomerTableProps> = ({
    tableData,
    loadingData,
    backendApi
}) => {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Category Id',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <UpdateCategoryDrawer categoryName={record.name} categoryId={record.categoryId} reloadTable={backendApi} />

                    <ConfirmDelete
                        onConfirm={() => handleDelete(record.categoryId, backendApi)}
                        onCancel={() => console.log("Cancelled delete for", record.categoryId)}
                    />
                </Space>
            ),
        },
    ];

    return <Table<DataType> columns={columns} dataSource={tableData} loading={loadingData} scroll={{ y: '40vh' }} />;
};

export default CategoryTable;

async function handleDelete(key: number, backFunc: () => void) {
    console.log(key);

    try {
        const response = await deleteCategory(key);
        if (response.data.msg === "Category Deleted Successfully" && response.data.statusCode === "201") {
            showNotification(
                "success",
                "Success",
                "කාණ්ඩය සාර්ථක ඉවත්කරන ලදි!"
            );
            backFunc();
        }
        if (response.data.statusCode === "500") {
            showNotification(
                "warning",
                "පද්ධති අනතුරු ඇගවීමේ පණිවිඩය",
                "ඔබ දැනටමත් මෙම කාණ්ඩය භාණ්ඩයක් සදහා භාවිතා කර ඇත්නම් පළමුව එය පද්ධතියෙන් ඉවත්කර කාණ්ඩය ඉවත්කරන කරන්න"
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
}

