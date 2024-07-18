import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from "../../services";
import { useAuth } from "../../hooks";

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await getUsers();
                const filteredUsers = usersList.filter((user: any) => user.uid !== currentUser?.uid); // Исключаем текущего пользователя
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
                {users.map((user: any) => (
                    <li key={user.uid} onClick={() => handleUserClick(user.uid)}>
                        {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { UsersList };
