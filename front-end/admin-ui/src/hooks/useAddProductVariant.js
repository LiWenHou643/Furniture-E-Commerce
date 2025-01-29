import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../api/axiosPrivate';

const addProductVariant = async (productVariant) => {
    const formData = new FormData();

    // Append general product details
    formData.append('productId', productVariant.productId);
    formData.append('sku', productVariant.sku);
    formData.append('originalPrice', productVariant.originalPrice);
    formData.append('salePrice', productVariant.salePrice);
    formData.append('stockQuantity', productVariant.stockQuantity);

    // Append color details
    formData.append('colorId', productVariant.colorId);
    formData.append('colorName', productVariant.colorName);
    formData.append('hexCode', productVariant.hexCode);

    // Append images
    productVariant.productImages.forEach((image, imageIndex) => {
        formData.append(`productImages[${imageIndex}].file`, image.file);
        formData.append(
            `productImages[${imageIndex}].mainImage`,
            image.mainImage
        );
    });

    console.log('FormData Contents:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    const response = await axiosPrivate.post(
        '/products/product-items',
        formData
    );
    return response.data;
};

const useAddProductVariant = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation(addProductVariant, {
        onSuccess: () => {
            queryClient.invalidateQueries('productVariants');
            navigate('/admin/products');
            toast.success('Product variant added successfully');
        },
        onError: () => {
            toast.error('Failed to add product variant');
        },
    });
};

export default useAddProductVariant;
