import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const createFeedback = async ({
    rating,
    comment,
    productItemId,
    orderDetailId,
    productId,
    orderId,
    images,
}) => {
    const formData = new FormData();

    formData.append(
        'feedback',
        JSON.stringify({
            rating,
            comment,
            productItemId,
            orderDetailId,
            productId,
            orderId,
        })
    );

    // Append images
    images.forEach((image) => {
        formData.append('files', image); // Appending each File object
    });

    console.log('FormData Contents:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    const response = await axiosPrivate.post(`/feedbacks`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

const useCreateFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createFeedback,
        onSuccess: (data, variables) => {
            console.log('variables', variables);
            const stringOrderId = String(variables.orderId);
            queryClient.invalidateQueries(['order', stringOrderId]);
            toast.success('Feedback submitted');
        },
        onError: (error) => {
            console.error('Failed to submit feedback', error);
            toast.error('Failed to submit feedback');
        },
    });
};

export default useCreateFeedback;
