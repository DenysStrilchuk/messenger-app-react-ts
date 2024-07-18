import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services';
import { useAuth } from '../../hooks';
import {IUser} from '../../types/User';

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList: IUser[] = await getUsers();
                const filteredUsers = usersList.filter((user: IUser) => user.uid !== currentUser?.uid); // Исключаем текущего пользователя
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
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users.map((user: IUser) => (
                    <li key={user.uid} onClick={() => handleUserClick(user.uid)}>
                        {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { UsersList };
