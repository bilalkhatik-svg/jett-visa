import React from 'react';

const MobileBottomDrawerSkeleton: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
            <div className="animate-pulse space-y-3">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default MobileBottomDrawerSkeleton;
