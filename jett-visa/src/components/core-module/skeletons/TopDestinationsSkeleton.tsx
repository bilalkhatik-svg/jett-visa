import React from 'react';

const TopDestinationsSkeleton: React.FC = () => {
    return (
        <div className="w-full py-8">
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-40 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopDestinationsSkeleton;
