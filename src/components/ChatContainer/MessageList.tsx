// src/components/Chat/MessageList.tsx
import React, { useEffect, useState } from 'react';
import { deleteMessage, getMessages } from '../../services/chatService';
import { Message } from './Message';
import { onSnapshot, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

interface MessageListProps {
    senderId: string;
    receiverId: string;
}

const MessageList: React.FC<MessageListProps> = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
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
        await deleteMessage(id);
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
