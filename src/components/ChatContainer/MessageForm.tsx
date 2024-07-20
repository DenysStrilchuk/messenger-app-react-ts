import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';
import {sendMessage} from "../../services";

interface MessageFormProps {
    receiverId: string;
    editingMessage?: any;
    onUpdateMessage: (id: string, newText: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ receiverId, editingMessage, onUpdateMessage }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | undefined>(undefined);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (editingMessage) {
            setText(editingMessage.text);
        }
    }, [editingMessage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            console.error('User is not authenticated');
            return;
        }
        const token = await currentUser.getIdToken(); // Отримати токен аутентифікації Firebase

        if (editingMessage) {
            await onUpdateMessage(editingMessage.id, text);
        } else {
            await sendMessage(text, currentUser.uid, receiverId, token, file);
        }

        setText('');
        setFile(undefined);
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
            <button type="submit">{editingMessage ? 'Update' : 'Send'}</button>
        </form>
    );
};

export { MessageForm };
