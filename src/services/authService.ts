import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

import { API_BASE_URL } from '../config';

const register = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, password });
    return response.data;
};

const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
};

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

export {
    register,
    login,
    logout
};
