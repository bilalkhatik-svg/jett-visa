import React from 'react';

const FooterSkeleton: React.FC = () => {
    return (
        <div className="relative px-[30px] py-5 min-h-[314px] flex flex-col items-center overflow-hidden">
            <div className="animate-pulse w-full h-full bg-gray-200 rounded"></div>
        </div>
    );
};

export default FooterSkeleton;
