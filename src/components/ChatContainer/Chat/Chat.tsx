import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onSnapshot, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

import { useAuth } from '../../../hooks';
import { deleteMessage, getMessages, updateMessage } from '../../../services';
import css from './Chat.module.css';
import { MessageForm } from "../MessageForm";
import { MessageList } from "../MessageList";
import { IMessage } from '../../../types/Message';

interface ChatProps {
    receiver: { uid: string; email: string };
}

const Chat: React.FC<ChatProps> = ({ receiver }) => {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [editingMessage, setEditingMessage] = useState<IMessage | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) return;

        const q = getMessages(currentUser.uid, receiver.uid);
        const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<IMessage>) => {
            const msgs = snapshot.docs.map((doc: QueryDocumentSnapshot<IMessage>) => {
                const data = doc.data() as IMessage;
                return {
                    ...data,
                    id: doc.id,
                };
            });
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

    const handleEditMessage = (message: IMessage) => {
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
        navigate(-1);
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
