import React from 'react';

const HowToApplySectionSkeleton: React.FC = () => {
    return (
        <div className="w-full py-10">
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default HowToApplySectionSkeleton;
