import React from 'react';
import {MessageList} from './MessageList';
import {MessageForm}from './MessageForm';

const Chat: React.FC = () => {
    return (
        <div>
            <MessageList />
            <MessageForm />
        </div>
    );
};

export {Chat};
