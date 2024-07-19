import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextProps {
    currentUser: User | null;
    loginWithToken: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({ currentUser: null, loginWithToken: async () => {} });

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log('User state changed:', user);
        });
        return () => unsubscribe();
    }, []);

    const loginWithToken = async (token: string) => {
        await signInWithCustomToken(auth, token);
    };

    return (
        <AuthContext.Provider value={{ currentUser, loginWithToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export {
    AuthContext,
    AuthProvider
};
