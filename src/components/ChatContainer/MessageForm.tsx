import React, { useState } from 'react';
import { sendMessage } from '../../services';
import { useAuth } from '../../hooks';

interface MessageFormProps {
    receiverId: string;
}

const MessageForm: React.FC<MessageFormProps> = ({ receiverId }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | undefined>(undefined);
    const { currentUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            console.error('User is not authenticated');
            return;
        }
        console.log('Current User before sending message:', currentUser); // Добавьте это для логирования
        try {
            const token = await currentUser.getIdToken();
            await sendMessage(text, currentUser.uid, receiverId, token, file);
            setText('');
            setFile(undefined);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="New message"
            />
            <input
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : undefined)}
            />
            <button type="submit">Send</button>
        </form>
    );
};

export { MessageForm };
