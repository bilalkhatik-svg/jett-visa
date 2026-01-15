import React, { useRef } from 'react';
import { Box, Container, Skeleton } from '@mui/material';
import VisaCardSkeleton from '@components/core-module/skeletons/VisaCardSkeleton';

const FindVisaWidgetSkeleton: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <Container
            maxWidth="xl"
            sx={{
                px: 2,
                py: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: 315,
                    height: 528,
                    borderRadius: '20px',
                    border: '4px solid #F2F2F8',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <Skeleton
                        variant="text"
                        sx={{
                            width: '40%',
                            height: '24px',
                            maxWidth: 200,
                            bgcolor: 'grey.300',
                        }}
                    />
                    <Box
                        sx={{
                            width: 238,
                            height: 18,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 12,
                        }}
                    >
                        <Skeleton variant="rectangular" sx={{ width: 30, height: 2, borderRadius: '1px', bgcolor: 'grey.300' }} />
                        <Skeleton
                            variant="text"
                            sx={{
                                width: 154,
                                height: 18,
                                lineHeight: 1,
                                bgcolor: 'grey.300',
                            }}
                        />
                        <Skeleton variant="rectangular" sx={{ width: 30, height: 2, borderRadius: '1px', bgcolor: 'grey.300' }} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 3,
                        maxWidth: '100%',
                        mx: 'auto',
                        width: '100%',
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            width: 275,
                            height: 42,
                            borderRadius: '14px',
                            mx: 'auto',
                            bgcolor: 'grey.200',
                            border: '2px solid #E9EDEF',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 3,
                        pt: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: 111,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: 2,
                        }}
                    >
                        <Skeleton variant="circular" sx={{ width: 17, height: 17, bgcolor: 'grey.300' }} />
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                width: '65px',
                                height: '36px',
                                borderRadius: '100px',
                                bgcolor: 'bg.gray',
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        />
                        <Skeleton variant="circular" sx={{ width: 17, height: 17, bgcolor: 'grey.300' }} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 20,
                        zIndex: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            ref={scrollRef}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 2,
                                overflowX: 'hidden',
                                px: '20px',
                                mb: '30px'
                            }}
                        >
                            <VisaCardSkeleton />
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default FindVisaWidgetSkeleton;