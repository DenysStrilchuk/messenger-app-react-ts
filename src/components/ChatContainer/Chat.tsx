import React, { useState, useEffect } from 'react';
import { Message } from './Message';
import { MessageForm } from './MessageForm';
import { onSnapshot, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { MessageList } from './MessageList';
import { useAuth } from "../../hooks";
import { deleteMessage, getMessages } from "../../services";

interface ChatProps {
    receiver: { uid: string; email: string };
}

const Chat: React.FC<ChatProps> = ({ receiver }) => {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);

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
    }, [currentUser, receiver]);

    const handleDeleteMessage = async (id: string) => {
        if (currentUser) {
            await deleteMessage(id, currentUser.uid);
        } else {
            console.error('User is not authenticated');
        }
    };

    return (
        <div>
            <h2>Chat with {receiver.email}</h2>
            <div>
                {currentUser && (
                    <MessageList senderId={currentUser.uid} receiverId={receiver.uid} />
                )}
                {messages.map((msg) => (
                    <Message key={msg.id} id={msg.id} text={msg.text} fileUrl={msg.fileUrl} onDelete={handleDeleteMessage} />
                ))}
            </div>
            <MessageForm receiverId={receiver.uid} />
        </div>
    );
};

export { Chat };
