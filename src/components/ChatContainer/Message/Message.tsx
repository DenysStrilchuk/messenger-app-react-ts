import React from 'react';

import css from './Message.module.css';

interface MessageProps {
    id: string;
    text: string;
    fileUrls?: string[];
    senderId: string;
    currentUserUid: string | null;
    onDelete: (id: string) => void;
    onEdit: () => void;
}

const Message: React.FC<MessageProps> = ({ id, text, fileUrls, senderId, currentUserUid, onDelete, onEdit }) => {
    const isOwner = senderId === currentUserUid;
    const messageClass = isOwner ? `${css.message} ${css.owner}` : css.message;

    return (
        <div className={messageClass}>
            <p className={css.messageText}>{text}</p>
            {fileUrls && fileUrls.map((fileUrl, index) => (
                <a key={index} href={fileUrl} target="_blank" rel="noopener noreferrer"
                   className={css.messageFile}>File {index + 1}</a>
            ))}
            <div className={css.messageActions}>
                <button onClick={() => onDelete(id)}>Delete</button>
                {isOwner && (
                    <button onClick={onEdit}>Edit</button>
                )}
            </div>
        </div>
    );
};

export { Message };
