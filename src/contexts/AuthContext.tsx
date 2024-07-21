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
            console.log('User state changed in AuthProvider:', user);
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const loginWithToken = async (token: string) => {
        try {
            await signInWithCustomToken(auth, token);
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, loginWithToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
