import { Box, Container, Skeleton, styled } from '@mui/material';

const TestimonialCardSkeleton = styled(Box)(() => ({
    flexShrink: 0,
    minWidth: '230px',
    background: 'rgba(255, 255, 255, 1)',
    borderRadius: '10px',
    border: '1px dashed rgba(228, 228, 228, 1)',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
}));

const TestimonialsSectionSkeleton = () => {
    const numberOfCards = 5;

    return (
        <Container sx={{ px: '30px', py: '20px', background: 'rgba(255, 255, 255, 1)' }}>
            <Skeleton
                variant="text"
                width="120px"
                height={24}
                sx={{
                    mb: 2,
                    transform: 'none',
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'hidden',
                    gap: 2,
                    pr: 1,
                }}
            >
                {Array.from(new Array(numberOfCards)).map((_, index) => (
                    <TestimonialCardSkeleton key={index}>
                        <Box>
                            <Skeleton
                                variant="text"
                                width="100%"
                                height={14}
                                sx={{ transform: 'none', mb: 0.5 }}
                            />
                            <Skeleton
                                variant="text"
                                width="95%"
                                height={14}
                                sx={{ transform: 'none', mb: 0.5 }}
                            />
                            <Skeleton
                                variant="text"
                                width="85%"
                                height={14}
                                sx={{ transform: 'none' }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 'auto'
                            }}
                        >
                            <Skeleton
                                variant="text"
                                width="45%"
                                height={16}
                                sx={{ transform: 'none' }}
                            />

                            <Box sx={{ display: 'flex', gap: '2px' }}>
                                {Array.from(new Array(5)).map((__, i) => (
                                    <Skeleton
                                        key={i}
                                        variant="rectangular"
                                        width={13}
                                        height={12}
                                        sx={{ borderRadius: '2px' }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </TestimonialCardSkeleton>
                ))}
            </Box>
        </Container>
    );
};

export default TestimonialsSectionSkeleton;