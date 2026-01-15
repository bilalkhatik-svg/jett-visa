import React from "react";
import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const PAGE_MAX_WIDTH = 375;

const PageWrapper = styled(Box)(() => ({
  minHeight: "100vh",
  background: "linear-gradient(180deg, #F6F9FF 0%, #FFFFFF 60%)",
  paddingBottom: "32px",
}));

const PageContainer = styled(Box)(() => ({
  maxWidth: `${PAGE_MAX_WIDTH}px`,
  margin: "0 auto",
}));

const HeaderWrapper = styled(Box)(() => ({
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "20px 30px",
}));

const SectionCard = styled(Box)(() => ({
  width: "315px",
  borderRadius: "20px",
  padding: "20px",
  margin: "0 auto 24px",
  backgroundColor: "#FFFFFF",
  border: "2px solid #F2F2F8",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
}));

const GetHelpSkeleton: React.FC = () => {
  return (
    <PageWrapper>
      <PageContainer>
        {/* Header Skeleton */}
        <HeaderWrapper>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton
            variant="text"
            width={100}
            height={16}
            sx={{ flex: 1, mx: "auto" }}
          />
          <Box sx={{ width: 24, height: 24 }} />
        </HeaderWrapper>

        {/* Quick Assistance Section Skeleton */}
        <SectionCard>
          <Skeleton
            variant="text"
            width={140}
            height={16}
            sx={{ mb: "20px" }}
          />
          <Box sx={{ width: "275px", margin: "0 auto", gap: "10px", display: "flex", flexDirection: "column" }}>
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                sx={{
                  width: "275px",
                  height: "69px",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width={35}
                  height={35}
                  sx={{ borderRadius: "6px" }}
                />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width={100} height={14} />
                  <Skeleton variant="text" width={150} height={12} sx={{ mt: 0.5 }} />
                </Box>
              </Box>
            ))}
          </Box>
        </SectionCard>

        {/* Other Ways Section Skeleton */}
        <SectionCard>
          <Skeleton
            variant="text"
            width={180}
            height={16}
            sx={{ mb: "20px" }}
          />
          <Box sx={{ width: "275px", margin: "0 auto", gap: "10px", display: "flex", flexDirection: "column" }}>
            {[1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: "275px",
                  height: "69px",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width={35}
                  height={35}
                  sx={{ borderRadius: "6px" }}
                />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width={120} height={14} />
                  <Skeleton variant="text" width={180} height={12} sx={{ mt: 0.5 }} />
                </Box>
              </Box>
            ))}
          </Box>
        </SectionCard>
      </PageContainer>
    </PageWrapper>
  );
};

export default GetHelpSkeleton;

