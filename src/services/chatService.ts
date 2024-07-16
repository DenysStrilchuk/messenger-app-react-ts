import { collection, query, where, orderBy, Query } from 'firebase/firestore';
import { firestore } from '../firebase';
import axios from "axios";

export const getMessages = (senderId: string, receiverId: string): Query => {
    return query(
        collection(firestore, 'messages'),
        where('senderId', 'in', [senderId, receiverId]),
        where('receiverId', 'in', [senderId, receiverId]),
        orderBy('timestamp')
    );
};

export const sendMessage = async (text: string, senderId: string, receiverId: string, file?: File) => {
    let fileUrl = null;
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        fileUrl = uploadResponse.data.url;
    }

    await axios.post('/messages', { text, senderId, receiverId, fileUrl });
};

export const deleteMessage = async (id: string) => {
    await axios.delete(`/messages/${id}`);
};
