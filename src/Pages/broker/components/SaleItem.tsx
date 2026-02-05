import { SaleItem } from "../../../model/SaleResponse";

interface Props {
  item: SaleItem;
}

const SaleCard: React.FC<Props> = ({ item }) => {
  const { product, sale } = item;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">
          {product.brand} {product.model}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold
          ${sale.paymentStatus === "PAID"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"}
        `}>
          {sale.paymentStatus}
        </span>
      </div>

      {/* Product Info */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>IMEI: {product.imeiNumber}</p>
        <p>Color: {product.color}</p>
        <p>Storage: {product.storageCapacity}</p>
      </div>

      {/* Sale Info */}
      <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
        <p>Qty: <b>{item.quantity}</b></p>
        <p>Warranty: <b>{item.warrantyDuration} months</b></p>
        <p>Unit Price: <b>Rs. {item.unitPrice}</b></p>
        <p>Discount: <b>Rs. {item.discountAmount}</b></p>
      </div>

      {/* Footer */}
      <div className="mt-4 border-t pt-3 flex justify-between items-center text-sm">
        <div>
          <p className="font-semibold">{sale.customer.customerName}</p>
          <p className="text-gray-500">{sale.customer.phoneNumber}</p>
        </div>

        <div className="text-right">
          <p className="text-gray-500">Total</p>
          <p className="text-lg font-bold text-blue-600">
            Rs. {sale.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaleCard;
