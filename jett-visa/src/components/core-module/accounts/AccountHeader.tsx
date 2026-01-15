import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import backArrowIcon from '@assets/images/arrow-left.png';
import { ROUTES } from "@/utility/constant";

const AccountHeader: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.dir() === 'rtl';

  const handleBack = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '30px',
        bgcolor: 'white',
        pt: '20px',
        pb: '20px',
        direction: i18n.dir(),
      }}
    >
      {!isRTL && (
        <Box
          component="img"
          src={backArrowIcon}
          onClick={handleBack}
          sx={{
            cursor: 'pointer',
            width: '24px',
            height: '24px',
          }}
        />
      )}

      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '16px',
          color: '#00366B',
          textAlign: 'center',
          flex: 1,
        }}
      >
        {t('account')}
      </Typography>

      {isRTL && (
        <Box
          component="img"
          src={backArrowIcon}
          onClick={handleBack}
          sx={{
            cursor: 'pointer',
            width: '24px',
            height: '24px',
            transform: 'scaleX(-1)',
          }}
        />
      )}


    </Box>
  );
};

export default AccountHeader;
