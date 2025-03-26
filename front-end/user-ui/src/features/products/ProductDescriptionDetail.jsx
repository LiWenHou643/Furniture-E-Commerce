import {
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components for a modern e-commerce look
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    margin: 'auto',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 600,
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.grey[300]}`,
}));

const ValueCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
}));

const DescriptionDetail = ({ descriptionDetail }) => {
    const tableRows = [
        { label: 'Description', value: descriptionDetail?.shortDescription },
        { label: 'Style', value: descriptionDetail?.style },
        {
            label: 'Upholstery Material',
            value: descriptionDetail?.upholsteryMaterial,
        },
        { label: 'Frame Material', value: descriptionDetail?.frameMaterial },
        { label: 'Cushion Filling', value: descriptionDetail?.cushionFilling },
        {
            label: 'Dimensions',
            value: `${descriptionDetail?.dimensionsLength}"L x ${descriptionDetail?.dimensionsWidth}"W x ${descriptionDetail?.dimensionsHeight}"H`,
        },
        { label: 'Weight', value: `${descriptionDetail?.weight} lbs` },
        {
            label: 'Weight Capacity',
            value: `${descriptionDetail?.weightCapacity} lbs`,
        },
        {
            label: 'Features',
            value: (
                <FeatureChip label={descriptionDetail?.features} size='small' />
            ),
        },
        {
            label: 'Ergonomic Design',
            value: descriptionDetail?.ergonomicDesign ? 'Yes' : 'No',
        },
        {
            label: 'Assembly Required',
            value: descriptionDetail?.assemblyRequired ? 'Yes' : 'No',
        },
        {
            label: 'Care Instructions',
            value: descriptionDetail?.careInstructions,
        },
        { label: 'Intended Use', value: descriptionDetail?.intendedUse },
        {
            label: 'Durability Rating',
            value: descriptionDetail?.durabilityRating,
        },
    ];

    return (
        <Box sx={{ padding: 4 }}>
            <Typography
                variant='h5'
                gutterBottom
                sx={{ fontWeight: 600, mb: 3 }}
            >
                Description Details
            </Typography>

            {descriptionDetail == null ||
            Object.keys(descriptionDetail).length === 0 ? (
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                    No description details available.
                </Typography>
            ) : (
                <StyledTableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {tableRows.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                >
                                    <HeaderCell>{row.label}</HeaderCell>
                                    <ValueCell>{row.value}</ValueCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            )}
        </Box>
    );
};

export default DescriptionDetail;
