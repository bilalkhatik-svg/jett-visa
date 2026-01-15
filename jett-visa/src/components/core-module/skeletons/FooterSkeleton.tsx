import React from 'react';
import { Box, Container, Skeleton } from '@mui/material';

const FooterSkeleton: React.FC = () => {
    const TOP_CROP_PX = 140;

    return (
        <Container
            role="status"
            aria-busy="true"
            aria-label="Loading footer"
            sx={{
                position: "relative",
                px: "30px",
                py: "20px",
                minHeight: "314px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                    overflow: "hidden",
                }}
            >
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                        position: "absolute",
                        left: "50%",
                        top: `-${TOP_CROP_PX}px`,
                        transform: "translateX(-50%)",
                        width: "100%",
                        minHeight: `calc(100% + ${TOP_CROP_PX}px)`,
                        zIndex: 0,
                        bgcolor: 'rgba(230, 230, 240, 0.3)',
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        background:
                            "linear-gradient(180deg, rgba(250, 250, 250, 1) 50%, rgba(163, 38, 247, 0.1) 100%)",
                    }}
                />
            </Box>

            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    mt: "100px",
                }}
            >
                <Skeleton
                    variant="rectangular"
                    width={148}
                    height={20}
                    animation="wave"
                    sx={{
                        bgcolor: 'rgba(200, 200, 210, 0.5)',
                        borderRadius: 1,
                    }}
                />

                <Skeleton
                    variant="rectangular"
                    width={145}
                    height={13}
                    animation="wave"
                    sx={{
                        bgcolor: 'rgba(200, 200, 210, 0.5)',
                        borderRadius: 1,
                    }}
                />
            </Box>
        </Container>
    );
};

export default React.memo(FooterSkeleton);