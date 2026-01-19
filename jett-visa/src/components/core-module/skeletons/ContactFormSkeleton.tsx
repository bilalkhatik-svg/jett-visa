import React from 'react';

const ContactFormSkeleton: React.FC = () => {
    return (
        <div className="w-full p-4">
            <div className="animate-pulse space-y-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded w-32"></div>
            </div>
        </div>
    );
};

export default ContactFormSkeleton;
