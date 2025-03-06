import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const updateProductVariant = async (editVariant, newImages) => {
    const formData = new FormData();

    formData.append('color', JSON.stringify(editVariant.color));
    formData.append('originalPrice', editVariant.originalPrice);
    formData.append('productId', editVariant.productId);
    formData.append('productItemId', editVariant.productItemId);
    formData.append(
        'productItemStatus',
        JSON.stringify(editVariant.productItemStatus)
    );
    formData.append('salePrice', editVariant.salePrice);
    formData.append('sku', editVariant.sku);
    formData.append('stockQuantity', editVariant.stockQuantity);

    // Append existing images
    editVariant.productImages.forEach((image, imageIndex) => {
        if (image.file) {
            formData.append(`productImages[${imageIndex}].file`, image.file);
        } else {
            formData.append(
                `productImages[${imageIndex}].imageUrl`,
                image.imageUrl
            );
            formData.append(
                `productImages[${imageIndex}].imageId`,
                image.imageId
            );
        }
        formData.append(
            `productImages[${imageIndex}].mainImage`,
            image.mainImage
        );
    });

    if (newImages.length !== 0) {
        // Append new images
        newImages.forEach((img, newIndex) => {
            if (img.file) {
                formData.append(`newProductImages[${newIndex}].file`, img.file);
                formData.append(
                    `newProductImages[${newIndex}].mainImage`,
                    img.mainImage
                );
            }
        });
    }

    console.log('FormData Contents:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    const response = await axiosPrivate.put(
        '/products/product-items',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};

const useUpdateProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ editVariant, newImages }) =>
            updateProductVariant(editVariant, newImages),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries('products');
                queryClient.invalidateQueries('product', data?.data?.productId);
                toast.success('Product variant updated successfully');
            },
            onError: () => {
                toast.error('Failed to update product variant');
            },
        }
    );
};

export default useUpdateProductVariant;
