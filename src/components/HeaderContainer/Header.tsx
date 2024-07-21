import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../hooks';
import css from './Header.module.css';

const Header: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser !== null) {
            setLoading(false);
        }
    }, [currentUser]);

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/login';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className={css.Header}>
            <h1 onClick={() => window.location.href = '/'}>My message</h1>
            <div>
                {!currentUser ? (
                    <>
                        <NavLink to={'/login'} className={css.NavLink}>Login</NavLink>
                        <NavLink to={'/registration'} className={css.NavLink}>Register</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to={'/users'} className={css.NavLink}>Users</NavLink>
                        <button className={css.logoutButton} onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
            {loading ? (
                <span className={css.loadingText}>Unregistered user</span>
            ) : (
                currentUser && <span className={css.userEmail}>{currentUser.email}</span>
            )}
        </div>
    );
};

export { Header };
