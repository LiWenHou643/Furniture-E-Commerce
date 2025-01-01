import { useNavigate } from 'react-router-dom';
import axiosPublic from '../api/axiosPublic';
const logout = async () => {
    const response = await axiosPublic.get('/auth/logout');
    return response.data;
};

const useLogout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    return { handleLogout };
};

export default useLogout;
