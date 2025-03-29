import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';
const changeDefaultAddress = async ({
    oldDefaultAddressId,
    newDefaultAddressId,
}) => {
    const response = await axiosPrivate.put(
        '/users/addresses/set-default',
        null,
        {
            params: {
                oldDefaultAddressId: parseInt(oldDefaultAddressId),
                newDefaultAddressId: parseInt(newDefaultAddressId),
            },
        }
    );
    return response.data;
};

const useChangeDefaultAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: changeDefaultAddress,
        onSuccess: (data) => {
            console.log('Changed default address', data);
            queryClient.invalidateQueries(['profile']);
            // Show a success toast
            toast.success('Changed default address');
        },
        onError: (error) => {
            console.error('Failed to change default address', error);
            // Show an error toast
            toast.error('Failed to change default address');
        },
    });
};

export default useChangeDefaultAddress;
