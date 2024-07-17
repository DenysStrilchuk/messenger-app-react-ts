import React, { useState, useEffect } from 'react';
import { Chat } from '../components/ChatContainer/Chat';

const ChatPage = () => {
    const [receiver, setReceiver] = useState<{ uid: string; email: string } | null>(null);

    useEffect(() => {
        setReceiver({
            uid: 'receiver-uid',
            email: 'receiver@example.com',
        });
    }, []);

    if (!receiver) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Chat receiver={receiver} />
        </div>
    );
};

export { ChatPage };
