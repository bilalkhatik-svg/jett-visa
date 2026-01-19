import React from 'react';

const VisaCardSkeleton: React.FC = () => {
    return (
        <div className="w-full p-4 border rounded-lg">
            <div className="animate-pulse space-y-3">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default VisaCardSkeleton;
