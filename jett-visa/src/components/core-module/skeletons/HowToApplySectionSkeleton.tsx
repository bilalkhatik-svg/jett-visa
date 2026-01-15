import { Box, Container, Grid, Skeleton, styled } from '@mui/material';

const InfoCardSkeleton = styled(Box)(() => ({
    minHeight: '142px',
    borderRadius: '25px',
    border: '1px solid rgba(219, 233, 248, 1)',
    backgroundColor: '#ffffff',
    padding: '17px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'flex-start',
    width: '100%',
}));

const HowToApplySectionSkeleton = () => {
    const numberOfSteps = 4;

    return (
        <Container
            sx={{
                background: 'rgba(235, 242, 255, 1)',
                px: '30px',
                py: '20px',
            }}
        >
            <Skeleton
                variant="text"
                width="120px"
                height={24}
                sx={{
                    mb: 2,
                    transform: 'none',
                }}
            />

            <Grid container spacing={2}>
                {Array.from(new Array(numberOfSteps)).map((_, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                        <InfoCardSkeleton>
                            <Skeleton
                                variant="circular"
                                width={31}
                                height={31}
                            />

                            <Skeleton
                                variant="text"
                                width="70%"
                                height={21}
                                sx={{
                                    transform: 'none',
                                    mt: 0.5,
                                }}
                            />

                            <Skeleton
                                variant="text"
                                width="100%"
                                height={16}
                                sx={{ transform: 'none' }}
                            />

                            <Skeleton
                                variant="text"
                                width="85%"
                                height={16}
                                sx={{ transform: 'none' }}
                            />
                        </InfoCardSkeleton>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HowToApplySectionSkeleton;