import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
};

const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
};

const logout = async () => {
    await getAuth().signOut();
};

export {
    register,
    login,
    logout
};
