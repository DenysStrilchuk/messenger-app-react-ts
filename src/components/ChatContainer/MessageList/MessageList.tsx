import React, { useEffect, useState } from 'react';
import { onSnapshot, QuerySnapshot, QueryDocumentSnapshot, FirestoreError } from 'firebase/firestore';

import { Message } from "../Message";
import { useAuth } from "../../../hooks";
import { getMessages } from "../../../services";
import { IMessage } from "../../../types/Message";

interface MessageListProps {
    senderId: string;
    receiverId: string;
    onDelete: (id: string) => void;
    onEdit: (message: any) => void;
}

const MessageList: React.FC<MessageListProps> = ({ senderId, receiverId, onDelete, onEdit }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!senderId || !receiverId) return;

        const q = getMessages(senderId, receiverId);
        const unsubscribe = onSnapshot(q,
            (snapshot: QuerySnapshot<any>) => {
                const msgs = snapshot.docs.map((doc: QueryDocumentSnapshot<IMessage>) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setMessages(msgs);
            },
            (error: FirestoreError) => {
                if (error.code === 'failed-precondition') {
                    setError('The index is being created. Please try again later.');
                } else {
                    setError('An error occurred while loading messages.');
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
                    fileUrls={msg.fileUrls}
                    senderId={msg.senderId}
                    currentUserUid={currentUser ? currentUser.uid : null}
                    onDelete={() => onDelete(msg.id)}
                    onEdit={() => onEdit(msg)}
                />
            ))}
        </div>
    );
};

export { MessageList };
