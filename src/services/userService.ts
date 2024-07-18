import axios from 'axios';
import { API_BASE_URL } from "../config";

const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getUser = async (uid: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${uid}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export {
    getUsers,
    getUser
};
