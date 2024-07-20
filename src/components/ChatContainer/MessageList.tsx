import React, { useEffect, useState } from 'react';
import { onSnapshot, QuerySnapshot, QueryDocumentSnapshot, FirestoreError } from 'firebase/firestore';

import { Message } from './Message';
import { getMessages } from '../../services';

interface MessageListProps {
    senderId: string;
    receiverId: string;
    onDelete: (id: string) => void;
    onEdit: (message: any) => void;
}

const MessageList: React.FC<MessageListProps> = ({ senderId, receiverId, onDelete, onEdit }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!senderId || !receiverId) return;

        const q = getMessages(senderId, receiverId);
        const unsubscribe = onSnapshot(q,
            (snapshot: QuerySnapshot<any>) => {
                const msgs = snapshot.docs.map((doc: QueryDocumentSnapshot<any>) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(msgs);
            },
            (error: FirestoreError) => {
                if (error.code === 'failed-precondition') {
                    setError('Індекс створюється. Будь ласка, спробуйте пізніше.');
                } else {
                    setError('Сталася помилка під час завантаження повідомлень.');
                }
                console.error(error);
            }
        );

        return () => unsubscribe();
    }, [senderId, receiverId]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {messages.map((msg: any) => (
                <Message
                    key={msg.id}
                    id={msg.id}
                    text={msg.text}
                    fileUrl={msg.fileUrl}
                    onDelete={() => onDelete(msg.id)}
                    onEdit={() => onEdit(msg)}
                />
            ))}
        </div>
    );
};

export { MessageList };
