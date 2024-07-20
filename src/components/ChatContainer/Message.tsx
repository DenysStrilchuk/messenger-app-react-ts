import React from 'react';

interface MessageProps {
    id: string;
    text: string;
    fileUrl?: string;
    onDelete: (id: string) => void;
    onEdit: () => void;
}

const Message: React.FC<MessageProps> = ({ id, text, fileUrl, onDelete, onEdit }) => {
    return (
        <div>
            <p>{text}</p>
            {fileUrl && <a href={fileUrl} target="_blank" rel="noopener noreferrer">File</a>}
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={onEdit}>Edit</button>
        </div>
    );
};

export { Message };
