export interface IMessage {
    id: string;
    text: string;
    senderId: string;
    receiverId: string;
    fileUrls?: string[];
    timestamp: { seconds: number; nanoseconds: number };
}