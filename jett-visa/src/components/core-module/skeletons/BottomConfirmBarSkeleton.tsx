import { Box, Skeleton, styled } from '@mui/material';
import React from 'react';

const FixedBarSkeleton = styled(Box)(() => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '60px',
    borderTop: '1px solid #F2F2F8',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    padding: '12px 30px',
    zIndex: 1000,
    boxShadow: '0px -4px 4px 0px #00000029',
}));

const BottomConfirmBarSkeleton: React.FC = () => {
    return (
        <FixedBarSkeleton>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    flex: 1,
                }}
            >
                <Skeleton variant="circular" width={30} height={30} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                        width: '60%',
                        maxWidth: '200px',
                    }}
                >
                    <Skeleton
                        variant="text"
                        width="80%"
                        height={20}
                        sx={{ transform: 'scale(1, 0.7)', mb: '1px' }}
                    />

                    <Skeleton
                        variant="text"
                        width="90%"
                        height={20}
                        sx={{ transform: 'scale(1, 0.7)' }}
                    />
                </Box>
            </Box>

            <Skeleton
                variant="rectangular"
                width={70}
                height={20}
                sx={{
                    borderRadius: '4px',
                    flexShrink: 0
                }}
            />
        </FixedBarSkeleton>
    );
};

export default BottomConfirmBarSkeleton;