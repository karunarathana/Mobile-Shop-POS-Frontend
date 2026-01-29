import React from 'react';
import { Table,Space, Tag } from 'antd';
import type { TableProps } from 'antd';
import { showNotification } from './Notification';
import ReloadType from '../../../model/ReloadDataType';
import ReloadTableProps from '../../../model/ReloadTableProps';
import UpdateReloadDrawer from '../subviews/UpdateReloadDrawer';
import ConfirmDelete from './Confirmation';
import { deleteReload } from '../../../service/ManageReload.service';

const ReloadTable: React.FC<ReloadTableProps> = ({
  tableData,
  loadingData,
  backendApi
}) => {

  const columns: TableProps<ReloadType>['columns'] = [
    {
      title: 'Reload ID',
      dataIndex: 'reloadId',
      key: 'reloadId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Reload Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Reload Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Sim Type',
      dataIndex: 'simType',
      key: 'simType',
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
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <UpdateReloadDrawer
            rId={record.reloadId}
            description={record.description}
            price={record.price}
            simType={record.simType}
            status={record.status}
            fetchFunc={backendApi}
          />

          <ConfirmDelete
            onConfirm={() => handleDelete(record.reloadId, backendApi)}
            onCancel={() => console.log("Cancelled delete for", record.reloadId)}
          />
        </Space>
      ),
    },
  ];

  return <Table<ReloadType>  rowKey="reloadId" columns={columns} dataSource={tableData} loading={loadingData} />;
};

export default ReloadTable;

async function handleDelete(key: number, reloadFetch: () => void) {
  console.log(key);
  const response = await deleteReload(key);
  try {

    if (response.data.msg === "Delete data successfully") {
      showNotification(
        "success",
        "Success",
        "රිලෝඩය සාර්තකව ඉවත්කරන ලදි!"
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

