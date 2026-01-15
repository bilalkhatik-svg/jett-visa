import React from "react";
import { Box, Card, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CARD_WIDTH = 172;
const CARD_HEIGHT = 212;

const Title = styled(Typography)(() => ({
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: 16,
    color: "rgba(0, 54, 107, 1)",
    marginBottom: '20px',
}));

const ScrollContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    overflowX: "auto",
    gap: 20,
    paddingBottom: theme.spacing(1),
    scrollSnapType: "x mandatory",
    "&::-webkit-scrollbar": {
        display: "none",
    },
    msOverflowStyle: "none",
    scrollbarWidth: "none",
}));

const ItemWrapper = styled("div")({
    scrollSnapAlign: "start",
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    gap: '20px',
});

const StyledCard = styled(Card)({
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    border: "4px solid rgba(242, 242, 248, 1)",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
    marginBottom: '20px',
});

const StickerWrapper = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    background: "rgba(255, 255, 255, 0.6)",
    width: 76,
    height: 27,
    padding: "6px 6px 6px 14px",
    display: "flex",
    alignItems: "center",
    borderBottomRightRadius: 9,
    zIndex: 10,
});

const BottomOverlay = styled(Box)({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 90,
    backdropFilter: "blur(2px)",
    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 48.78%, rgba(0,0,0,0.3) 100%)",
    display: "flex",
    alignItems: "flex-end",
    padding: "8px 10px",
    boxSizing: "border-box",
    zIndex: 5,
});

const TextContainer = styled(Box)({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
});

const TimeInfoWrapper = styled(Box)(() => ({
    position: "absolute",
    bottom: 10,
    right: 0,
    background: "rgba(255, 255, 255, 0.3)",
    height: 27,
    padding: "6px 10px",
    display: "flex",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 10,
}));

const DestinationCardSkeleton: React.FC = () => {
    return (
        <StyledCard variant="outlined">
            <StickerWrapper>
                <Skeleton
                    variant="text"
                    width={50}
                    height={10}
                    animation="wave"
                    sx={{ bgcolor: "rgba(0, 0, 0, 0.1)" }}
                />
            </StickerWrapper>

            <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />

            <BottomOverlay>
                <TextContainer>
                    <Box>
                        <Skeleton
                            variant="text"
                            width={80}
                            height={14}
                            animation="wave"
                            sx={{
                                bgcolor: "rgba(255, 255, 255, 0.3)",
                                mb: 0.5,
                            }}
                        />
                        <Skeleton
                            variant="text"
                            width={60}
                            height={12}
                            animation="wave"
                            sx={{ bgcolor: "rgba(255, 255, 255, 0.3)" }}
                        />
                    </Box>

                    <TimeInfoWrapper>
                        <Skeleton
                            variant="text"
                            width={40}
                            height={10}
                            animation="wave"
                            sx={{ bgcolor: "rgba(255, 255, 255, 0.4)" }}
                        />
                    </TimeInfoWrapper>
                </TextContainer>
            </BottomOverlay>
        </StyledCard>
    );
};

interface TopDestinationsSkeletonProps {
    numberOfItems?: number;
}

const TopDestinationsSkeleton: React.FC<TopDestinationsSkeletonProps> = ({
    numberOfItems = 3
}) => {
    return (
        <Box
            role="status"
            aria-busy="true"
            aria-label="Loading top destinations"
            width="100%"
            sx={{
                background: 'rgba(255, 255, 255, 1)',
                px: '30px',
                py: '20px',
                pt: '40px',
            }}
        >
            <Title>
                <Skeleton
                    variant="text"
                    width={150}
                    height={24}
                    animation="wave"
                />
            </Title>

            <ScrollContainer>
                {Array.from({ length: numberOfItems }).map((_, idx) => (
                    <ItemWrapper key={idx}>
                        <DestinationCardSkeleton />
                        <DestinationCardSkeleton />
                    </ItemWrapper>
                ))}
            </ScrollContainer>
        </Box>
    );
};

export default React.memo(TopDestinationsSkeleton);