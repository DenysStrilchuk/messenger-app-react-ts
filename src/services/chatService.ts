import { collection, query, where, orderBy, Query, addDoc, doc, deleteDoc,  updateDoc, Timestamp } from 'firebase/firestore';
import { firestore, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(firestore, 'messages'), {
        text,
        senderId,
        receiverId,
        fileUrl,
        timestamp: Timestamp.now(),
    });
};

const deleteMessage = async (id: string) => {
    const messageDoc = doc(firestore, 'messages', id);
    await deleteDoc(messageDoc);
};

const updateMessage = async (id: string, newText: string) => {
    const messageDoc = doc(firestore, 'messages', id);
    await updateDoc(messageDoc, { text: newText });
};

export {
    getMessages,
    sendMessage,
    deleteMessage,
    updateMessage
};
