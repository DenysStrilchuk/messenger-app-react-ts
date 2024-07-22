import { collection, query, where, orderBy, Query, addDoc, doc, deleteDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { firestore, storage, messageConverter } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { IMessage } from '../types/Message';

const getMessages = (senderId: string, receiverId: string): Query<IMessage> => {
    return query(
        collection(firestore, 'messages').withConverter(messageConverter),
        where('senderId', 'in', [senderId, receiverId]),
        where('receiverId', 'in', [senderId, receiverId]),
        orderBy('timestamp')
    );
};

const sendMessage = async (text: string, senderId: string, receiverId: string, files: File[] = []) => {
    const fileUrls = [];
    for (const file of files) {
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(storageRef);
        fileUrls.push(fileUrl);
    }

    await addDoc(collection(firestore, 'messages'), {
        text,
        senderId,
        receiverId,
        fileUrls,
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
