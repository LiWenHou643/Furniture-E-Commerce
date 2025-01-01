export const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    // Add token validation logic if needed
    return !!token;
};
