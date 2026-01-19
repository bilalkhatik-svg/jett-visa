import React from 'react';

const TestimonialsSectionSkeleton: React.FC = () => {
    return (
        <div className="w-full py-10">
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-40 bg-gray-200 rounded"></div>
                    <div className="h-40 bg-gray-200 rounded"></div>
                    <div className="h-40 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSectionSkeleton;
