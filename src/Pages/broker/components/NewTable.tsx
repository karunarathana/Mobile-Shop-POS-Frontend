import React from 'react';
import { Table, Tag, Space } from 'antd';
import type { TableProps } from 'antd';
import UpdateCustomerDrawer from '../subviews/UpdateUserDrawer';
import ConfirmDelete from './Confirmation';
import { showNotification } from './Notification';
import CustomerTableProps from '../../../model/CustomerResponse';
import DataType from '../../../model/CustomerDataType';
import { deleteCustomer } from '../../../service/CreateCustomer.service';

const CustomerTable: React.FC<CustomerTableProps> = ({
  tableData,
  loadingData,
  backendApi
}) => {

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Customer Address',
      dataIndex: 'customerAddress',
      key: 'customerAddress',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Customer Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';

        if (status === 'INACTIVE') color = 'volcano';
        if (status === 'PENDING') color = 'gold';
        if (status === 'BLOCKED') color = 'red';

        return (
          <Tag color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Join Date',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <UpdateCustomerDrawer
            cId={record.customerID}
            name={record.customerName}
            address={record.customerAddress}
            email={record.customerEmail}
            phone={record.phoneNumber}
            fetchFunc={backendApi}
          />

          <ConfirmDelete
            onConfirm={() => handleDelete(record.customerID, backendApi)}
            onCancel={() => console.log("Cancelled delete for", record.customerID)}
          />
        </Space>
      ),
    },
  ];

  return <Table<DataType> columns={columns} dataSource={tableData} loading={loadingData} scroll={{ y: '40vh', x: 'max-content' }} />;
};

export default CustomerTable;

async function handleDelete(key: number, reloadFetch: () => void) {
  console.log(key);
  const response = await deleteCustomer(key);
  try {

    if (response.data.msg === "Customer Delete Successful In System" && response.data.statusCode === "200") {
      showNotification(
        "success",
        "Success",
        "ගණුදෙනුකරු සාර්තකව ඉවත්කරන ලදි!"
      );
      reloadFetch();
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

