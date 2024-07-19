import { useContext, useEffect } from 'react';
import {AuthContext} from "../contexts";

const useAuth = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log('Current User:', authContext.currentUser);
    }, [authContext.currentUser]);

    return authContext;
};

export { useAuth };
