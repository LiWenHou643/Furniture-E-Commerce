import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
const AppLayout = () => {
    return (
        <div>
            <Sidebar />
            <Box
                sx={{
                    ml: 20,
                }}
            >
                <Outlet />
            </Box>
        </div>
    );
};

export default AppLayout;
