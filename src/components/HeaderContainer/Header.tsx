import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks';
import css from './Header.module.css';

const Header: React.FC = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser !== null) {
            setLoading(false);
        }
    }, [currentUser]);

    console.log('Current User in Header:', currentUser);

    return (
        <div className={css.Header}>
            <h1 onClick={() => window.location.href = '/'}>My message</h1>
            <div>
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/registration'}>Register</NavLink>
            </div>
            {loading ? (
                <span>Loading...</span>
            ) : (
                currentUser ? (
                    <span className={css.userEmail}>{currentUser.email}</span>
                ) : (
                    <span>No user logged in</span>
                )
            )}
        </div>
    );
};

export { Header };
