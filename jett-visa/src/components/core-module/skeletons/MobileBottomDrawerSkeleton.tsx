import { Box, Skeleton } from '@mui/material'

const MobileBottomDrawerSkeleton = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Skeleton variant="text" width="60%" height={25} />
            <Skeleton variant="rectangular" width="100%" height={42} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 2 }} />
        </Box>
    )
}

export default MobileBottomDrawerSkeleton