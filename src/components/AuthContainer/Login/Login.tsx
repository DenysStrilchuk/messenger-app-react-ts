import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import css from './Login.module.css';
import { login } from "../../../services";
import { useAuth } from "../../../hooks";
import { Modal } from "../../ModalWindowContainer";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { loginWithToken } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await login(email, password);
            await loginWithToken(token);
            navigate('/users');
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                setShowModal(true);
            } else {
                console.error('Unexpected error', error);
                setShowModal(true);
            }
        }
    };

    const handleConfirm = () => {
        setShowModal(false);
        navigate('/registration'); // Перенаправлення на сторінку реєстрації
    };

    const handleCancel = () => {
        setShowModal(false);
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
            {showModal && (
                <Modal
                    message="You are not a registered user. Register?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export { Login };
