import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const Error = ({ error }) => {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='100px'
        >
            <Alert severity='error'>Error: {error.message}</Alert>
        </Box>
    );
};

export default Error;
