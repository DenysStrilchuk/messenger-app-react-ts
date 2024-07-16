import React, { useState } from 'react';

import { register } from "../../../services";
import css from "./Register.module.css";

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(email, password);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('Unexpected error', error);
            }
        }
    };

    return (
        <div className={css.registerContainer}>
        <form onSubmit={handleSubmit} className={css.registerForm}>
            <h2>Register</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={css.registerInput}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={css.registerInput}
            />
            <button type="submit" className={css.registerButton}>Register</button>
        </form>
        </div>
    );
};

export { Register };
