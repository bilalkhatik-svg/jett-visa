import React from 'react';

const DestinationCardSkeleton: React.FC = () => {
    return (
        <div className="w-full rounded-lg overflow-hidden shadow">
            <div className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default DestinationCardSkeleton;
