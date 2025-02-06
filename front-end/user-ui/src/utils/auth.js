import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    // Add token validation logic if needed
    return !!token;
};

export const userId = () => {
    // Check if there's a valid JWT token
    const token = localStorage.getItem('jwt');
    if (!token) {
        // Check if a guest userId already exists in sessionStorage
        let guestId = sessionStorage.getItem('guestId');

        if (!guestId) {
            // Generate a fixed guest userId for this session
            guestId = Math.floor(Math.random() * 1000000).toString();
            sessionStorage.setItem('guestId', guestId);
        }

        return guestId;
    }

    try {
        const decodedToken = jwtDecode(token); // Decode the JWT token
        return decodedToken.userId || null; // Return userId from token
    } catch (error) {
        console.error('Error decoding token', error);
        return null;
    }
};
