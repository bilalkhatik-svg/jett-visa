import React from 'react';

const TopBarSkeleton: React.FC = () => {
    return (
        <div className="w-full h-16 bg-white shadow-sm">
            <div className="animate-pulse flex items-center justify-between px-4 h-full">
                <div className="h-8 w-32 bg-gray-200 rounded"></div>
                <div className="flex space-x-4">
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default TopBarSkeleton;
