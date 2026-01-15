import { Box, Skeleton } from "@mui/material";


const VisaCardSkeleton: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '146px',
                height: '212px',
                flexShrink: 0,
                mb:4

            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    bgcolor: 'grey.300',
                    border: '4px solid #F2F2F8',
                }}
            >
                <Skeleton
                    variant="rectangular"
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: '20px',
                    }}
                />

                <Skeleton
                    variant="rectangular"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 70,
                        height: 26,
                        borderRadius: '0 0 10px 10px',
                        bgcolor: 'rgba(255,255,255,0.5)',
                        zIndex: 10,
                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '90%',
                        textAlign: 'center',
                        zIndex: 10,
                    }}
                >
                    <Skeleton
                        variant="text"
                        sx={{
                            width: '70%',
                            height: 16,
                            margin: '0 auto',
                            bgcolor: 'rgba(255,255,255,0.4)',
                        }}
                    />

                    <Skeleton
                        variant="text"
                        sx={{
                            width: '40%',
                            height: 14,
                            margin: '8px auto 0',
                            bgcolor: 'rgba(255,255,255,0.3)',
                        }}
                    />

                    <Skeleton
                        variant="rectangular"
                        sx={{
                            width: 80,
                            height: 22,
                            margin: '8px auto 0',
                            borderRadius: '20px',
                            bgcolor: 'rgba(255,255,255,0.3)',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default VisaCardSkeleton;