import { collection, query, where, orderBy, Query, addDoc, Timestamp, doc, deleteDoc } from 'firebase/firestore';
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

const sendMessage = async (text: string, senderId: string, receiverId: string, file?: File) => {
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
    await deleteDoc(doc(firestore, 'messages', id));
};

export {
    getMessages,
    sendMessage,
    deleteMessage
}
