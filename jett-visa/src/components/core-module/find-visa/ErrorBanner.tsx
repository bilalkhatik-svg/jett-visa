'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/utils/i18nStub';

interface ErrorBannerProps {
  isLoading?: boolean;
  loadingTimeout?: number; // Timeout in milliseconds before showing error
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ 
  isLoading = true, 
  loadingTimeout = 3000 
}) => {
  const { t } = useTranslation();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowError(false);
      // Show spinner for the loading timeout duration, then show error
      const timer = setTimeout(() => {
        setShowError(true);
      }, loadingTimeout);

      return () => clearTimeout(timer);
    } else {
      // If not loading, show error immediately
      setShowError(true);
    }
  }, [isLoading, loadingTimeout]);

  // Show spinner while loading
  if (isLoading && !showError) {
    return (
      <div className="alert alert-warning mb-[100px] rounded-lg bg-transparent flex items-center justify-center py-4">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003669]"></div>
          <div className="text-sm text-gray-600">
            {t("loading") || "Loading..."}
          </div>
        </div>
      </div>
    );
  }

  // Show error message
  return (
    <div className="alert alert-warning mb-[100px] rounded-lg bg-transparent">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <div className="w-full">
        <h3 className="font-semibold text-base">
          {t("unable_to_load_visa_data") || "Unable to load visa data"}
        </h3>
        <div className="text-sm">
          {t("updating_visa_data_message") || "We are updating visa data. Please try again later."}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ErrorBanner);
