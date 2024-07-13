import React from 'react';

interface MessageProps {
    id: string;
    text: string;
    fileUrl?: string;
    onDelete: (id: string) => void;
}

const Message: React.FC<MessageProps> = ({ id, text, fileUrl, onDelete }) => {
    return (
        <div>
            <p>{text}</p>
            {fileUrl && <a href={fileUrl} target="_blank" rel="noopener noreferrer">File</a>}
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export {Message};
