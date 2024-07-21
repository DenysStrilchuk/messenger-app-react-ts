import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {Chat} from "../Chat/Chat";
import {getUser} from "../../../services";

const ChatInfo = () => {
    const { receiverId } = useParams<{ receiverId: string }>();
    const [receiver, setReceiver] = useState<{ uid: string; email: string } | null>(null);

    useEffect(() => {
        const fetchReceiver = async () => {
            try {
                if (receiverId) {
                    const user = await getUser(receiverId);
                    setReceiver(user);
                }
            } catch (error) {
                console.error('Failed to fetch receiver:', error);
            }
        };

        fetchReceiver();
    }, [receiverId]);

    if (!receiver) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Chat receiver={receiver} />
        </div>
    );
};

export { ChatInfo };
