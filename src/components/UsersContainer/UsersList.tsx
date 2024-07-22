import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUsers } from "../../services";
import { useAuth } from "../../hooks";
import css from './UsersList.module.css';
import { IUser } from "../../types/User";

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (!currentUser) {
                    return;
                }

                const usersList = await getUsers();

                const filteredUsers = usersList.filter((user: IUser) => user.uid !== currentUser.uid);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, [currentUser]);

    const handleUserClick = (userId: string) => {
        navigate(`/chat/${userId}`);
    };

    return (
        <div className={css.usersContainer}>
            <h2 className={css.usersList}>Registered Users</h2>
            <ul>
                {users.map((user: IUser) => (
                    <li key={user.uid} onClick={() => handleUserClick(user.uid)}>
                        <p>{user.email}</p>
                        <button>Chat</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { UsersList };
