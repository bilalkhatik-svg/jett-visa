import React from "react";
import { Box, Card, CardContent, Skeleton } from "@mui/material";
import { theme } from "@/theme";

interface DestinationCardSkeletonProps {
  count?: number;
}

const DestinationCardSkeleton: React.FC<DestinationCardSkeletonProps> = ({
  count = 4,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={`skeleton-${index}`}
          sx={{
            display: "flex",
            justifyContent: "center",
            flex: "0 0 calc(50% - 8px)", 
          }}
        >
          <Card
            sx={{
              position: "relative",
              width: 146,
              height: 212,
              border: `4px solid ${theme?.palette?.customColors?.white[28]}`,
              borderRadius: "20px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: theme?.palette?.customColors?.grey[29],
              }}
            />
            <CardContent
              sx={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                p: "8px !important",
                height: "100%",
              }}
            >
              <Skeleton
                variant="text"
                width={100}
                height={20}
                sx={{
                  mb: 0.5,
                  bgcolor: theme?.palette?.customColors?.grey[29],
                }}
              />
              <Skeleton
                variant="text"
                width={80}
                height={16}
                sx={{
                  mb: 1,
                  bgcolor: theme?.palette?.customColors?.grey[29],
                }}
              />
              <Skeleton
                variant="rectangular"
                width={61}
                height={27}
                sx={{
                  borderRadius: "20px",
                  bgcolor: theme?.palette?.customColors?.grey[29],
                }}
              />
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default DestinationCardSkeleton;

