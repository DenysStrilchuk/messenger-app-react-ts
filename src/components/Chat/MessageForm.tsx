import React, { useState } from 'react';

import { sendMessage } from '../../services/chatService';

const MessageForm: React.FC = () => {
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | undefined>(undefined);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendMessage(text, file);
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
            <button type="submit">Send</button>
        </form>
    );
};

export { MessageForm };
