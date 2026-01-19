import React from 'react';

const FindVisaWidgetSkeleton: React.FC = () => {
    return (
        <div className="w-full p-4">
            <div className="animate-pulse space-y-3">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default FindVisaWidgetSkeleton;
