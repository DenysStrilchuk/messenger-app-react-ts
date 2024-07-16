import React, { useState } from 'react';

import {login} from "../../../services";
import css from './Login.module.css'



const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('Unexpected error', error);
            }
        }
    };

    return (
        <div className={css.loginContainer}>
        <form onSubmit={handleSubmit} className={css.loginForm}>
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={css.loginInput}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={css.loginInput}
            />
            <button type="submit" className={css.loginButton}>Login</button>
        </form>
        </div>
    );
};

export {Login};
