import React, { useEffect, useState } from 'react';
import { onSnapshot, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

import { Message } from './Message';
import { deleteMessage, getMessages } from '../../services';

interface MessageListProps {
    senderId: string;
    receiverId: string;
}

const MessageList: React.FC<MessageListProps> = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        if (!senderId || !receiverId) return;

        const q = getMessages(senderId, receiverId);
        const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<any>) => {
            const msgs = snapshot.docs.map((doc: QueryDocumentSnapshot<any>) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [senderId, receiverId]);

    const handleDelete = async (id: string) => {
        await deleteMessage(id, senderId);
        setMessages(messages.filter(msg => msg.id !== id));
    };

    return (
        <div>
            {messages.map((msg: any) => (
                <Message key={msg.id} id={msg.id} text={msg.text} fileUrl={msg.fileUrl} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export { MessageList };
