import React from 'react';

const GetHelpSkeleton: React.FC = () => {
    return (
        <div className="w-full p-4">
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded w-32"></div>
            </div>
        </div>
    );
};

export default GetHelpSkeleton;
