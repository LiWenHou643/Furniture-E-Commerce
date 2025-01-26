import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const addProduct = async (product) => {
    const formData = new FormData();

    // Append general product details
    formData.append('productName', product.productName);
    formData.append('productDescription', product.productDescription);

    // Append product items
    product.productItems.forEach((item, itemIndex) => {
        formData.append(`productItems[${itemIndex}].sku`, item.sku);
        formData.append(
            `productItems[${itemIndex}].originalPrice`,
            item.originalPrice
        );
        formData.append(`productItems[${itemIndex}].salePrice`, item.salePrice);
        formData.append(
            `productItems[${itemIndex}].stockQuantity`,
            item.stockQuantity
        );

        // Append color details
        formData.append(
            `productItems[${itemIndex}].color.colorId`,
            item.color.colorId
        );
        formData.append(
            `productItems[${itemIndex}].color.colorName`,
            item.color.colorName
        );
        formData.append(
            `productItems[${itemIndex}].color.hexCode`,
            item.color.hexCode
        );

        // Append images
        item.productImages.forEach((image, imageIndex) => {
            formData.append(
                `productItems[${itemIndex}].productImages[${imageIndex}].file`,
                image.file
            );
            formData.append(
                `productItems[${itemIndex}].productImages[${imageIndex}].mainImage`,
                image.mainImage
            );
        });
    });

    const { data } = await axiosPrivate.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
};

const useAddProduct = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(addProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            toast.success('Product added successfully');
        },
        onError: () => {
            toast.error('Failed to add product');
        },
    });

    return mutation;
};

export default useAddProduct;
