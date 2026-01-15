'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const EmptyState: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center py-10 px-2 mb-[50px] bg-transparent">
      <p className="text-base-content/60 text-sm">
        {t("no_visa_available") || "No visa available"}
      </p>
    </div>
  );
};

export default React.memo(EmptyState);