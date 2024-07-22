import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { IMessage } from './types/Message';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const messageConverter: FirestoreDataConverter<IMessage> = {
    toFirestore(message: IMessage): any {
        return { ...message };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): IMessage {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            text: data.text,
            senderId: data.senderId,
            receiverId: data.receiverId,
            fileUrls: data.fileUrls,
            timestamp: data.timestamp,
        } as IMessage;
    },
};

export {
    auth,
    firestore,
    storage,
    messageConverter
};
