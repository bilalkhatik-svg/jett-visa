import React from 'react';

const HeroSectionSkeleton: React.FC = () => {
    return (
        <div className="w-full h-96 bg-gray-100">
            <div className="animate-pulse h-full flex flex-col items-center justify-center space-y-4">
                <div className="h-12 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-12 w-64 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default HeroSectionSkeleton;
