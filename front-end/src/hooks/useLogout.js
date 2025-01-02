import axiosPrivate from '../api/axiosPrivate';
const logout = async () => {
    const response = await axiosPrivate.get('/auth/logout');
    return response.data;
};

const useLogout = () => {
    const handleLogout = async () => {
        await logout();
        localStorage.removeItem('jwt');
        window.location.href = '/login';
    };

    return { handleLogout };
};

export default useLogout;
