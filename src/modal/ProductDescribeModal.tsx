import React from 'react';
import {Modal, Descriptions } from 'antd';

interface ProductDescribeModalProps {
  product: any; // later you can replace with Product interface
}


const ProductDescribeModal: React.FC<ProductDescribeModalProps> = ({ product }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const showModal = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (!product) return null;

  return (
    <>
      <p
        className="cursor-pointer rounded-md text-white bg-gray-400 text-center px-2"
        onClick={showModal}
      >
        Show
      </p>

      <Modal
        title="Product Details"
        open={open}
        loading={loading}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Product Name">
            {product.productName}
          </Descriptions.Item>

          <Descriptions.Item label="Type">
            {product.type}
          </Descriptions.Item>

          <Descriptions.Item label="Selling Price">
            Rs. {product.sellingPrice}
          </Descriptions.Item>

          <Descriptions.Item label="Stock">
            {product.stock}
          </Descriptions.Item>

          {/* PHONE DATA */}
          {product.phone && (
            <>
              <Descriptions.Item label="Brand">
                {/* {product.phone.brand} */}
                 hp
              </Descriptions.Item>
              <Descriptions.Item label="Model">
                {product.phone.model}
              </Descriptions.Item>
              <Descriptions.Item label="IMEI">
                {product.phone.imeiNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Storage">
                {product.phone.storageCapacity}
              </Descriptions.Item>
            </>
          )}

          {/* ACCESSORY DATA */}
          {product.accessoryId && (
            <>
              <Descriptions.Item label="Brand">
                {product.accessoryId.brand}
              </Descriptions.Item>
              <Descriptions.Item label="Compatible With">
                {product.accessoryId.compatibleWith || "-"}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
      </Modal>
    </>
  );
};

export default ProductDescribeModal;
