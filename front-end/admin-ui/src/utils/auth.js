import { jwtDecode } from 'jwt-decode';

// Check if the user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    // Add token validation logic if needed
    return !!token; // Returns true if the token exists, false otherwise
};

// Check if the user is an admin
export const isAdmin = () => {
    const token = localStorage.getItem('jwt');

    if (!token) {
        return false; // No token means the user is not authenticated
    }

    try {
        // Decode the token to access its payload
        const decodedToken = jwtDecode(token);

        // Extract the role from the decoded token
        // Adjust this based on how your JWT payload is structured
        const role =
            decodedToken.role || decodedToken.authorities || decodedToken.scope;

        // Check if the role is 'ROLE_ADMIN'
        return role === 'ROLE_ADMIN';
    } catch (error) {
        console.error('Error decoding token:', error);
        return false; // Invalid token
    }
};
