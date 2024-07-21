import React, { useState, useEffect } from 'react';
import { onSnapshot, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

import { useAuth } from '../../../hooks';
import { deleteMessage, getMessages, updateMessage } from '../../../services';
import css from './Chat.module.css';
import {MessageList} from "../MessageList";
import {MessageForm} from "../MessageForm";

interface ChatProps {
    receiver: { uid: string; email: string };
}

const Chat: React.FC<ChatProps> = ({ receiver }) => {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [editingMessage, setEditingMessage] = useState<any | null>(null);

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

    return (
        <div className={css.chatContainer}>
            <h2 className={css.chatHeader}>Chat with {receiver.email}</h2>
            <MessageForm
                receiverId={receiver.uid}
                editingMessage={editingMessage}
                onUpdateMessage={handleUpdateMessage}
            />
        </div>
    );
};

export { Chat };
