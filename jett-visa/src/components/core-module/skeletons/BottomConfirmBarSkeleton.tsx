import React from 'react';

const BottomConfirmBarSkeleton: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
            <div className="animate-pulse h-12 bg-gray-200 rounded"></div>
        </div>
    );
};

export default BottomConfirmBarSkeleton;
