import React from "react";
import { AppBar, Toolbar, Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  position: "absolute",
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

interface TopBarSkeletonProps {
  variant?: "home" | "inner";
  showSearchIcon?: boolean;
  isFixed?: boolean;
}

const TopBarSkeleton: React.FC<TopBarSkeletonProps> = ({
  variant = "home",
  showSearchIcon = false,
  isFixed = false,
}) => {
  const isRTL = document.dir === "rtl";

  return (
    <StyledAppBar
      role="status"
      aria-busy="true"
      aria-label="Loading navigation bar"
      sx={{
        position: isFixed ? "fixed" : "absolute",
        transition: "position 0.3s ease-in-out",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 60,
          paddingY: "20px",
          paddingX: "30px",
          flexDirection: isRTL ? "row-reverse" : "row"
        }}
      >
        {variant === "inner" ? (
          <>
            {isRTL ? (
              <>
                <Skeleton
                  variant="circular"
                  width={30}
                  height={30}
                  animation="wave"
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexShrink: 0,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={134}
                    height={18}
                    animation="wave"
                    sx={{ borderRadius: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width={80}
                    height={20}
                    animation="wave"
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
                <Skeleton
                  variant="circular"
                  width={24}
                  height={24}
                  animation="wave"
                  sx={{
                    marginLeft: 1.25,
                    flexShrink: 0,
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                  }}
                />
              </>
            ) : (
              <>
                <Skeleton
                  variant="circular"
                  width={24}
                  height={24}
                  animation="wave"
                  sx={{
                    marginRight: 1.25,
                    flexShrink: 0,
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexShrink: 0,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={134}
                    height={18}
                    animation="wave"
                    sx={{ borderRadius: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width={80}
                    height={20}
                    animation="wave"
                    sx={{ borderRadius: 1 }}
                  />
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Skeleton
                  variant="circular"
                  width={30}
                  height={30}
                  animation="wave"
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                />
              </>
            )}
          </>
        ) : (
          <>
            {isRTL ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={30}
                    height={30}
                    animation="wave"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                  />

                  {showSearchIcon && (
                    <Skeleton
                      variant="circular"
                      width={30}
                      height={30}
                      animation="wave"
                      sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                    />
                  )}

                  <Skeleton
                    variant="circular"
                    width={30}
                    height={30}
                    animation="wave"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                  />

                  <Box sx={{ position: "relative", flexShrink: 0 }}>
                    <Skeleton
                      variant="circular"
                      width={30}
                      height={30}
                      animation="wave"
                      sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        width: 5,
                        height: 5,
                        backgroundColor: "#0080FF",
                        borderRadius: "50%",
                        opacity: 0.3,
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Skeleton
                  variant="rectangular"
                  width={134}
                  height={18}
                  animation="wave"
                  sx={{ borderRadius: 1 }}
                />
              </>
            ) : (
              <>
                <Skeleton
                  variant="rectangular"
                  width={134}
                  height={18}
                  animation="wave"
                  sx={{ borderRadius: 1 }}
                />

                <Box sx={{ flexGrow: 1 }} />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={30}
                    height={30}
                    animation="wave"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                  />

                  {showSearchIcon && (
                    <Skeleton
                      variant="circular"
                      width={30}
                      height={30}
                      animation="wave"
                      sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                    />
                  )}

                  <Skeleton
                    variant="circular"
                    width={30}
                    height={30}
                    animation="wave"
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                  />

                  <Box sx={{ position: "relative", flexShrink: 0 }}>
                    <Skeleton
                      variant="circular"
                      width={30}
                      height={30}
                      animation="wave"
                      sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        width: 5,
                        height: 5,
                        backgroundColor: "#fefefeb8",
                        borderRadius: "50%",
                        opacity: 0.3,
                      }}
                    />
                  </Box>
                </Box>
              </>
            )}
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default React.memo(TopBarSkeleton);
