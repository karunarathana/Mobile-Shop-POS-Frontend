// components/SaleCard.tsx
import React from 'react';
import { Sale } from '../../../model/SaleResponse';

interface Props {
  sale: Sale;
}

const SaleCard: React.FC<Props> = ({ sale }) => {
  // Format currency with commas
  const formatCurrency = (amount: string | number): string => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Calculate total from items (fallback)
  const calculateTotal = () => {
    return sale.customSaleItems.reduce(
      (sum, item) => sum + parseFloat(item.unitPrice) * parseInt(item.qty),
      0
    );
  };

  const totalAmount = formatCurrency(sale.totalPayment || calculateTotal().toString());
  const hasReturnMoney = sale.returnMoney && sale.returnMoney !== "No Money";

  return (
    <div className="bg-white mt-2 rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 hover:border-blue-100 group">
      {/* Customer Header */}
      <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {sale.customerName}
            </h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 whitespace-nowrap">
              Customer
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="font-medium">{sale.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="truncate max-w-[180px]">{sale.emailAddress}</span>
            </div>
          </div>
        </div>

        <div className="text-right pl-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Total Amount
          </div>
          <div className="text-xl font-bold text-blue-700 bg-gradient-to-r from-blue-50 to-white px-3 py-1 rounded-lg">
            Rs. {totalAmount}
          </div>
        </div>
      </div>

      {/* Sale Items */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
            Products ({sale.customSaleItems.length})
          </h4>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {sale.customSaleItems.reduce((sum, item) => sum + parseInt(item.qty), 0)} items
          </span>
        </div>

        <div className="space-y-2">
          {sale.customSaleItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {item.productName}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-50 text-green-700">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item.warrantyDays}
                  </span>
                  <span>Quantity: <b>{item.qty}</b></span>
                </div>
              </div>

              <div className="text-right pl-4">
                <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                  Rs. {formatCurrency(item.unitPrice)}
                </p>
                <p className="text-xs text-gray-500">
                  Total: Rs. {formatCurrency(parseFloat(item.unitPrice) * parseInt(item.qty))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Payment Info */}
      <div className="pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Paid Amount
            </div>
            <div className={`text-sm font-medium ${sale.payMoney ? 'text-green-600' : 'text-gray-400'}`}>
              {sale.payMoney ? `Rs. ${formatCurrency(sale.payMoney)}` : 'Not Paid'}
            </div>
          </div>
          
          <div className={`rounded-lg p-3 ${hasReturnMoney ? 'bg-red-50' : 'bg-gray-50'}`}>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Return Money
            </div>
            <div className={`text-sm font-medium ${hasReturnMoney ? 'text-red-600' : 'text-gray-400'}`}>
              {sale.returnMoney}
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-3 flex items-center justify-end">
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              <span className="text-gray-600">Completed</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleCard;