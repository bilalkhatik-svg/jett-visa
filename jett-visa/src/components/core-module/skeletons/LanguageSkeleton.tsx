import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LanguageSkeletonProps {
  count?: number;
}

export const LanguageSkeleton: React.FC<LanguageSkeletonProps> = ({ count = 8 }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <Box
      data-testid="language-skeleton"
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 375,
        minHeight: '100vh',
        bgcolor: 'white',
        mx: 'auto',
        py: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3.75,
          mb: 2,
          direction: i18n.dir(),
        }}
      >
        {!isRTL && <Skeleton variant="circular" width={24} height={24} />}

        <Skeleton variant="text" width={40} height={20} sx={{ flex: 1, mx: 2 }} />

        {isRTL && (
          <Skeleton
            variant="circular"
            width={24}
            height={24}
            sx={{ transform: 'scaleX(-1)' }}
          />
        )}
      </Box>

      <Box sx={{ px: 4, mb: 1 }}>
        <Skeleton
          variant="rectangular"
          height={42}
          sx={{
            borderRadius: 2,
            width: 315,
            mx: 'auto',
          }}
        />
      </Box>

      <Box
        sx={{
          width: 315,
          mx: 'auto',
          mt: 1,
        }}
      >
        <Stack spacing={0.5}>
          {[...Array(count)].map((_, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: '15px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <Skeleton
                  variant="circular"
                  width={24}
                  height={24}
                  sx={{ borderRadius: '50%', mr: 1.5 }}
                />

                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="70%" height={16} />

                  <Skeleton variant="text" width="50%" height={14} sx={{ mt: 0.5 }} />
                </Box>
              </Box>

            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default LanguageSkeleton;
