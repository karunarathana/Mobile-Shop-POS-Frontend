import React, { useState } from 'react';
import { RepaireType } from "../../../model/BaseRepaireResponse";
import UpdateRepairDrawer from '../subviews/UpdateRepaireDrawer';

interface Props {
  repair: RepaireType;
  onCompleteRepair?: (repairId: string) => void;
}

const RepairCard: React.FC<Props> = ({ repair,onCompleteRepair }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Status configuration
  const statusConfig = {
    RECEIVED: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
      ),
      label: "Received"
    },
    IN_PROGRESS: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      label: "In Progress"
    },
    COMPLETED: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      label: "Completed"
    }
  };

  const status = statusConfig[repair.status as keyof typeof statusConfig] || statusConfig.RECEIVED;
  const hasCostDifference = repair.estimatedCost && repair.actualCost && 
                           parseFloat((String(repair.actualCost))) !== parseFloat((String(repair.estimatedCost)));

  // Handle delete button click
  const handleDelete = () => {
    
  };

  // Handle start repair button
  const handleStartRepair = () => {
    
  };

  // Handle complete repair button
  const handleCompleteRepair = () => {
   
  };

  return (
    <div className="bg-white mt-2 rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-blue-100 transition-all duration-300 group">
      {/* Card Header with Status and Action Buttons */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-900 truncate">
              {repair.deviceModel}
            </h2>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
              IMEI: {repair.imei || "N/A"}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Device Repair
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bg} ${status.text}`}>
            {status.icon}
            <span className="text-sm font-medium">{status.label}</span>
          </div>
          
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete repair"
          >
            {isDeleting ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Issue Description */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <h3 className="text-sm font-semibold text-gray-700">Issue Description</h3>
        </div>
        <p className="text-gray-600 text-sm bg-gray-50 rounded-lg p-3 border border-gray-100">
          {repair.issueDescription || "No description provided"}
        </p>
      </div>

      {/* Cost Information Grid */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Cost Details</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-blue-600 font-medium">Estimated</span>
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-lg font-bold text-gray-900">
              Rs. {repair.estimatedCost || "0.00"}
            </p>
          </div>

          <div className={`rounded-lg p-3 border ${hasCostDifference ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-medium ${hasCostDifference ? 'text-green-600' : 'text-gray-600'}`}>
                Actual Cost
              </span>
              {hasCostDifference && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                  Updated
                </span>
              )}
            </div>
            <p className="text-lg font-bold text-gray-900">
              Rs. {repair.actualCost || repair.estimatedCost || "0.00"}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Information */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Repair Timeline</h3>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Start Date</div>
            <div className="text-sm font-semibold text-gray-900">
              {formatDate(repair.startDate)}
            </div>
          </div>
          
          <div className="flex-1 px-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Completion</div>
            <div className={`text-sm font-semibold ${repair.completionDate ? 'text-gray-900' : 'text-gray-400'}`}>
              {repair.completionDate ? formatDate(repair.completionDate) : "Pending"}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="mb-5">
        <div className="flex flex-wrap gap-2">
          {/* Start Repair Button (only for RECEIVED status) */}
          {repair.status === "RECEIVED" && (
            <button
              onClick={handleStartRepair}
              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-green-300 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Repair
            </button>
          )}

          {/* Complete Repair Button (only for IN_PROGRESS status) */}
          {repair.status === "IN_PROGRESS" && (
            <button
              onClick={handleCompleteRepair}
              className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Mark Complete
            </button>
          )}

          {/* View Details Button (always shown) */}
          <button
            onClick={() => {
              // Navigate to repair details or open modal
              console.log('View details for repair:', repair.repairId);
            }}
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>
        </div>
      </div>

      {/* Customer Information Footer */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{repair.customer?.customerName || "Unknown Customer"}</h4>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {repair.customer?.phoneNumber || "No contact"}
              </p>
            </div>
          </div>
          <UpdateRepairDrawer repair={repair} refreshTable={()=>{}}/>
        </div>
      </div>

      {/* Progress Indicator (for IN_PROGRESS status) */}
      {repair.status === "IN_PROGRESS" && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Repair Progress</span>
            <span>60%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full w-3/5"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairCard;