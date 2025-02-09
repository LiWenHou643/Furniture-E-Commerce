import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../api/axiosPrivate';

const createOrder = async ({
    shippingAddress,
    shippingMethod,
    paymentMethod,
    shippingCost,
    notes,
    orderDetails,
}) => {
    const response = await axiosPrivate.post('/orders', {
        shippingAddress,
        shippingMethod,
        paymentMethod,
        shippingCost,
        notes,
        orderDetails,
    });
    return response.data;
};

const useCreateOrder = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate(); // Hook to programmatically navigate

    return useMutation({
        mutationFn: createOrder,
        onSuccess: (data, variables) => {
            console.log('Order created', data, variables);
            queryClient.invalidateQueries(['orders']);
            queryClient.invalidateQueries(['cart']);
            queryClient.invalidateQueries(['products']);

            const { orderDetails } = variables;

            // Refresh the product stock
            orderDetails.forEach((orderItem) => {
                queryClient.invalidateQueries(['product', orderItem.productId]);
            });

            // // Check the payment method and handle accordingly
            if (variables.paymentMethod === 'paypal' && data?.data?.paypalUrl) {
                // Redirect to the PayPal payment link
                window.location.href = data?.data?.paypalUrl;
            } else if (variables.paymentMethod === 'cod') {
                toast.success('Order created successfully!');
                // Optional: Navigate to a confirmation page or display additional UI
                navigate(`/orders/${data.data.orderId}`);
            } else {
                toast.error('Unexpected response from the server.');
            }
        },
        onError: (error) => {
            console.error('Failed to create order', error.response);
            toast.error(error.response?.data?.message);
        },
    });
};

export default useCreateOrder;
