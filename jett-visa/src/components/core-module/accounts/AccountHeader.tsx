'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import backArrowIcon from '@/assets/images/arrow-left.png';
import Image from 'next/image';

const AccountHeader: React.FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.dir() === 'rtl';

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div
      className="w-full h-[60px] flex items-center justify-between px-[30px] bg-white pt-5 pb-5"
      dir={i18n.dir()}
    >
      {!isRTL && (
        <Image
          src={backArrowIcon}
          alt="Back"
          onClick={handleBack}
          className="cursor-pointer w-6 h-6"
          width={24}
          height={24}
        />
      )}

      <h1
        className="font-['Poppins'] font-medium text-base leading-4 text-[#00366B] text-center flex-1"
      >
        {t('account')}
      </h1>

      {isRTL && (
        <Image
          src={backArrowIcon}
          alt="Back"
          onClick={handleBack}
          className="cursor-pointer w-6 h-6 scale-x-[-1]"
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default AccountHeader;
