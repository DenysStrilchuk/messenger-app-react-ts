import { firestore, storage } from '../firebase';
import { collection, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const sendMessage = async (text: string, file?: File) => {
    let fileUrl = null;
    if (file) {
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(firestore, 'messages'), {
        text,
        fileUrl,
        timestamp: new Date(),
    });
};

const deleteMessage = async (id: string) => {
    await deleteDoc(doc(firestore, 'messages', id));
};

const getMessages = () => {
    return query(collection(firestore, 'messages'), orderBy('timestamp'));
};

export {sendMessage, deleteMessage, getMessages};