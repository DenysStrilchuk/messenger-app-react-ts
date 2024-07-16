import axios from "axios";

const register = async (email: string, password: string) => {
    const response = await axios.post('/auth/register', { email, password });
    return response.data;
};

const login = async (email: string, password: string) => {
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
};

export {
    register,
    login
};
