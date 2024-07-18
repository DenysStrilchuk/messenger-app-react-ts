import { useContext, useEffect, useState } from 'react';
import {AuthContext} from "../contexts";

const useAuth = () => {
    const { currentUser } = useContext(AuthContext);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (currentUser) {
            currentUser.getIdToken().then(setToken);
        }
    }, [currentUser]);

    return { currentUser, token };
};

export { useAuth };
