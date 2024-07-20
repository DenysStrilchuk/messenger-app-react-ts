import React, { useState, useEffect } from 'react';
import { sendMessage } from '../../services/chatService';
import { useAuth } from '../../hooks';

interface MessageFormProps {
    receiverId: string;
    editingMessage?: any;
    onUpdateMessage: (id: string, newText: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ receiverId, editingMessage, onUpdateMessage }) => {
    const [text, setText] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (editingMessage) {
            setText(editingMessage.text);
        }
    }, [editingMessage]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            console.error('User is not authenticated');
            return;
        }
        const token = await currentUser.getIdToken();

        if (editingMessage) {
            onUpdateMessage(editingMessage.id, text);
        } else {
            await sendMessage(text, currentUser.uid, receiverId, token, files);
        }

        setText('');
        setFiles([]);
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
                multiple
                onChange={handleFileChange}
            />
            <button type="submit">{editingMessage ? 'Update' : 'Send'}</button>
        </form>
    );
};

export { MessageForm };
