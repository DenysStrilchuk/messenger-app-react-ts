import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithCustomToken, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextProps {
    currentUser: User | null;
    loginWithToken: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    currentUser: null,
    loginWithToken: async () => {},
    logout: async () => {}
});

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

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, loginWithToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
