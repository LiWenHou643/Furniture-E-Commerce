import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Typography,
} from '@mui/material';

const Sidebar = () => {
    return (
        <Box
            sx={{
                borderRight: 1,
                borderColor: 'divider',
                padding: 2,
                display: 'flex',
                flexDirection: 'column', // Ensures the items are stacked in a column
                height: '100%', // Full height of the sidebar
            }}
        >
            <Typography variant='h6'>Filters</Typography>
            <Divider sx={{ marginY: 2 }} />

            {/* Category Filter */}
            <Typography variant='subtitle1'>Category</Typography>
            <FormControlLabel control={<Checkbox />} label='Seating' />
            <FormControlLabel control={<Checkbox />} label='Table' />
            <FormControlLabel control={<Checkbox />} label='Bed' />
            <FormControlLabel control={<Checkbox />} label='Decor' />

            <Divider sx={{ marginY: 2 }} />

            {/* Price Filter */}
            <Typography variant='subtitle1'>Price</Typography>
            <FormControlLabel control={<Checkbox />} label='$0 - $50' />
            <FormControlLabel control={<Checkbox />} label='$50 - $100' />
            <FormControlLabel control={<Checkbox />} label='$100 - $200' />
            <FormControlLabel control={<Checkbox />} label='$200+' />
        </Box>
    );
};

export default Sidebar;
