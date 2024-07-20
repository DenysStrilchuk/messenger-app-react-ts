import React from 'react';

interface MessageProps {
    id: string;
    text: string;
    fileUrls?: string[];
    onDelete: (id: string) => void;
    onEdit: () => void;
}

const Message: React.FC<MessageProps> = ({ id, text, fileUrls, onDelete, onEdit }) => {
    return (
        <div>
            <p>{text}</p>
            {fileUrls && fileUrls.map((url, index) => (
                <a key={index} href={url} target="_blank" rel="noopener noreferrer">File {index + 1}</a>
            ))}
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={onEdit}>Edit</button>
        </div>
    );
};

export { Message };
