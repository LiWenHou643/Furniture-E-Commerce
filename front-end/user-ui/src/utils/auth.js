import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    // Add token validation logic if needed
    return !!token;
};

export const userId = () => {
    // Parse token to get user ID
    const token = localStorage.getItem('jwt');
    if (!token) {
        // If there's no token, return a random user ID for guest users
        return Math.floor(Math.random() * 1000000); // Random userId between 0 and 1,000,000
    }
    try {
        const decodedToken = jwtDecode(token); // Decode the JWT token

        // Assuming the user ID is stored in the payload as 'userId'
        // You may need to adjust the key based on your backend implementation
        return decodedToken.userId || null;
    } catch (error) {
        console.error('Error decoding token', error);
        return null;
    }
};
