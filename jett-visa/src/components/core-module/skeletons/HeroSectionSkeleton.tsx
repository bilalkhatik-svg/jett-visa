import React from "react";
import { Box, Skeleton } from "@mui/material";

interface HeroSectionSkeletonProps { }

const HeroSectionSkeleton: React.FC<HeroSectionSkeletonProps> = () => {
  return (
    <Box
      role="status"
      aria-busy="true"
      aria-label="Loading hero section"
      sx={{
        position: "relative",
        width: "100%",
        height: "365px",
        backgroundImage: `linear-gradient(200deg, #e7c0eeff, #a0e0e3ff 100%),linear-gradient(to top right, #dbd68fff 0%, transparent 50%)`,
        backgroundBlendMode: "screen",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        borderBottom: "1px solid #1976d2",
        paddingBottom: "40px",
        paddingTop: "60px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 3, ml: 2, gap: 2 }}>
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Skeleton
            variant="rectangular"
            width={162.65}
            height={80}
            animation="wave"
            sx={{
              borderRadius: 2,
              bgcolor: "rgba(255, 255, 255, 0.3)",
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "40px",
          mb: 2,
          justifyContent: "center",
          alignItems: "center",
          height: "86px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Skeleton
            variant="rounded"
            width={56}
            height={56}
            animation="wave"
            sx={{
              borderRadius: "12px",
              bgcolor: "rgba(255, 255, 255, 0.6)",
            }}
          />
          <Skeleton
            variant="text"
            width={70}
            height={14}
            animation="wave"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.4)",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Skeleton
            variant="rounded"
            width={56}
            height={56}
            animation="wave"
            sx={{
              borderRadius: "12px",
              bgcolor: "rgba(255, 255, 255, 0.6)",
            }}
          />
          <Skeleton
            variant="text"
            width={65}
            height={14}
            animation="wave"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.4)",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Skeleton
            variant="rounded"
            width={56}
            height={56}
            animation="wave"
            sx={{
              borderRadius: "12px",
              bgcolor: "rgba(255, 255, 255, 0.6)",
            }}
          />
          <Skeleton
            variant="text"
            width={70}
            height={14}
            animation="wave"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.4)",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ width: "315px", height: "45px", margin: "12px 0px" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{
            borderRadius: "14px",
            bgcolor: "rgba(255, 255, 255, 0.7)",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "-25px",
          left: "50%",
          width: "135px",
          transform: "translateX(-50%)",
          borderRadius: "30px",
          padding: "2px",
          background: "linear-gradient(135deg, #D536F6, #0AB1BA)",
          display: "inline-block",
        }}
      >
        <Box
          sx={{
            borderRadius: "28px",
            px: 1.5,
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            gap: 1.5,
          }}
        >
          <Skeleton
            variant="circular"
            width={30}
            height={30}
            animation="wave"
            sx={{
              bgcolor: "rgba(213, 54, 246, 0.2)",
            }}
          />
          <Skeleton
            variant="text"
            width={70}
            height={20}
            animation="wave"
            sx={{
              bgcolor: "rgba(10, 177, 186, 0.2)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(HeroSectionSkeleton);