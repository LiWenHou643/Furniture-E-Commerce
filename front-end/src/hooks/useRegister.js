import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosPublic from '../api/axiosPublic';
const register = async ({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
}) => {
    const response = await axiosPublic.post('/auth/register', {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
    });
    return response.data;
};

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            // Optionally, you can trigger additional logic after register success
            console.log('Register successful', data?.data);
            navigate('/login'); // Redirect to login page
            toast.success('Register successful');
        },
        onError: (error) => {
            // Handle register failure
            console.error('Register failed', error);
        },
    });
};

export default useRegister;
