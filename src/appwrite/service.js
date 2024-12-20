import { account } from './appwrite';

// Signup Function
export const signup = async (name, email, password) => {
    try {
        const response = await account.create('unique()', email, password, name);
        console.log('User signed up:', response);
        return response;
    } catch (error) {
        console.error('Signup Error:', error);
        throw error;
    }
};

// Login Function
export const login = async (email, password) => {
    try {
        const response = await account.createEmailPasswordSession(email, password);
        console.log('User logged in:', response);
        return response;
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

// Logout Function
export const logout = async () => {
    try {
        await account.deleteSession('current');
        console.log('User logged out');
    } catch (error) {
        console.log('Logout Error:', error);
        throw error;
    }
};

// Get Current User
export const getUser = async () => {
    try {
        const user = await account.get();
        console.log('Current User:', user);
        return user;
    } catch (error) {
        console.log('Get User Error:', error);
        throw error;
    }
};
