import React from 'react';

const AccountSkeleton: React.FC = () => {
    return (
        <div className="w-full p-4">
            <div className="animate-pulse space-y-4">
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default AccountSkeleton;
