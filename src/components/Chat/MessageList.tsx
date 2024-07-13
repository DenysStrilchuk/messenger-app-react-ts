import { useEffect, useState } from 'react';
import { deleteMessage, getMessages } from '../../services/chatService';
import { Message } from './Message';
import { onSnapshot, QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

const MessageList: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const q = getMessages();
        const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<any>) => {
            const msgs = snapshot.docs.map((doc: QueryDocumentSnapshot<any>) => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, []);

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
