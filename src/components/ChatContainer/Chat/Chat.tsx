import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onSnapshot, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

import { useAuth } from '../../../hooks';
import { deleteMessage, getMessages, updateMessage } from '../../../services';
import css from './Chat.module.css';
import { MessageForm } from "../MessageForm";
import { MessageList } from "../MessageList";

interface ChatProps {
    receiver: { uid: string; email: string };
}

const Chat: React.FC<ChatProps> = ({ receiver }) => {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [editingMessage, setEditingMessage] = useState<any | null>(null);
    const navigate = useNavigate(); // Ініціалізуємо useNavigate

    useEffect(() => {
        if (!currentUser) return;

        const q = getMessages(currentUser.uid, receiver.uid);
        const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<any>) => {
            const msgs = snapshot.docs.map((doc: QueryDocumentSnapshot<any>) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [currentUser, receiver, messages]);

    const handleDeleteMessage = async (id: string) => {
        if (currentUser) {
            await deleteMessage(id);
        } else {
            console.error('User is not authenticated');
        }
    };

    const handleEditMessage = (message: any) => {
        setEditingMessage(message);
    };

    const handleUpdateMessage = async (id: string, newText: string) => {
        if (currentUser) {
            await updateMessage(id, newText);
            setEditingMessage(null);
        } else {
            console.error('User is not authenticated');
        }
    };

    const handleBackClick = () => {
        navigate(-1); // Повертає на попередню сторінку
    };

    return (
        <div className={css.chatContainer}>
            <button className={css.backButton} onClick={handleBackClick}>Back</button>
            <h2 className={css.chatHeader}>Chat with {receiver.email}</h2>
            <div className={css.chatMessages}>
                {currentUser && (
                    <MessageList
                        senderId={currentUser.uid}
                        receiverId={receiver.uid}
                        onDelete={handleDeleteMessage}
                        onEdit={handleEditMessage}
                    />
                )}
            </div>
            <MessageForm
                receiverId={receiver.uid}
                editingMessage={editingMessage}
                onUpdateMessage={handleUpdateMessage}
            />
        </div>
    );
};

export { Chat };
