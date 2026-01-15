import { Box, Container, Skeleton, styled } from '@mui/material';
const AccordionSkeleton = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderBottom: '1px solid rgba(242, 242, 242, 1)',
  padding: theme.spacing(1, 0),
}));

const FaqSectionSkeleton = () => {
  const numberOfFaqs = 6;

  return (
    <Container
      sx={{
        px: '30px',
        py: '20px',
        background: 'rgba(255, 255, 255, 1)',
      }}
    >
      <Skeleton
        variant="text"
        width="80px"
        height={30}
        sx={{ mb: 2, transform: 'scale(1, 0.8)' }}
      />

      <Box sx={{ width: '100%' }}>
        {Array.from(new Array(numberOfFaqs)).map((_, index) => (
          <AccordionSkeleton key={index}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                minHeight: '24px',
              }}
            >
              <Skeleton
                variant="text"
                width={`${70 + Math.random() * 20}%`}
                sx={{ transform: 'scale(1, 0.7)', mr: 2 }}
              />
              <Skeleton variant="circular" width={24} height={24} />
            </Box>
          </AccordionSkeleton>
        ))}
      </Box>
    </Container>
  );
};

export default FaqSectionSkeleton;