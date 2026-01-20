import React from 'react';

const FaqSectionSkeleton: React.FC = () => {
    return (
        <div className="w-full py-10">
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default FaqSectionSkeleton;
