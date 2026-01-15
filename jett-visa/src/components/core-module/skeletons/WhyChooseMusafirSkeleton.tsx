import { Box, Container, Grid, Skeleton, styled } from '@mui/material';

const InfoCardSkeleton = styled(Box)(() => ({
  height: '270px',
  borderRadius: '25px',
  border: '1px solid rgba(219, 233, 248, 1)',
  backgroundColor: '#ffffff',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'flex-start',
  width: '100%',
}));

const WhyChooseMusafirSkeleton = () => {
  const numberOfSteps = 4;

  return (
    <Container
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        px: '30px',
        py: '20px',
      }}
    >
      <Skeleton
        variant="text"
        width="180px"
        height={24}
        sx={{
          mb: 2,
          transform: 'none',
        }}
      />
      <Grid container spacing={2}>
        {Array.from(new Array(numberOfSteps)).map((_, index) => (
          <Grid size={{ xs: 6 }} key={index}>
            <InfoCardSkeleton>
              <Skeleton
                variant="circular"
                width={31}
                height={31}
              />
              <Skeleton
                variant="text"
                width="85%"
                height={21}
                sx={{
                  transform: 'none',
                }}
              />
              <Skeleton
                variant="text"
                width="95%"
                height={16}
                sx={{ transform: 'none' }}
              />
              <Skeleton
                variant="text"
                width="90%"
                height={16}
                sx={{ transform: 'none' }}
              />
              <Skeleton
                variant="text"
                width="85%"
                height={16}
                sx={{ transform: 'none' }}
              />
              <Skeleton
                variant="text"
                width="70%"
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

export default WhyChooseMusafirSkeleton;