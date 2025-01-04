import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import useFetchBrand from '../../hooks/useFetchBrand';
import useFetchCategory from '../../hooks/useFetchCategory';
import useFetchMaterial from '../../hooks/useFetchMaterial';
const Sidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [priceRange, setPriceRange] = useState({
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
    });

    const { data: categories, isLoading: loadingCategories } =
        useFetchCategory();

    const { data: brands, isLoading: loadingBrands } = useFetchBrand();

    const { data: materials, isLoading: loadingMaterials } = useFetchMaterial();

    if (loadingCategories || loadingBrands || loadingMaterials) {
        return <Loading />;
    }

    const decodeArrayParam = (param) => (param ? param.split(',') : []);
    const encodeArrayParam = (array) =>
        array.length > 0 ? array.join(',') : null;

    const updateSearchParams = (key, value) => {
        const params = new URLSearchParams(searchParams);

        if (value === null || value.length === 0) {
            params.delete(key);
        } else if (Array.isArray(value)) {
            params.set(key, encodeArrayParam(value));
        } else {
            params.set(key, value);
        }

        // Reset page to 1 whenever filters are updated
        params.set('page', '1');
        setSearchParams(params);
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCheckboxChange = (key, value) => {
        const currentValues = decodeArrayParam(searchParams.get(key));
        const updatedValues = currentValues.includes(value.toString())
            ? currentValues.filter((item) => item !== value.toString()) // Remove value if it exists
            : [...currentValues, value.toString()]; // Add value if it doesn't exist

        updateSearchParams(key, updatedValues);
    };

    const handlePriceApply = () => {
        updateSearchParams('minPrice', priceRange.minPrice || null);
        updateSearchParams('maxPrice', priceRange.maxPrice || null);
    };

    const handleStarChange = (value) => {
        updateSearchParams('stars', value ? value.toString() : null);
    };

    return (
        <Box
            sx={{
                borderRight: 1,
                borderColor: 'divider',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <Typography variant='h6'>Filters</Typography>
            <Divider sx={{ marginY: 2 }} />

            {/* Category Filter */}
            <Typography variant='subtitle1'>Category</Typography>
            {categories?.map((category) => (
                <FormControlLabel
                    key={category.categoryId + category.categoryName}
                    control={
                        <Checkbox
                            checked={decodeArrayParam(
                                searchParams.get('categories')
                            ).includes(category.categoryId.toString())}
                            onChange={() =>
                                handleCheckboxChange(
                                    'categories',
                                    category.categoryId
                                )
                            }
                        />
                    }
                    label={category.categoryName}
                />
            ))}

            <Divider sx={{ marginY: 2 }} />

            {/* Price Filter */}
            <Typography variant='subtitle1'>Price</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    label='Min'
                    variant='outlined'
                    size='small'
                    type='number'
                    value={priceRange.minPrice}
                    onChange={(e) =>
                        setPriceRange({
                            ...priceRange,
                            minPrice: e.target.value,
                        })
                    }
                />
                <TextField
                    label='Max'
                    variant='outlined'
                    size='small'
                    type='number'
                    value={priceRange.maxPrice}
                    onChange={(e) =>
                        setPriceRange({
                            ...priceRange,
                            maxPrice: e.target.value,
                        })
                    }
                />
                <Button
                    variant='contained'
                    size='small'
                    onClick={handlePriceApply}
                >
                    Apply
                </Button>
            </Box>

            <Divider sx={{ marginY: 2 }} />

            {/* Star Filter */}
            <Typography variant='subtitle1'>Stars</Typography>
            <Rating
                name='star-filter'
                value={parseInt(searchParams.get('stars') || 0, 10)}
                onChange={(event, newValue) => handleStarChange(newValue)}
            />

            <Divider sx={{ marginY: 2 }} />

            {/* Brand Filter */}
            <Typography variant='subtitle1'>Brands</Typography>
            {brands?.map((brand) => (
                <FormControlLabel
                    key={brand.brandId + brand.brandName}
                    control={
                        <Checkbox
                            checked={decodeArrayParam(
                                searchParams.get('brands')
                            ).includes(brand.brandId)}
                            onChange={() =>
                                handleCheckboxChange('brands', brand.brandId)
                            }
                        />
                    }
                    label={brand.brandName}
                />
            ))}

            <Divider sx={{ marginY: 2 }} />

            {/* Material Filter */}
            <Typography variant='subtitle1'>Materials</Typography>
            {materials.map((material) => (
                <FormControlLabel
                    key={material.materialId + material.materialName}
                    control={
                        <Checkbox
                            checked={decodeArrayParam(
                                searchParams.get('materials')
                            ).includes(material.materialId)}
                            onChange={() =>
                                handleCheckboxChange(
                                    'materials',
                                    material.materialId
                                )
                            }
                        />
                    }
                    label={material.materialName}
                />
            ))}
        </Box>
    );
};

export default Sidebar;
