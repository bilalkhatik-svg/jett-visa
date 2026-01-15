import React from "react";
import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const PageWrapper = styled(Box)(() => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
}));

const PageContainer = styled(Box)(() => ({
  width: '375px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  position: 'relative',
}));

const HeaderWrapper = styled(Box)(() => ({
  backgroundColor: '#FFFFFF',
  width: '315px',
  minHeight: '60px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  paddingTop: '20px',
  paddingRight: '30px',
  paddingBottom: '0px',
  paddingLeft: '30px',
  boxSizing: 'border-box',
  position: 'sticky',
  top: 0,
  zIndex: 10,
}));

const ContactFormSkeleton: React.FC = () => {
  return (
    <PageWrapper>
      <PageContainer>
        {/* Header Skeleton */}
        <HeaderWrapper>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton
            variant="text"
            width={120}
            height={16}
            sx={{ flex: 1, mx: "auto" }}
          />
          <Box sx={{ width: 24, height: 24 }} />
        </HeaderWrapper>

        {/* Scrollable Content Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: '24px',
            paddingBottom: '2px',
            px: '30px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {/* Title and Subtitle Section Skeleton */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              mb: '10px',
            }}
          >
            <Skeleton variant="text" width={200} height={22} />
            <Skeleton variant="text" width={280} height={16} />
          </Box>

          {/* Form Container Skeleton */}
          <Box
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '5px',
              boxSizing: 'border-box',
            }}
          >
            {/* Form Fields Skeleton */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: 2 }}>
              {/* Full Name Field */}
              <Box>
                <Skeleton variant="text" width={80} height={14} sx={{ mb: '2px' }} />
                <Skeleton
                  variant="rectangular"
                  width={315}
                  height={46}
                  sx={{ borderRadius: '14px' }}
                />
              </Box>

              {/* Phone Number Field */}
              <Box>
                <Skeleton variant="text" width={100} height={14} sx={{ mb: '2px' }} />
                <Skeleton
                  variant="rectangular"
                  width={315}
                  height={46}
                  sx={{ borderRadius: '14px' }}
                />
              </Box>

              {/* Email Field */}
              <Box>
                <Skeleton variant="text" width={70} height={14} sx={{ mb: '2px' }} />
                <Skeleton
                  variant="rectangular"
                  width={315}
                  height={46}
                  sx={{ borderRadius: '14px' }}
                />
              </Box>

              {/* Message Field */}
              <Box>
                <Skeleton variant="text" width={180} height={14} sx={{ mb: '2px' }} />
                <Skeleton
                  variant="rectangular"
                  width={315}
                  height={80}
                  sx={{ borderRadius: '14px' }}
                />
              </Box>

              {/* Checkboxes Skeleton */}
              <Box sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Skeleton variant="rectangular" width={18} height={18} sx={{ borderRadius: '4px', mr: 1 }} />
                  <Skeleton variant="text" width={280} height={12} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Skeleton variant="rectangular" width={18} height={18} sx={{ borderRadius: '4px', mr: 1 }} />
                  <Skeleton variant="text" width={250} height={12} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Sticky Footer Button Skeleton */}
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            padding: '20px 30px',
            boxSizing: 'border-box',
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
          }}
        >
          <Skeleton
            variant="rectangular"
            width={315}
            height={50}
            sx={{ borderRadius: '10px' }}
          />
        </Box>
      </PageContainer>
    </PageWrapper>
  );
};

export default ContactFormSkeleton;

