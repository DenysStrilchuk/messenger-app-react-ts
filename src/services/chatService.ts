import axios from 'axios';
import { API_BASE_URL } from '../config';
import { collection, query, where, orderBy, Query } from 'firebase/firestore';
import { firestore } from '../firebase';

const getMessages = (senderId: string, receiverId: string): Query => {
    return query(
        collection(firestore, 'messages'),
        where('senderId', 'in', [senderId, receiverId]),
        where('receiverId', 'in', [senderId, receiverId]),
        orderBy('timestamp')
    );
};

const sendMessage = async (text: string, senderId: string, receiverId: string, token: string, file?: File) => {
    let fileUrl = null;
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        fileUrl = uploadResponse.data.url;
    }

    await axios.post(`${API_BASE_URL}/messages`, { text, senderId, receiverId, fileUrl }, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

const deleteMessage = async (id: string, token: string) => {
    await axios.delete(`${API_BASE_URL}/messages/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export {
    getMessages,
    sendMessage,
    deleteMessage
};
