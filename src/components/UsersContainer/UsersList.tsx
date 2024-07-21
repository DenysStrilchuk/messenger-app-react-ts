import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUsers } from "../../services";
import { useAuth } from "../../hooks";
import css from './UsersList.module.css';

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await getUsers();
                const filteredUsers = usersList.filter((user: any) => user.uid !== currentUser?.uid);
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
                {users.map((user: any) => (
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
