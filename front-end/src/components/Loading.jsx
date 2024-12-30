import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='100px'
        >
            <CircularProgress />
        </Box>
    );
};

export default Loading;
// In the above snippet, we created a Loading component that displays a circular loading spinner in the center of the screen. This component can be used to indicate that the content is being loaded.
