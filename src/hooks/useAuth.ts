import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
    const context = useContext(AuthContext);

    useEffect(() => {
        console.log('Current User:', context.currentUser);
    }, [context.currentUser]);

    return context;
};

export { useAuth };
