import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../api/axiosPrivate';

const addProduct = async (product) => {
    const formData = new FormData();

    // Append general product details
    formData.append('productName', product.productName);
    formData.append('productDescription', product.productDescription);
    formData.append('categoryId', product.categoryId);
    formData.append('brandId', product.brandId);
    formData.append('materialId', product.materialId);

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

    console.log('FormData Contents:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    const { data } = await axiosPrivate.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
};

const useAddProduct = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutation = useMutation(addProduct, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('products');
            toast.success('Product added successfully');
            navigate('/products-management/edit/' + data.data.productId);
        },
        onError: (data) => {
            toast.error('Failed to add product:' + data.response.data.message);
        },
    });

    return mutation;
};

export default useAddProduct;
